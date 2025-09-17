let headingCoonter = 1;
//equivalent to community.js
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
function collectData(submit, save) {
    let title = document.getElementById("title").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let headings = [];
    for (let i = 1; i <= headingCoonter; ++i) {
        headings.push(document.getElementById(`heading${i}`).value);
    }
    if(submit && !save) {
        save = false;
        parseData(title, name, email, subject, headings);
    }
    if(save && !submit) {
        saveData(title, name, email, subject, headings);
    }
    return 0;
}

function parseData(title, name, email, subject, headings) {
    console.log("parsing data to save server-side");
    let parsedData = {
        email: email,
        name: name,
        subject: subject,
        headings: headings
    };
    db.collection("blog").doc(title).set(parsedData);
    setTimeout(function() {clearData();}, 1000)
    return 0;
}

function saveData(title, name, email, subject, headings) {
    let parsedData = {
        title: title,
        email: email,
        name: name,
        subject: subject,
        headings: headings
    };
    console.log("saving data to local storage");
    localStorage.setItem('data', JSON.stringify(parsedData));
    localStorage.setItem('headings', headingCoonter.toString());
    return 0;
}

function loadData() {
    let grabbedData = JSON.parse(localStorage.getItem('data'));

    // Dealing with Headings
    addHeading();

    // Dealing with other fields
    document.getElementById("email").value = grabbedData.email;
    document.getElementById("name").value = grabbedData.name;
    document.getElementById("subject").value = grabbedData.subject;
    document.getElementById("title").value = grabbedData.title;

    document.getElementById(`heading${1}`).value = grabbedData.headings[0];
    console.log("loaded data from local storage");
}
function clearData() {
    localStorage.removeItem('data');
    localStorage.removeItem('headings');
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
try{
window.onload = setTimeout(function() {loadData();}, 100)}
catch(e){console.log("No data to load")}