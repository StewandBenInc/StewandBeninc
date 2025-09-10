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

    const headingInput = document.createElement("input");
    headingInput.type = "text";
    headingInput.id = `heading${headingCoonter}`;
    headingInput.className = "heading";
    headingInput.required = true;
    headingInput.placeholder = `Heading ${headingCoonter}`;
    headingInput.setAttribute("oninput", "collectData(false,true)");

    const subheadingDiv = document.createElement("div");
    subheadingDiv.id = `subheadinglistheading${headingCoonter}`;

    const subheadingInput = document.createElement("input");
    subheadingInput.type = "text";
    subheadingInput.id = `subheading1heading${headingCoonter}`;
    subheadingInput.className = "subheading";
    subheadingInput.required = true;
    subheadingInput.placeholder = `Subheading 1 in Heading ${headingCoonter}`;
    subheadingInput.setAttribute("oninput", "collectData(false,true)");

    const itemListDiv = document.createElement("div");
    itemListDiv.id = `itemlistsubheading1heading${headingCoonter}`;

    const itemTextarea = document.createElement("textarea");
    itemTextarea.id = `item1subheading1heading${headingCoonter}`;
    itemTextarea.className = "item";
    itemTextarea.required = true;
    itemTextarea.placeholder = `Item 1 in Subheading 1 in Heading ${headingCoonter}`;
    itemTextarea.setAttribute("oninput", "collectData(false,true)");

    itemListDiv.appendChild(itemTextarea);
    itemListDiv.appendChild(document.createElement("br"));

    const itemAdderBtn = document.createElement("button");
    itemAdderBtn.className = "itemadder";
    itemAdderBtn.textContent = "Add Item";
    itemAdderBtn.setAttribute("onclick", `addItem(${headingCoonter}, 1)`);

    subheadingDiv.appendChild(subheadingInput);
    subheadingDiv.appendChild(document.createElement("br"));
    subheadingDiv.appendChild(itemListDiv);
    subheadingDiv.appendChild(itemAdderBtn);
    subheadingDiv.appendChild(document.createElement("br"));

    const subheadingAdderBtn = document.createElement("button");
    subheadingAdderBtn.className = "subheadingadder";
    subheadingAdderBtn.textContent = "Add Subheading";
    subheadingAdderBtn.setAttribute("onclick", `addSubheading(${headingCoonter})`);

    dataDiv.appendChild(document.createElement("br"));
    dataDiv.appendChild(headingInput);
    dataDiv.appendChild(subheadingDiv);
    dataDiv.appendChild(document.createElement("br"));
    dataDiv.appendChild(subheadingAdderBtn);

    return 0;
}
function addSubheading(heading) {
    const subheadingIndex = ++subheadingCoonter[heading - 1];
    itemCoonter[heading - 1].push(1);

    const dataDiv = document.getElementById(`subheadinglistheading${heading}`);

    const subheadingInput = document.createElement("input");
    subheadingInput.type = "text";
    subheadingInput.id = `subheading${subheadingIndex}heading${heading}`;
    subheadingInput.className = "subheading";
    subheadingInput.required = true;
    subheadingInput.placeholder = `Subheading ${subheadingIndex} in Heading ${heading}`;
    subheadingInput.setAttribute("oninput", "collectData(false,true)");

    const lineBreak1 = document.createElement("br");

    const itemListDiv = document.createElement("div");
    itemListDiv.id = `itemlistsubheading${subheadingIndex}heading${heading}`;

    const itemTextarea = document.createElement("textarea");
    itemTextarea.id = `item1subheading${subheadingIndex}heading${heading}`;
    itemTextarea.className = "item";
    itemTextarea.required = true;
    itemTextarea.placeholder = `Item 1 in Subheading ${subheadingIndex} in Heading ${heading}`;
    itemTextarea.setAttribute("oninput", "collectData(false,true)");

    const lineBreak2 = document.createElement("br");

    itemListDiv.appendChild(itemTextarea);
    itemListDiv.appendChild(lineBreak2);

    const itemButton = document.createElement("button");
    itemButton.className = "itemadder";
    itemButton.textContent = "Add Item";
    itemButton.onclick = function () {
        addItem(heading, subheadingIndex);
    };

    const lineBreak3 = document.createElement("br");

    dataDiv.appendChild(lineBreak1);
    dataDiv.appendChild(subheadingInput);
    dataDiv.appendChild(document.createElement("br"));
    dataDiv.appendChild(itemListDiv);
    dataDiv.appendChild(itemButton);
    dataDiv.appendChild(lineBreak3);

    return 0;
}
function addItem(heading, subheading) {
    const itemIndex = ++itemCoonter[heading - 1][subheading - 1];

    const itemListDiv = document.getElementById(`itemlistsubheading${subheading}heading${heading}`);

    const newItemTextarea = document.createElement("textarea");
    newItemTextarea.id = `item${itemIndex}subheading${subheading}heading${heading}`;
    newItemTextarea.className = "item";
    newItemTextarea.required = true;
    newItemTextarea.placeholder = `Item ${itemIndex} in Subheading ${subheading} in Heading ${heading}`;
    newItemTextarea.setAttribute("oninput", "collectData(false,true)");

    const lineBreak = document.createElement("br");

    itemListDiv.appendChild(newItemTextarea);
    itemListDiv.appendChild(lineBreak);

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
            name: headings[i-1],
            subheadings: {}
        };
        for (let j = 1; j <= subheadingCoonter[i - 1]; j++) {
            let subheadingKey = `subheading${j}`;
            parsedData.data[headingKey]["subheadings"][subheadingKey] = {
                name: subheadings[i-1][j-1],
                items: {}
            };
            for (let k = 1; k <= itemCoonter[i - 1][j - 1]; k++) {
                let itemKey = `item${k}`;
                parsedData.data[headingKey]["subheadings"][subheadingKey]["items"][itemKey] = items[i-1][j-1][k-1];
            };
        }
    }
    db.collection("users").doc(title).set(parsedData);
    setTimeout(function() {clearData();}, 1000)
    return 0;
}
function saveData(title, name, email, subject, headings, subheadings, items) {
    let parsedData = {
        title: title,
        email: email,
        name: name,
        subject: subject,
        data:{}
    }
    for (let a = 1; a <= headingCoonter; a++) {
        let headingKey = `heading${a}`;
        parsedData.data[headingKey] = {
            name: headings[a-1]
        };
        for (let b = 1; b <= subheadingCoonter[a - 1]; b++) {
            let subheadingKey = `subheading${b}`;
            parsedData.data[headingKey][subheadingKey] = {
                name: subheadings[a-1][b-1]
            };
            for (let c = 1; c <= itemCoonter[a - 1][b - 1]; c++) {
                let itemKey = `item${c}`;
                parsedData.data[headingKey][subheadingKey][itemKey] = items[a-1][b-1][c-1];
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

    // Dealing with Headings
    let neededHeadings = grabbedHeadings-headingCoonter;
    for (let i=0; i<neededHeadings; i++) {
        addHeading();
    }

    // Dealing with Subheadings
    let neededSubheadings = 0;
    for (let j=0; j<headingCoonter; j++) {
        neededSubheadings = grabbedSubheading[j]-subheadingCoonter[j];
        for (let k=0; k<neededSubheadings; k++) {
            addSubheading(j+1);
        }
    }

    // Dealing with Items
    let neededItems = 0;
    for (let l=0; l<headingCoonter; l++) {
        for (let m=0; m<subheadingCoonter[l]; m++) {
            neededItems = grabbedItems[l][m]-itemCoonter[l][m];
            for (let n=0; n<neededItems; n++) {
                addItem(l+1, m+1);
            }
        }
    }

    // Dealing with other fields
    document.getElementById("email").value = grabbedData.email;
    document.getElementById("name").value = grabbedData.name;
    document.getElementById("subject").value = grabbedData.subject;
    document.getElementById("title").value = grabbedData.title;

    // Dealing with data
    for(let o=1; o<=headingCoonter; o++) {
        document.getElementById(`heading${o}`).value = grabbedData.data[`heading${o}`].name;
        for (let p=1; p<=subheadingCoonter[o-1]; p++) {
            document.getElementById(`subheading${p}heading${o}`).value = grabbedData.data[`heading${o}`][`subheading${p}`].name;
            for (let q=1; q<=itemCoonter[o-1][p-1]; q++) {
                document.getElementById(`item${q}subheading${p}heading${o}`).value = grabbedData.data[`heading${o}`][`subheading${p}`][`item${q}`];
            }
        }
    }
    console.log("loaded data from local storage");
}
function clearData() {
    localStorage.removeItem('data');
    localStorage.removeItem('headings');
    localStorage.removeItem('subheadings');
    localStorage.removeItem('items');
    location.reload();
}
function checkAccount() {
    if(getCookie("username")) {
        console.log("Account exists");
    }
    else {
        window.location.href = "/Signin/notallowed.html";
    }
};
window.onload = checkAccount()
window.onload = setTimeout(function() {loadData();}, 100)