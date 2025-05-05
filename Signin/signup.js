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

function submit() {
    if (document.getElementById('password').value !== document.getElementById('confirm_password').value) {
        alert("Passwords do not match");
        return;
    }
    if (document.getElementById('password').value.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }
    if (!document.getElementById('password').value.includes('!') && !document.getElementById('password').value.includes('@') && !document.getElementById('password').value.includes('#') && !document.getElementById('password').value.includes('?') && !document.getElementById('password').value.includes('$') && !document.getElementById('password').value.includes('%') && !document.getElementById('password').value.includes('^') && !document.getElementById('password').value.includes('&') && !document.getElementById('password').value.includes('*')) {
        alert("Password must contain at least one special character (!, @, #, ?, $, %, ^, &, *)");
        return;
    }
    if (!document.getElementById('email').value.includes('@')) {
        alert("Please enter a valid email address");
        return;
    }

    const data = {
        name: document.getElementById('name').value,
        password: document.getElementById('password').value,
        grade: document.getElementById('grade').value,
        calendar: document.getElementById('calendarinput').value,
        email: document.getElementById('email').value,
        admin: false,
        mvp: false
    };

    db.collection("accounts").doc(document.getElementById('username').value).set(data)
    
    setTimeout(() => {
        location.reload();
    }, 1000);
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const now = new Date();
    const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
 
    try {
        const data = await db.collection("accounts").doc(username).get()
        if (username === data.id && password === data.data().password) {
            document.cookie = `username=${username};`;
            if (data.data().admin) {
                document.cookie = `admin=true;`;
            } else {
                document.cookie = `admin=false;`;
            }
            if (data.data().mvp) {
                document.cookie = `mvp=true;`;
            } else {
                document.cookie = `mvp=false;`;
            }
            alert("Login successful");
            window.location.href = "/index.html";
        } else {
            alert("Wrong password");
        }
    } catch (error) {
        alert("Account not found");
    }
}