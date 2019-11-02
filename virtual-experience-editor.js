(() => {
  let isEditMode = false;
  let editedItem = null;

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
      return;
    }
    const { target } = ev;

    isEditMode = true;
    highlightElement(ev);

    target.setAttribute("edited", true);
    editedItem = target;

    try {
      await notifyServerEditOn(target);
    } catch (e) {
      alert("Error");
    }
  }

  function exitEditMode(element) {
    element.removeAttribute("edited", true);
    unHighlightElement({ target: element });
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

    window.top.postMessage(editableData, "*");
  }

  function getParentElementMessage(e) {
    const {
      data: { path, attributes }
    } = e;

    for (var prop in editedItem) {
      if (attributes[prop] !== undefined) {
        editedItem[prop] = attributes[prop];
      }
    }

    exitEditMode(editedItem);
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

  const body = document.getElementsByTagName("body")[0];
  body.addEventListener("click", enterEditMode);
  body.addEventListener("mouseover", highlightElement);
  body.addEventListener("mouseout", unHighlightElement);
  window.addEventListener("message", getParentElementMessage);
})();