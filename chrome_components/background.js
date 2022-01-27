// chrome.webRequest.onBeforeRequest.addListener(
//     console.log('hello')
// )

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
         return {redirectUrl: 'http://localhost:3000/'};
    },
    {
        urls: ad_domains,
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.message === 'clearDB') {
    fetch('http://localhost:3000/drop', {method: 'DELETE'})
    .then(resp => console.log('Contents Deleted!'));
  };

  if (request.message === 'newData') {
    fetch(`http://localhost:3000/getData/${request.search}`, {method: 'POST'})
    .then(resp => console.log('Contents added!'));
  }
});