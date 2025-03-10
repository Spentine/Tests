// ==UserScript==
// @name         Remove Low Tokens
// @namespace    http://tampermonkey.net/
// @version      2025-03-10
// @description  Remove characters with low token count
// @author       Spentine
// @match        https://spicychat.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=spicychat.ai
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const minimumTokens = 800;

  function waitForGrid(callback) {
    const root = document.getElementById("root");
    if (!root) return console.error("Root element not found");

    const observer = new MutationObserver(() => {
      const grid = getGrid();
      if (grid) {
        // observer.disconnect();
        callback(grid);
      }
    });

    observer.observe(root, { childList: true, subtree: true });
  }

  function getGrid() {
    try {
      const root = document.getElementById("root");
      const grid = root
      ?.lastChild?.lastChild?.firstChild
      ?.firstChild?.firstChild?.lastChild
      ?.firstChild?.lastChild?.firstChild
      ?.lastChild?.lastChild || null;
      if (grid === null) return null;
      if (grid.childElementCount < 10) {
        return null;
      }
      return grid;
    } catch (e) {
      console.error("getGrid:", e);
      return null;
    }
  }

  function validateCard(card) {
    const value = Number(
      card
      .firstChild.firstChild.lastChild
      .lastChild.lastChild.lastChild
      .textContent
    );
    return value > minimumTokens;
  }

  function removeCards(grid) {
    console.log("grid", grid);

    const style = document.createElement("style");
    style.innerHTML = ".hidden-card { display: none !important; }";
    document.head.appendChild(style);

    const cards = grid.children;

    for (let i=cards.length-1; i>0; i--) {
      const cardElement = cards[i];
      if (!validateCard(cardElement)) {
        cardElement.classList.add("hidden-card");
      }
    }
  }

  waitForGrid(removeCards);
})();
