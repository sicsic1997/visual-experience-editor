import { ExperienceLoader } from "../services/ExperienceLoader";

class DataManager {
  static _instance;

  _experiences = null;
  _url = null;
  _currentExperience = null;

  static getInstance() {
    if (!this._instance) {
      this._instance = new DataManager();
    }
    return this._instance;
  }

  async getExperiencesAsync(url) {
    if (!url) {
      return;
    }
    const experiences = await ExperienceLoader.getExperiencesForUrl(url);
    this._experiences = experiences;
    this._url = url;

    return this._experiences;
  }

  async publishExperience() {
    await this.fetchDataManagerCachedData();
    if(!this._currentExperience || this._currentExperience == undefined) {
      return;
    }
    var name;
    if(this._currentExperience._metadata != undefined && this._currentExperience._metadata != null) {
      name = this._currentExperience._metadata["file-name"];
    }
    if(name == null || name == undefined) {
      name = "dummyName" + String(new Date().getTime() % 1000);
    }
    await ExperienceLoader.writeExperienceToFile(name, this._currentExperience);
    this._currentExperience = null;
    await this.getExperiencesAsync(this._url);
  }

  updateDataManagerCachedData() {
    localStorage["_url"] = this._url;
    localStorage["_currentExperience"] = this._currentExperience;
  }

  async fetchDataManagerCachedData() {
    /*var urlNew = localStorage["_url"];
    if (urlNew != null && urlNew != undefined) {
      this._url = urlNew;
    }
    var currentNewExerienceNew = localStorage["_currentExperience"];
    if (currentNewExerienceNew != null && currentNewExerienceNew != undefined) {
      this._currentExperience = currentNewExerienceNew;
    }
    await this.getExperiencesAsync(this._url);*/
  }

  

}

export default DataManager;
