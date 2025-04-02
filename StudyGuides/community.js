let headingCoonter = 1;
let subheadingCoonter = [1];
let itemCoonter = [[1]];

function addHeading() {
    let dataDiv = document.getElementById("headings");
    ++headingCoonter;
    subheadingCoonter.push(1);
    itemCoonter.push([1]);
    dataDiv.innerHTML += `<br>
    <input type="text" id="heading${headingCoonter}" class="heading" oninput="collectData(false,true)" required placeholder="Heading ${headingCoonter}">
                <div id="subheadinglistheading1">
                    <input type="text" id="subheading1heading${headingCoonter}" oninput="collectData(false,true)" class="subheading" required placeholder="Subheading 1 in Heading ${headingCoonter}">
                    <br>
                    <div id="itemlistsubheading1heading${headingCoonter}">
                        <textarea id="item1subheading1heading${headingCoonter}" class="item" oninput="collectData(false,true)" required placeholder="Item 1 in Subheading 1 in Heading ${headingCoonter}"></textarea>
                        <br>             
                    </div>
                    <button class="itemadder" onclick="addItem(1,1)" oninput="collectData(false,true)">Add Item</button>
                    <br>
                </div>
                <br>
                <button class="subheadingadder" onclick="addSubheading(1)" oninput="collectData(false,true)">Add Subheading</button>`;
    return 0;
}
function addSubheading(heading) {
    let dataDiv = document.getElementById(`subheadinglistheading${heading}`);
    ++subheadingCoonter[heading-1];
    itemCoonter[heading-1].push(1);
    dataDiv.innerHTML += `<br>
    <input type="text" id="subheading${subheadingCoonter[heading-1]}heading${heading}" oninput="collectData(false,true)" class="subheading" required placeholder="Subheading ${subheadingCoonter[heading-1]} in Heading ${heading}">
    <br>
    <div id="itemlistsubheading${subheadingCoonter[heading-1]}heading${heading}">
        <textarea id="item1subheading${subheadingCoonter[heading-1]}heading${heading}" oninput="collectData(false,true)" class="item" required placeholder="Item 1 in Subheading ${subheadingCoonter[heading-1]} in Heading ${heading}"></textarea>
        <br>
    </div>
    <button class="itemadder" onclick="addItem(${heading}, ${subheadingCoonter[heading-1]}) oninput="collectData(false,true)"">Add Item</button>`;
    return 0;
}
function addItem(heading, subheading) {
    let dataDiv = document.getElementById(`itemlistsubheading${subheading}heading${heading}`);
    ++itemCoonter[heading-1][subheading-1];
    dataDiv.innerHTML += `<textarea id="item${itemCoonter[heading-1][subheading-1]}subheading${subheading}heading${heading}" oninput="collectData(false,true)" class="item" required placeholder="Item ${itemCoonter[heading-1][subheading-1]} in Subheading ${subheading} in Heading ${heading}"></textarea>
    <br>`;
    return 0;
}
function collectData(submit, save) {
    let item = "";
    let title = document.getElementById("title").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let headings = [];
    let subheadings = [[]];
    let items = [[[]]];
    for (let i = 1; i < headingCoonter+1; ++i) {
        headings.push(document.getElementById(`heading${i}`).value);
        for (let j = 1; j < subheadingCoonter[i-1]+1; ++j) {
            subheadings[i-1].push(document.getElementById(`subheading${j}heading${i}`).value);
            for (let k = 1; k < itemCoonter[i-1][j-1]+1; ++k) {
                items[i-1][j-1].push(document.getElementById(`item${k}subheading${j}heading${i}`).value);
            }
            items[i-1].push([]);
        }
        subheadings.push([]);
        items[i-1].pop();
        items.push([[]]);
    }
    items.pop();
    subheadings.pop();
    if(submit && !save) {
        save = false;
        parseData(title, name, email, subject, headings, subheadings, items);
    }
    if(save && !submit) {
        saveData(title, name, email, subject, headings, subheadings, items);
    }
    return 0;
}
function parseData(title, name, email, subject, headings, subheadings, items) {
    console.log("parsing data to save server-side");
    return 0;
}
function saveData(title, name, email, subject, headings, subheadings, items) {
    console.log("saving data to local storage");
    return 0;
}

window.onload = function() {
}