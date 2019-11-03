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

    console.log(this._experiences);
    return this._experiences;
  }

  async publishExperience() {
    if(!this._currentExperience) {
      return;
    }
    var name = this._currentExperience._metadata["file-name"]
    if(name == null || name == undefined) {
      name = "dummyName" + String(new Date().getTime() % 1000);
    }
    await ExperienceLoader.writeExperienceToFile(name, this._currentExperience);
    this._currentExperience = null;
    await this.getExperiencesAsync(this._url);
  }

}

export default DataManager;
