const noteblockTextarea = document.getElementById("noteblock-text");
const noteblockCopyButton = document.getElementById("noteblock-copy");
const noteblockDeleteButton = document.getElementById("noteblock-delete");

noteblockDeleteButton.onclick = () => {
  noteblockTextarea.value = "";
};

noteblockCopyButton.onclick = () => {
  const text = noteblockTextarea.value;
  if (text) {
    noteblockTextarea.select();
    noteblockTextarea.setSelectionRange(0, 999999);
    document.execCommand("copy");
  }
};
