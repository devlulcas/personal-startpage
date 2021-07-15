const switchButton = document.getElementById("switch-checkbox");
const searchForm = document.getElementById("main-search-form");
const googleAction = "https://www.google.com/search";
const duckduckgoAction = "https://duckduckgo.com/";

switchButton.addEventListener("change", changeSearchEngine);

function changeSearchEngine() {
  if (searchForm.action === googleAction) {
    searchForm.action = duckduckgoAction;
    return;
  }
  searchForm.action = googleAction;
}
