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
  
  // options for userscript
  const options = {
    // boxes to remove
    activityBox: false,
    scratchNewsBox: false,
    featuredProjectsBox: true,
    featuredStudiosBox: true,
    scratchDesignStudioBox: true,
    lovedScratchersBox: false,
    communityRemixingBox: true,
    communityLovingBox: true,
    
    // header items to remove
    createButton: false,
    exploreButton: true,
    ideasButton: true,
    aboutButton: true,
    
    // extra homepage elements
    homepageElements: [
      {
        text: "Discuss Scratch",
        type: "buttonLink",
        link: "https://scratch.mit.edu/discuss/",
      },
      // function example
      // {
      //   text: "Discuss Scratch",
      //   type: "button",
      //   function: () => {
      //     window.open("https://scratch.mit.edu/discuss/", "_blank");
      //   },
      // },
    ],
  };
  
  // === userscript behavior and code ===
  
  console.log("Scratch Homepage Improvement script loaded.");
  
  // some elements that are important
  const view = document.getElementById("view"); // main view
  const mainScroll = view.firstChild.lastChild; // main scroll element
  const navigation = document.getElementById("navigation"); // header navigation
  
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
        if (!options[boxName]) continue;
        
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
  
  function removeHeaderButtons() {
    const buttonQueries = {
      createButton: ".link.create",
      exploreButton: ".link.explore",
      ideasButton: ".link.ideas",
      aboutButton: ".link.about",
    };
    const buttonNames = Object.keys(buttonQueries);
    
    // remove header buttons based on options
    for (const buttonName of buttonNames) {
      if (!options[buttonName]) continue; // skip if the button shouldn't be removed
      
      const buttonQuery = buttonQueries[buttonName];
      const button = navigation.querySelector(buttonQuery);
      
      if (button) {
        button.style.display = "none"; // hide the button
        console.log(`Removed header button: ${buttonName}`);
      }
    }
  }
  
  function addElements() {
    const elements = options.homepageElements;
    
    for (const element of elements) {
      if (element.type === "button") {
        // create a button element
        
        const button = document.createElement("button");
        button.className = "custom-button";
        button.textContent = element.text;
        
        // add click event listener
        button.addEventListener("click", element.function);
        
        mainScroll.appendChild(button);
      } else if (element.type === "buttonLink") {
        // create an a element styled as a button
        
        const buttonLink = document.createElement("a");
        buttonLink.className = "custom-button";
        buttonLink.textContent = element.text;
        
        buttonLink.href = element.link;
        
        mainScroll.appendChild(buttonLink);
      }
    }
  }
  
  function addCustomCss() {
    const styles = document.createElement("style");
    styles.textContent = `
      .custom-button {
        background-color: hsl(260,60%,60%);
        
        padding: 10px 20px;
        margin: 0px 0px 20px 8px;
        
        border: none;
        border-radius: 4px;
        
        color: white !important;
        font-weight: bold;
      }
    `;
    
    document.head.appendChild(styles);
  }
  
  // initial removal of boxes
  removeBoxes();
  
  // initial removal of header buttons
  // removeHeaderButtons();
  
  // add extra homepage elements
  addElements();
  
  // add custom CSS to make things look better
  addCustomCss();
  
  // observe changes to the homepage and remove boxes if they reappear
  const boxMutationObserver = new MutationObserver(removeBoxes);
  boxMutationObserver.observe(view, {
    childList: true,
    subtree: true
  });
  
  // observe changes to the header and remove buttons if they reappear
  const headerMutationObserver = new MutationObserver(removeHeaderButtons);
  headerMutationObserver.observe(navigation, {
    childList: true,
    subtree: true
  });
})();