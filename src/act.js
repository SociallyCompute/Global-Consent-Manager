"use strict";

async function sendSite() {
    let newContent = "";
    for (let i = 0; i < sites.length; i++) {
        newContent += sites[i].domain + "<br>";
    }
    document.getElementById("container").innerHTML = newContent;
}

window.addEventListener("DOMContentLoaded", sendSite);
