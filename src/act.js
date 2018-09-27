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

async function toGH(e) {
    let check = document.getElementById("checkvalue");
    if (check.checked) {
        let body = "**The Issue**" + "%0A%0A";
        body += document.getElementById("box2").value + "%0A%0A";
        body += "**Computer Specifications**" + "%0A%0A";
        body += document.getElementById("box2-2").value + "%0A%0A";
        body += "**Extra Information**" + "%0A%0A";
        body += document.getElementById("box3").value + "%0A%0A";
        body += "_This issue was submitted via the Global Consent Manager Web Extension_";
        let title = document.getElementById("box1").value;
        console.log(title);
        let [tab] = await browser.tabs.query({active: true, currentWindow: true});
        await browser.tabs.create({
            url: "https://github.com/SociallyCompute/Global-Consent-Manager/issues/new?title="
            + document.getElementById("box1").value
            + "&body="
            + body
            + "&projects=loading..."});
    } else {
        console.log("DOESNT WORK");
        document.getElementById("checkvalue2").style.color = "#cb4335";
    }
}

document.getElementById("bugsubmit").addEventListener("click", toGH);
window.addEventListener("DOMContentLoaded", sendSite);
