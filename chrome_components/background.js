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