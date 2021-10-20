"use strict";

window.addEventListener("DOMContentLoaded", start);

let personality = false;

function start() {
    console.log("start");
    document.querySelector("#pro_vs_personality").addEventListener("click", proVsPer);
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