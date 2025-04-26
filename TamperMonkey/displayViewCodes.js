// ==UserScript==
// @name         Display View Codes
// @namespace    http://tampermonkey.net/
// @version      2025-04-26
// @description  Display the replay code rather than a view button
// @author       Spentine
// @match        https://ch.tetr.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tetr.io
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  
  const body = document.querySelector('body');
  
  // add some CSS to the body
  const style = document.createElement('style');
  style.textContent = `
    .copyLink {
      display: block;
      font-size: 1.15em;
      margin: 0;
      color: #A3D391;
      padding: 0.15em 0;
      transform: translateX(0);
      transition: 0.3s transform, 0.3s color;
    }
    .copyLink.hidden {
      display: none;
    }
    .copyLink.dark {
      color: #5C8456;
    }
    .copyLink::before {
      content: 'Ǵ';
      font-family: 'HUN';
      font-size: 1.2em;
      vertical-align: -10%;
      margin-right: 0.25em;
    }
    .copyLink:hover {
      color: #E2FCDE;
      transform: translateX(0.2em);
    }
    .copyLink:active {
      color: #FFF;
      transform: translateX(0.5em);
      transition: 0.05s transform, 0.05s color;
    }

    .copyLink.rh {
      text-align: right;
    }
    .copyLink.small {
      font-size: 1em;
      padding: 0em 0;
    }
    .copyLink.ct {
      margin-top: -0.5em;
    }
    .copyLink.cb {
      margin-bottom: -0.5em;
    }

    td .copyLink {
      font-size: 1em;
      margin: 0;
      color: #A3D391;
      padding: 0;
      transform: translateX(0);
      transition: 0.3s transform, 0.3s color;
      margin-right: -1.5em;
    }
    td .copyLink::before {
      content: 'Ǵ';
      font-family: 'HUN';
      font-size: 1em;
      vertical-align: -10%;
      margin-right: 0.25em;
    }
  `;
  
  body.appendChild(style);
  
  const config = {
    childList: true,
    subtree: true,
  };
  
  const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.target.classList.contains("tabledata")) {
        console.log(mutation);
        for (const row of mutation.addedNodes) {
          const view = row.lastChild;
          const replayLink = view.firstChild;
          if (!replayLink) continue;
          
          // console.log(replayLink);
          
          replayLink.classList.remove("shortcut", "replaylink");
          replayLink.classList.add("copyLink");
          
          // get href
          const href = replayLink.href;
          const replayCode = href.split('#').pop();
          
          // set text content to replay code
          replayLink.textContent = replayCode;
          const clickEvent = function(event) {
            event.preventDefault(); // prevent default action
            navigator.clipboard.writeText(replayCode).then(function() {
              console.log('Replay code copied to clipboard:', replayCode);
            }, function(err) {
              console.error('Could not copy text: ', err);
            });
          
            // create new element
            // const newElement = document.createElement("a");
            // // newElement.classList.add("shortcut", "replaylink");
            // newElement.textContent = replayCode;
          
            // // replace the old element with the new one
            // event.target.replaceWith(newElement);
            // newElement.addEventListener('click', clickEvent);
          }
          
          // add a click event to copy the code to clipboard
          replayLink.addEventListener('click', clickEvent);
        }
      }
    }
  }
  
  const observer = new MutationObserver(callback);
  
  observer.observe(body, config);
})();