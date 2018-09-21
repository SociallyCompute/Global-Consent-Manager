"use strict";

async function sendSite() {
    let contain = document.getElementById("container");
    let children = contain.childNodes;
    for (let i = 0; i < children.length; i++) {
        contain.removeChild(children[i]);
    }
    let br;
    let para = document.getElementById("container");
    let newContent = "";
    for (let i = 0; i < sites.length; i++) {
        newContent = document.createTextNode(sites[i].domain);
        br = document.createElement("br");
        para.appendChild(br);
        para.appendChild(newContent);
    }
}

window.addEventListener("DOMContentLoaded", sendSite);
