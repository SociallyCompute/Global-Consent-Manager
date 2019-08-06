"use strict";

async function list(blocked, manual) {
    const storage = await browser.storage.sync.get();
    const stats = [0, 0, 0, 0];
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    for (let [domain, site] of Object.entries(storage)) {
        stats[!!site.manual * 2 + !site.blocked * 1]++;
        if (!blocked != !site.blocked || !manual != !site.manual) {
            continue;
        }
        delete site.blocked;
        delete site.manual;
        const count = Object.keys(site).length;
        let li = document.createElement("li");
        li.textContent = "" + domain + (count ? (" " + count) : "");
        ul.appendChild(li);
    }
    return stats;
}

async function main() {
    const storage = await browser.storage.sync.get();
    console.log(JSON.stringify(storage, null, 4));

    const stats = await list(true, false);

    const inputs = document.querySelectorAll("label > input");
    for (let [key, option] of Object.entries(inputs)) {
        let count = document.createElement("span");
        count.textContent = stats[key];
        option.parentElement.appendChild(count);
        option.addEventListener("change", () => list(key % 2 == 0, key / 2 | 0));
    }
    inputs[0].checked = true;
}

main();
