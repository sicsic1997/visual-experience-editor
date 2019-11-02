import { Change } from '../model/Change';
import axios from 'axios';
import { ExperienceChangeSet } from '../model/ExperienceChangeSet';

const nodeserverurl = "http://localhost:3001/";

export class ExperienceLoader {

    static async loadExperiences() {
        var result = await axios.get(nodeserverurl + "get-experience")
                                .then(function(response) {
                                    return response.data;
                                })
        var arrRes = result["experience-sets"];
        var resultParsed = [];
        for(let i = 0; i < arrRes.length; i++) {
            var experienceChangeSetRaw = JSON.parse(arrRes[i]);
            var experienceChangeSet = new ExperienceChangeSet(experienceChangeSetRaw["_metadata"], experienceChangeSetRaw["_changes_list"]);
            resultParsed.push(experienceChangeSet);
        }
        return resultParsed;
    }

    static async writeExperienceToFile(name, experienceChangeSet) {
        return await axios.post(nodeserverurl + "save-experience", { 
            "name": name,
            "experienceChangeSet": experienceChangeSet
        })
    } 

}