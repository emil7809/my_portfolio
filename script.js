"use strict";

window.addEventListener("DOMContentLoaded", start);

let personality = false;

//const per = document.querySelector(".per").textContent;
// let iterator;
// let max;

const allPorts = [];
const Port = {};

function start() {
    console.log("start");
    document.querySelector("#pro_vs_personality").addEventListener("click", proVsPer);

    loadJSON();
    makeButtons();
}

function makeButtons() {
    console.log("make buttons");
    document.querySelectorAll("[data-action='filter']")
    .forEach(button => button.addEventListener("click", selectFilter));
}

function proVsPer() {
//try making a loop
    if (personality === false) {
        personality = true;
        document.querySelector(".per").classList.add("show");
        //per.classList.add("show");
        document.querySelector("#pro_vs_personality").style.backgroundColor = "deeppink";
        //init();
    } else {
        personality = false;
        document.querySelector(".per").classList.remove("show"); 
        document.querySelector("#pro_vs_personality").style.backgroundColor = "white"; 
    }
    
}

// function init(){
//     iterator = 0;
//     max = per.length;
//     document.querySelector(".per").innerHTML = "";

//     loop();
// }

// function loop() {
//     iterator++;

//     if (iterator <= max) {
//         document.querySelector(".per").innerHTML += per[iterator-1];
//         setTimeout(loop, 30);
//     }

    
// }

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
    allPorts.push(port);

    });

    displayList(allPorts);
}



function selectFilter(event) {
    console.log("select filter");
    const filter = event.target.dataset.filter;
    filterList(filter);
}

function filterList(filterBy) {
    
    
    let filteredList = allPorts;

    if (filterBy === "one") {
        filteredList = allPorts.filter(isOne);
    } else if (filterBy === "two"){
        filteredList = allPorts.filter(isTwo);
    }
    
    displayList(filteredList);
}

function isOne(port) {
    console.log("one");
    return port.type === "1 Semester";
}

function isTwo(port) {
    return port.type === "2 Semester";
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