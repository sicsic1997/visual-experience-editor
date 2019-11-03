import { ExperienceLoader } from "../services/ExperienceLoader";

class DataManager {
  static _instance;

  _experiences = null;
  _url = null;

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
}

export default DataManager;
