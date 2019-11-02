import React from 'react';
import { Change } from '../../model/Change';
import { ExperienceLoader } from '../../services/ExperienceLoader';
import { ExperienceChangeSet } from '../../model/ExperienceChangeSet';

const Experience = () => (
    <div>
        <h1>Main page</h1>
        <button onClick={() => { callBackMe() }}> Click </button>
        <label id="rata"></label>
    </div>
);

async function callBackMe() {
    var c = new Change(Change.CHANGE_TYPES.ADD, [1, 2, 3], {'color': 'green'});
    var c2 = new Change(Change.CHANGE_TYPES.REMOVE, [1, 5, 3], {'width': '20px'});

    var ecs = new ExperienceChangeSet({"createdby": "Vlad Coteanu"}, [c, c2])
    var ecsStringified = JSON.stringify(ecs);

    await ExperienceLoader.writeExperienceToFile("expTest2", ecsStringified);
    var x = await ExperienceLoader.loadExperiences();

    console.log(x[0]);
    console.log(ecs);


    for(let i = 0; i < x.length; i++) {
        console.log(x[i])
    }

    document.getElementById("rata").innerHTML = x;
}


export default Experience;
