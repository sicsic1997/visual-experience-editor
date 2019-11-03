import React from "react";

function createSnippetWithAttributes(attributes, tag, children) {
  if (!tag || tag === "") {
    return;
  }
  if (tag === "div") {
    return (
      <div
        id="modal_obj"
        dangerouslySetInnerHTML={{ __html: attributes["innerHTML"] }}
      />
    );
  }
  return React.createElement(tag, { id: "modal_obj", attributes }, children);
}

export { createSnippetWithAttributes };
