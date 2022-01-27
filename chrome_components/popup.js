window.onload = () => {
  document.getElementById('deleteButton').onclick = function wipe () {
    chrome.runtime.sendMessage({message:'clearDB'});
  };

  document.getElementById('comicSearchBar').onsubmit = function populate () {
    const search = document.getElementById('comSearch').value;
    document.getElementById('comSearch').value = '';
    chrome.runtime.sendMessage({message: 'newData', search: search});
  }
};