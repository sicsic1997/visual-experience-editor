(() => {
  let isEditMode = false;
  let editedItem = null;
  let editedItemId = null;
  var dragged;
  var oldPath;
  var newPath;

  function highlightElement(ev) {
    const { target } = ev;
    if (target && target.nodeName !== "BODY" && target != editedItem) {
      target.style.outline = "solid #999999";
    }
  }

  function highlightSelectedElement(ev) {
    const { target } = ev;
    if (target && target.nodeName !== "BODY") {
      target.style.outline = "solid #000066";
    }
  }

  function unHighlightElement(ev) {
    const { target } = ev;
    if (
      target &&
      target.nodeName !== "BODY" &&
      !target.getAttribute("edited")
    ) {
      target.style.outline = "none";
    }
  }

  async function enterEditMode(ev) {
    if (editedItem) {
      exitEditMode();
    }
    const { target } = ev;

    isEditMode = true;
    highlightSelectedElement(ev);

    target.setAttribute("edited", true);
    editedItem = target;
    editedItemId = target.id;

    try {
      await notifyServerEditOn(target);
    } catch (e) {
      alert("Error");
    }
  }

  function exitEditMode() {
    if (!editedItem) {
      return;
    }
    editedItem.removeAttribute("edited", true);
    editedItem.removeAttribute("draggable");
    editedItem.removeAttribute("id");
    editedItem.removeEventListener("ondragstart", onDragStart);
    if (editedItemId) {
      editedItem.setAttribute("id", editedItemId);
    }
    unHighlightElement({ target: editedItem });
    editedItem = null;
  }

  async function notifyServerEditOn(target) {
    const { style = {}, className, textContent, tagName } = target;
    const path = encryptChildPath(target);

    let editableData = {
      style: { ...style },
      className,
      textContent,
      tagName,
      path
    };

    let attributes = target.attributes;

    try {
      Array.prototype.slice.call(attributes).forEach(function(item) {
          editableData[item.name] = item.value;
      });
    } catch(error) {
      console.log(error);
    }
        
    if (tagName || tagName === "DIV" || tagName === "SPAN") {
      editedItem.setAttribute("draggable", true);
      editedItem.setAttribute("id", "draggableElement");
      editedItem.addEventListener("dragstart", onDragStart);
    }

    try{
      window.top.postMessage(editableData, "*");
    } catch(error) {
      console.log(error);
    }

  }

  /**
        Properties format for changes:
        1. add:
        _properties = {
          "inner-html": "<p></p>"
        }
    
        2. edit:
        _properties = {
          "attributes": {}
        }
    
        3. remove: nothing special
      */
  function getParentElementMessage(e) {
    const {
      data: { change }
    } = e;

    if (!change) {
      return;
    }

    var path = change._position;
    targetItem = decryptChildPath(path);

    switch (change._change_type) {
      case "add":
        addNewElement(targetItem, change._properties["inner-html"]);
        break;
      case "edit":
        editElement(targetItem, change._properties["attributes"]);
        break;
      case "remove":
        removeElement(targetItem);
        break;
      default:
        break;
    }

    exitEditMode();
  }

  function addNewElement(parentElement, innerHTML) {
    if (parentElement) {
      const div = document.createElement("div");
      div.innerHTML = innerHTML;
      parentElement.appendChild(div);
    }
  }

  function removeElement(elem) {
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
  }

  function editElement(elem, newAttributes) {
    if (!elem) {
      return;
    }

    for (var prop in elem) {
      if (newAttributes[prop] !== undefined) {
        if (prop === "style") { 
          let info = newAttributes[prop];

          let encr = "";
          for (let el in info) {
            encr += el + ": " + info[el].trim() + "; ";
          }

          let sepp = encr.split(';').map(pair => pair.split(':'));

          for (var i = 0; i < sepp.length; i++) {
            let el = sepp[i];
            if (el.length !== 2) continue;

            elem[prop][el[0].trim()] = el[1];
          }
          
          continue;
        }

        elem[prop] = newAttributes[prop];
      }
    }
  }

  function encryptChildPath(element) {
    let encoding = "";
    while (true) {
      const parent = element.parentElement;
      if (parent == null) {
        break;
      }

      const children = parent.children;
      let index = 0;
      for (let i = 0; i < children.length; i++) {
        if (element === children[i]) {
          index = i;
          break;
        }
      }

      encoding = "/" + index.toString() + encoding;
      element = parent;
    }

    return encoding;
  }

  function decryptChildPath(path) {
    let current = document.getRootNode().children[0];
    const splitted = path.split("/").slice(1);

    for (let i = 0; i < splitted.length; i++) {
      current = current.children[splitted[i]];
    }
    return current;
  }

  /// Drag & drop TODO(make it better)
  function onDragStart(event) {
    // event.dataTransfer.setData("text/plain", event.target.id);
    dragged = event.target;
    oldPath = encryptChildPath(dragged);
  }

  function onDragOver(event) {
    event.preventDefault();
    event.target.style.background = "";
  }

  function onDrop(event) {
    // const id = event.dataTransfer.getData("text");
    // const draggableElement = document.getElementById(id);
    // const dropzone = event.target;
    // dropzone.appendChild(draggableElement);
    // event.dataTransfer.clearData();
  }

  function onDragEnter(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.tagName === "SPAN" || event.target.tagName === "DIV") {
      //   event.target.style.background = "purple";
      try {
        event.target.appendChild(dragged);
        newPath = encryptChildPath(dragged);
        //console.log(oldPath, newPath);
        // editedItem.parentNode.removeChild(editedItem);
      } catch (e) {}
    }
    // }
  }

  function onDragLeave(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.tagName === "SPAN" || event.target.tagName === "DIV") {
      //   event.target.style.background = "";
    }
  }
  ///

  const body = document.getElementsByTagName("body")[0];
  body.addEventListener("click", enterEditMode);
  body.addEventListener("mouseover", highlightElement);
  body.addEventListener("mouseout", unHighlightElement);
  window.addEventListener("message", getParentElementMessage);
  document.addEventListener("dragenter", onDragEnter);
  document.addEventListener("dragover", onDragOver);
  document.addEventListener("drop", onDrop);
  //   document.addEventListener("dragleave", onDragLeave, false);
})();
