const switchButton = document.querySelector("#switch-checkbox");
const searchForm = document.querySelector("#main-search-form");
const googleAction = "https://www.google.com/search";
const duckduckgoAction = "https://duckduckgo.com/";

switchButton.onchange = () => {
  console.log("socorro");
  if (searchForm.action == googleAction) {
    searchForm.action = duckduckgoAction;
    return;
  }
  searchForm.action = googleAction;
};
