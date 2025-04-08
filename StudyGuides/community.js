let headingCoonter = 1;
let subheadingCoonter = [1];
let itemCoonter = [[1]];

const firebaseConfig = {
    apiKey: "AIzaSyD3TekvWYk7yGLcmX3P6L-UF3Y9BrF7T94",
    authDomain: "stewandbeninc-d4f92.firebaseapp.com",
    projectId: "stewandbeninc-d4f92",
    storageBucket: "stewandbeninc-d4f92.firebasestorage.app",
    messagingSenderId: "619253654409",
    appId: "1:619253654409:web:2442006d870a0cdff1b758",
    measurementId: "G-SVWPC4TKZK"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addHeading() {
    let dataDiv = document.getElementById("headings");
    ++headingCoonter;
    subheadingCoonter.push(1);
    itemCoonter.push([1]);
    dataDiv.innerHTML += `<br>
    <input type="text" id="heading${headingCoonter}" class="heading" oninput="collectData(false,true)" required placeholder="Heading ${headingCoonter}">
                <div id="subheadinglistheading${headingCoonter}">
                    <input type="text" id="subheading1heading${headingCoonter}" oninput="collectData(false,true)" class="subheading" required placeholder="Subheading 1 in Heading ${headingCoonter}">
                    <br>
                    <div id="itemlistsubheading1heading${headingCoonter}">
                        <textarea id="item1subheading1heading${headingCoonter}" class="item" oninput="collectData(false,true)" required placeholder="Item 1 in Subheading 1 in Heading ${headingCoonter}"></textarea>
                        <br>             
                    </div>
                    <button class="itemadder" onclick="addItem(${headingCoonter},1)" onclick="loadData()" oninput="collectData(false,true)">Add Item</button>
                    <br>
                </div>
                <br>
                <button class="subheadingadder" onclick="addSubheading(${headingCoonter})" onclick="loadData()" oninput="collectData(false,true)">Add Subheading</button>`;
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
    <button class="itemadder" onclick="addItem(${heading}, ${subheadingCoonter[heading-1]})" onclick="loadData()">Add Item</button>`;
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
    for (let i = 1; i <= headingCoonter; ++i) {
        headings.push(document.getElementById(`heading${i}`).value);
        for (let j = 1; j <= subheadingCoonter[i-1]; ++j) {
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
    let parsedData = {
        email: email,
        name: name,
        subject: subject,
        data:{}
    }
    for (let i = 1; i <= headingCoonter; i++) {
        let headingKey = `heading${i}`;
        parsedData.data[headingKey] = {
            name: headings[i-1]
        };
        for (let j = 1; j <= subheadingCoonter[i - 1]; j++) {
            let subheadingKey = `subheading${j}`;
            parsedData.data[headingKey][subheadingKey] = {
                name: subheadings[i-1][j-1]
            };
            for (let k = 1; k <= itemCoonter[i - 1][j - 1]; k++) {
                let itemKey = `item${k}`;
                parsedData.data[headingKey][subheadingKey][itemKey] = items[i-1][j-1][k-1];
            };
        }
    }
    db.collection("users").doc(title).set(parsedData);
    return 0;
}
function saveData(title, name, email, subject, headings, subheadings, items) {
    let parsedData = {
        email: email,
        name: name,
        subject: subject,
        data:{}
    }
    for (let i = 1; i <= headingCoonter; i++) {
        let headingKey = `heading${i}`;
        parsedData.data[headingKey] = {
            name: headings[i-1]
        };
        for (let j = 1; j <= subheadingCoonter[i - 1]; j++) {
            let subheadingKey = `subheading${j}`;
            parsedData.data[headingKey][subheadingKey] = {
                name: subheadings[i-1][j-1]
            };
            for (let k = 1; k <= itemCoonter[i - 1][j - 1]; k++) {
                let itemKey = `item${k}`;
                parsedData.data[headingKey][subheadingKey][itemKey] = items[i-1][j-1][k-1];
            };
        }
    }
    console.log("saving data to local storage");
    localStorage.setItem('data', JSON.stringify(parsedData));
    localStorage.setItem('headings', headingCoonter.toString());
    localStorage.setItem('subheadings', JSON.stringify(subheadingCoonter));
    localStorage.setItem('items', JSON.stringify(itemCoonter));
    return 0;
}

function loadData() {
    let grabbedHeadings = JSON.parse(localStorage.getItem('headings'));
    let grabbedSubheading = JSON.parse(localStorage.getItem('subheadings'));
    let grabbedItems = JSON.parse(localStorage.getItem('items'));
    let grabbedData = JSON.parse(localStorage.getItem('data'));
    let neededHeadings = grabbedHeadings-headingCoonter;
    for (let k = 0; k<neededHeadings; k++) {
        addHeading();
    }
    let neededSubheadings = []
    for (let i=0; i<grabbedSubheading.length; i++) {
        neededSubheadings.push([]);
    }
    for (let j=0; j<grabbedSubheading.length; j++) {
        if (j<subheadingCoonter.length) {
            neededSubheadings[j] = grabbedSubheading[j] - subheadingCoonter[j]
        }
        else {
            neededSubheadings[j] = grabbedSubheading[j]
        }
    }
    console.log(grabbedHeadings);
    console.log(grabbedSubheading);
}
function clearData() {
    localStorage.removeItem('data')
    localStorage.removeItem('headings')
    localStorage.removeItem('subheadings')
    localStorage.removeItem('items')
}
window.onload = setTimeout(function() {loadData();}, 100)