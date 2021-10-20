"use strict";

window.addEventListener("DOMContentLoaded", start);

let personality = false;

const allProts = [];

const Port = {};

function start() {
    console.log("start");
    document.querySelector("#pro_vs_personality").addEventListener("click", proVsPer);

    loadJSON();
}

function proVsPer() {
//try making a loop
    if (personality === false) {
        personality = true;
        document.querySelector(".per").classList.add("show");
        document.querySelector("#pro_vs_personality").style.backgroundColor = "pink";
    } else {
        personality = false;
        document.querySelector(".per").classList.remove("show"); 
        document.querySelector("#pro_vs_personality").style.backgroundColor = "white"; 
    }
    
}

function loadJSON() {
    fetch("portfolio.json")
    .then((response) => response.json())
    .then((jsonData) => {
        prepareObjects(jsonData);
      });
}

function prepareObjects(jsonData) {
    console.log("prepare");
    jsonData.forEach((jsonObject) => {
     
    //crate new object
    const port = Object.create(Port);    
    
    const img = jsonObject.img;
    port.img = img;
    
    const headline = jsonObject.headline;
    port.headline = headline;

    const tekst = jsonObject.tekst;
    port.tekst = tekst;

    const type = jsonObject.type;
    port.type = type;

    const linkElement = jsonObject.link;
    if (linkElement.includes("none")){
        const link = "";
        port.link = link;
    } else {
        const link = `<a href="`+jsonObject.link+`">Link</a>`;
        port.link = link;
    }
    
    

    //add the objekt to the global array
    allProts.push(port);

    });

    displayList(allProts);
}

function displayList(portfolioToDisplay) {
 // clear the list
 document.querySelector("#list tbody").innerHTML = "";

 // build a new list
 portfolioToDisplay.forEach(displayPortfolio);
}

function displayPortfolio(port) {
    const clone = document.querySelector("template#port").content.cloneNode(true);

    clone.querySelector("img").src = port.img;
    clone.querySelector("[data-field=headline]").textContent = port.headline;
    clone.querySelector("[data-field=type]").textContent = port.type;
    clone.querySelector("[data-field=tekst]").textContent = port.tekst;
    clone.querySelector("[data-field=link]").textContent = port.link;
    clone.querySelector("[data-field=link]").innerHTML = port.link;

    document.querySelector("#list tbody").appendChild(clone);
}