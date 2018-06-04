// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let capturar = document.getElementById('capturar');
let parser = new DOMParser();

chrome.storage.sync.get('Visible', function(data) {
  capturar.innerHTML =  data.Visible;
});


capturar.onclick = function(element) {
  let Visible = element.target.innerHTML;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {event:Visible},
    function(recebido){
      console.log(recebido);
      if (element.target.innerHTML=='Hide'){
        element.target.innerHTML = 'Show';
        chrome.storage.sync.set({Visible: 'Show'}, function() {
          console.log('Botão Visible = Show');
        });
      } else {
        element.target.innerHTML = 'Hide';
        chrome.storage.sync.set({Visible: 'Hide'}, function() {
          console.log('Botão Visible = Hide');
        });
      }
    });
  });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");
  if (request.event == "template") {
    var el = parser.parseFromString(request.data, "text/html");
    console.log(parser.parseFromString(request.data, "text/html"));
    captura.insertAdjacentElement('afterbegin',parser.parseFromString(request.data, "text/html").getElementsByTagName('Body')[0].children[0]);
    sendResponse("OK");
  }
});
  