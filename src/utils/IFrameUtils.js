import { Change } from "../model/Change";

var wait = ms => new Promise((r, j)=>setTimeout(r, ms))

function loadExperienceInIFrame(experience, iframe) {
  if (!experience) {
    return;
  }
  setTimeout(async () => {
    const { _metadata, _changes_list } = experience;
    for(let i = 0; i < _changes_list.length; ++i) {
      sendChangeToIFrame(_changes_list[i], iframe);
      await wait(1000);
    }
  }, 1000);
  
  /*_changes_list.forEach(change => {
    sendChangeToIFrame(change, iframe);
  });*/
}

function sendChangeToIFrame(change, iframe) {
  iframe = document.getElementById("id1");
  iframe.contentWindow.postMessage({ change }, "*");
}

function editElementInIFrame(path, attributes, iframe) {
  var change = new Change(Change.CHANGE_TYPES.EDIT, path, { attributes });
  sendChangeToIFrame(change, iframe);
}

function removeElementInIFrame(path, attributes, iframe) {
  var change = new Change(Change.CHANGE_TYPES.REMOVE, path, attributes);
  sendChangeToIFrame(change, iframe);
}

function addElementInIFrame(path, innerHTML, iframe) {
  var change = new Change(Change.CHANGE_TYPES.ADD, path, { innerHTML });
  sendChangeToIFrame(change, iframe);
}

export {
  loadExperienceInIFrame,
  sendChangeToIFrame,
  editElementInIFrame,
  removeElementInIFrame,
  addElementInIFrame
};
