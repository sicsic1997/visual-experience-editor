function extractUsefulAttributes(objTag, objAttributes) {
  let finalAttributes = {};
  if (objAttributes.textContent !== null) {
    finalAttributes.textContent = objAttributes.textContent;
  }

  // we display all the attributes that are set (except `tagName` & `path`)
  // P.S. those which are specified in `editableData` should be displayed, even if not set)
  for (var key in objAttributes) {
    if (key === "tagName" || key === "path" || key === "class")
      continue;
    
    if (objAttributes.key !== null)
      finalAttributes[key] = objAttributes[key];
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