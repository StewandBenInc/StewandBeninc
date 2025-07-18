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
const params = new URLSearchParams(window.location.search);
const userEditing = params.get("user");

function checkSignIn() {
    if(userEditing!== null) {
        return;
    } else {
        window.location.href = "/Signin/notallowed.html";
    }
}

async function fillIn() {
    if (userEditing) {
        document.getElementById("user").innerHTML = userEditing;
        document.getElementById("currentusername").innerHTML = userEditing;
        await db.collection("accounts").doc(userEditing).get().then((data) => {
            document.getElementById("currentname").innerHTML = data.data().name;
            document.getElementById("currentemail").innerHTML = data.data().email;
            document.getElementById("currentgrade").innerHTML = data.data().grade;
            document.getElementById("currentcalendar").innerHTML = data.data().calendar;
        }).catch((error) => {
            console.error("Error getting document:", error);
        });
    }
}

function signOut() {
    if(getCookie("username")) {
        document.cookie = "username=;path=/";
    }
    if(getCookie("admin")) {
        document.cookie = "admin=;path=/";
    }
    if(getCookie("mvp")) {
        document.cookie = "mvp=;path=/";
    }
    alert("You have been signed out");
    window.location.href = "/index.html";
}

async function deleteAccount() {
    if(confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        if (userEditing) {
            await db.collection("accounts").doc(userEditing).delete().then(() => {
                alert("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
        signOut();
    }
}

async function usernameChange() {
    if (userEditing) {
        let data = await db.collection("accounts").doc(userEditing).get();
        let realData = data.data();
        console.log(realData);
        await db.collection("accounts").doc(userEditing).delete();
        await db.collection("accounts").doc(document.getElementById("username").value).set(realData);
        document.cookie = "username=" + document.getElementById("username").value + ";";
        location.reload();
    }
}

async function nameChange() {
    if (userEditing) {
        await db.collection("accounts").doc(userEditing).update({
            name: document.getElementById("name").value
        }).then(() => {
            alert("Name successfully changed!");
        }).catch((error) => {
            console.error("Error changing name: ", error);
        });
        location.reload();
    }
}

async function emailChange() {
    if (userEditing) {
        await db.collection("accounts").doc(userEditing).update({
            email: document.getElementById("email").value
        }).then(() => {
            alert("Email successfully changed!");
        }).catch((error) => {
            console.error("Error changing Email: ", error);
        });
        location.reload();
    }
}

async function gradeChange() {
    if (userEditing) {
        await db.collection("accounts").doc(userEditing).update({
            grade: document.getElementById("grade").value
        }).then(() => {
            alert("Grade successfully changed!");
        }).catch((error) => {
            console.error("Error changing grade: ", error);
        });
        location.reload();
    }
}

async function calChange() {
    if (userEditing) {
        await db.collection("accounts").doc(userEditing).update({
            calendar: document.getElementById("cal").value
        }).then(() => {
            alert("Calendar link successfully changed!");
        }).catch((error) => {
            console.error("Error changing calendar link: ", error);
        });
        location.reload();
    }
}

window.onload = async () => {
    checkSignIn();
    await fillIn();
}
