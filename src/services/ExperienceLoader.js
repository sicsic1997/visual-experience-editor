import { Change } from "../model/Change";
import axios from "axios";
import ExperienceChangeSet from "../model/ExperienceChangeSet";

const nodeserverurl = "http://localhost:3004/";

export class ExperienceLoader {
  static async loadExperiences() {
    var result = await axios
      .get(nodeserverurl + "get-experience")
      .then(function(response) {
        return response.data;
      });
    console.log(result);
    var arrRes = result["experience-sets"];
    var resultParsed = [];
    for (let i = 0; i < arrRes.length; i++) {
      console.log(arrRes[i])
      var experienceChangeSetRaw = JSON.parse(arrRes[i]);
      var experienceChangeSet = new ExperienceChangeSet(
        experienceChangeSetRaw["_metadata"],
        experienceChangeSetRaw["_changes_list"]
      );
      resultParsed.push(experienceChangeSet);
    }
    return resultParsed;
  }

  static async writeExperienceToFile(name, experienceChangeSet) {
    experienceChangeSet._metadata["file-name"] = name;
    return await axios.post(nodeserverurl + "save-experience", {
      name: name,
      experienceChangeSet: JSON.stringify(experienceChangeSet)
    });
  }

  static async getExperiencesForUrl(urlString) {
    var experienceChangeSets = await this.loadExperiences();
    var filteredResults = [];
    for (let i = 0; i < experienceChangeSets.length; i++) {
      console.log(experienceChangeSets[i]._metadata);
      if (experienceChangeSets[i]._metadata["url"] == urlString) {
        filteredResults.push(experienceChangeSets[i]);
      }
    }
    return filteredResults;
  }

  static async getExperienceByFileName(fileName) {
    var experienceChangeSets = await this.loadExperiences();
    var filteredResults = [];
    for (let i = 0; i < experienceChangeSets.length; i++) {
      if (experienceChangeSets[i]._metadata["file-name"] == fileName) {
        filteredResults.push(experienceChangeSets[i]);
      }
    }
    return filteredResults[0];
  }
}
