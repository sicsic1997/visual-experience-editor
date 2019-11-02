(() => {
  let isEditMode = false;
  let editedItem = null;
  let editedItemId = null;

  function highlightElement(ev) {
    const { target } = ev;
    if (target && target.nodeName !== "BODY") {
      target.style.outline = "thick solid #0000FF";
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
    highlightElement(ev);

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
    if (editedItemId) {
      editedItem.setAttribute("id", editedItemId);
    }
    unHighlightElement({ target: editedItem });
    editedItem = null;
  }

  async function notifyServerEditOn(target) {
    const { style = {}, className, textContent, tagName } = target;
    const path = encryptChildPath(target);

    const editableData = {
      style: { ...style },
      className,
      textContent,
      tagName,
      path
    };

    if (tagName || tagName === "DIV" || tagName === "SPAN") {
      editedItem.setAttribute("draggable", true);
      editedItem.setAttribute("id", "draggableElement");
    }
    window.top.postMessage(editableData, "*");
  }

  function getParentElementMessage(e) {
    const {
      data: { path, attributes, action, innerHTML }
    } = e;

    if (action && action.toLowerCase() === "add") {
      addNewElement(editedItem);
    } else if (action && action.toLowerCase() === "remove") {
      removeElement(editedItem);
    } else if (action && action.toLowerCase() === "edit") {
      editElement(editedItem, attributes);
    } else if (action && action.toLowerCase() === "move") {
    }

    exitEditMode();
  }

  function addNewElement(parentElement) {
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
    for (var attr in elem) {
      if (newAttributes[attr] !== undefined) {
        elem[attr] = newAttributes[attr];
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

  // Drag & drop
  function onDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.currentTarget.style.backgroundColor = "yellow";
  }

  const body = document.getElementsByTagName("body")[0];
  body.addEventListener("click", enterEditMode);
  body.addEventListener("mouseover", highlightElement);
  body.addEventListener("mouseout", unHighlightElement);
  window.addEventListener("message", getParentElementMessage);
})();
