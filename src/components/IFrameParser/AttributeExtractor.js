function extractUsefulAttributes(objTag, objAttributes) {
  let finalAttributes = {};
  if (objAttributes.textContent !== null) {
    finalAttributes.textContent = objAttributes.textContent;
  }

  // we display all the attributes that are set (except `tagName` & `path`)
  // P.S. those which are specified in `editableData` should be displayed, even if not set)
  for (var key in objAttributes) {
    if (key === "tagName" || key === "path" || key === "class" || key == "edited") continue;

    if (key === "style") {
      let info = objAttributes[key];
      let sepp = [];
      try {
        sepp = info.split(";").map(pair => pair.split(":"));
      } catch (e) {}
      finalAttributes.style = {};

      for (let i = 0; i < sepp.length; i++) {
        let el = sepp[i];
        if (el.length !== 2) continue;

        let key = el[0].trim();
        let value = el[1];

        if (value !== null) {
          finalAttributes.style[key] = value;
        }
      }

      continue;
    }

    if (objAttributes[key] !== null && objAttributes[key] !== undefined) {
      finalAttributes[key] = objAttributes[key];
    }
  }

  // switch (objTag) {
  //   case "A":
  //     break;
  //   default:
  //     break;
  // }

  return finalAttributes;
}

export { extractUsefulAttributes };

// TODO (AS NEXT STEPS):
/*
  1. Dynamic number of attributes to be changed (let the user
     choose more attributes to set)
  2.
*/
