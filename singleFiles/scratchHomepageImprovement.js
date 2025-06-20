// ==UserScript==
// @name         Scratch Homepage Improvement
// @namespace    http://tampermonkey.net/
// @version      2025-06-20
// @description  Removes useless stuff from Scratch's homepage.
// @author       Spentine
// @match        https://scratch.mit.edu/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mit.edu
// @grant        none
// ==/UserScript==

(async function() {
  'use strict';
  
  console.log("Scratch Homepage Improvement script loaded.");
  
  // boxes to remove:
  const boxOptions = {
    activityBox: false,
    scratchNewsBox: false,
    featuredProjectsBox: true,
    featuredStudiosBox: true,
    scratchDesignStudioBox: true,
    lovedScratchersBox: false,
    communityRemixingBox: true,
    communityLovingBox: true,
  };
  
  function removeBoxes() {
    // box titles
    const boxTitles = {
      activityBox: "What's Happening?",
      scratchNewsBox: "Scratch News",
      featuredProjectsBox: "Featured Projects",
      featuredStudiosBox: "Featured Studios",
      scratchDesignStudioBox: "Scratch Design Studio",
      lovedScratchersBox: "Projects Loved by Scratchers I'm Following",
      communityRemixingBox: "What the Community is Remixing",
      communityLovingBox: "What the Community is Loving",
    };
    const boxNames = Object.keys(boxTitles);
    
    // get the boxes on the homepage
    const boxes = document.getElementsByClassName("box");
    
    // loop through boxes
    for (let boxIndex = 0; boxIndex < boxes.length; boxIndex++) {
      const box = boxes[boxIndex];
      
      // get box title
      const boxTitle = box.firstChild.firstChild.textContent.trim();
      
      // iterate through box names and check if it should be removed
      for (const boxName of boxNames) {
        // skip if the box shouldn't be removed
        if (!boxOptions[boxName]) continue;
        
        // check if the box title matches the current box name
        const boxTitleCheck = boxTitles[boxName];
        if (boxTitle.includes(boxTitleCheck)) {
          // remove the box
          box.style.display = "none";
          console.log(`Removed box: ${boxTitleCheck}`);
          break; // exit the loop after removing the box
        }
      }
    }
  }
  
  // initial removal of boxes
  removeBoxes();
  
  // observe changes to the homepage and remove boxes if they reappear
  const view = document.getElementbyId("view");
  const mutationObserver = new MutationObserver(removeBoxes);
  mutationObserver.observe(view, {
    childList: true,
    subtree: true
  });
})();