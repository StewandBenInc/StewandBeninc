let headingCoonter = 1;
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
    let givenFeedback = [];
    for (let i = 1; i <= headingCoonter; ++i) {
        givenFeedback.push(document.getElementById(`heading${i}`).value);
        if (submit && !save) {
            save = false;
            parseData(title, name, email, givenFeedback);
        }
        if (save && !submit) {
            saveData(title, name, email, givenFeedback);
        }
        return 0;
    };

    function parseData(title, name, email, givenFeedback, subgivenFeedback, items) {
        console.log("parsing data to save server-side");
        let parsedData = {
            email: email,
            name: name,
            data: {}
        }
        for (let i = 1; i <= headingCoonter; i++) {
            let headingKey = `heading${i}`;
            parsedData[headingKey] = givenFeedback[i - 1];
            console.log(parsedData);
            db.collection("feedback").doc(title).set(parsedData);
            setTimeout(function () {
                clearData();
            }, 1000)
            return 0;
        }

        for (let i = 1; i <= headingCoonter; i++) {
            let headingKey = `heading${i}`;
            parsedData[headingKey] = givenFeedback[i - 1];
        }

        console.log("saving data to local storage");
        localStorage.setItem('data', JSON.stringify(parsedData));
        localStorage.setItem('givenFeedback', headingCoonter.toString());
        localStorage.setItem('items', JSON.stringify(itemCoonter));
        return 0;
    }
function saveData(title, name, email, givenFeedback) {
    let parsedData = {
        title: title,
        email: email,
        name: name,
        data:{}
    }
  for (let a = 1; a <= headingCoonter; a++) {
    let headingKey = `heading${a}`;
    parsedData[headingKey] = givenFeedback[a - 1];
}

    console.log("saving data to local storage");
    localStorage.setItem('data', JSON.stringify(parsedData));
    localStorage.setItem('givenFeedback', headingCoonter.toString());
    return 0;
}
    function loadData() {
        let grabbedgivenFeedback = JSON.parse(localStorage.getItem('givenFeedback'));
        let grabbedItems = JSON.parse(localStorage.getItem('items'));
        let grabbedData = JSON.parse(localStorage.getItem('data'));

        // Dealing with givenFeedback
        let neededgivenFeedback = grabbedgivenFeedback - headingCoonter;
        for (let i = 0; i < neededgivenFeedback; i++) {
            addHeading();
        }

        // Dealing with SubgivenFeedback
        let neededSubgivenFeedback = 0;
        for (let j = 0; j < headingCoonter; j++) {
            neededSubgivenFeedback = grabbedSubheading[j] - subheadingCoonter[j];
            for (let k = 0; k < neededSubgivenFeedback; k++) {
                addSubheading(j + 1);
            }
        }

        // Dealing with Items
        let neededItems = 0;
        for (let l = 0; l < headingCoonter; l++) {
            for (let m = 0; m < subheadingCoonter[l]; m++) {
                neededItems = grabbedItems[l][m] - itemCoonter[l][m];
                for (let n = 0; n < neededItems; n++) {
                    addItem(l + 1, m + 1);
                }
            }
        }

        // Dealing with other fields
        document.getElementById("email").value = grabbedData.email;
        document.getElementById("name").value = grabbedData.name;
        document.getElementById("title").value = grabbedData.title;

        // Dealing with data
        for (let o = 1; o <= headingCoonter; o++) {
            document.getElementById(`heading${o}`).value = grabbedData[`heading${o}`];

        }
        console.log("loaded data from local storage");
    }

    function clearData() {
        localStorage.removeItem('data');
        localStorage.removeItem('givenFeedback');
        localStorage.removeItem('items');
        location.reload();
    }

    function checkAccount() {
        if (getCookie("username")) {
            console.log("Account exists");
        } else {
            window.location.href = "/Signin/notallowed.html";
        }
    };
    window.onload = checkAccount()
    window.onload = setTimeout(function () {
        loadData();
    }, 100)
}