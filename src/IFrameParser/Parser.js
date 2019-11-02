function extractUsefulAttributes(objTag, objAttributes) {
  let finalAttributes = {};
  if (objAttributes.textContent !== null) {
    finalAttributes.textContent = objAttributes.textContent;
  }

  switch (objTag) {
    case "A":
      break;
    default:
      break;
  }

  return finalAttributes;
}

export { extractUsefulAttributes };
