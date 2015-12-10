'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('clicked it');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "mine" }, function(response) {
        console.log('received it!');
      });
    });
});
