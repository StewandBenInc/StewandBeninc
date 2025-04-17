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

function submitRequest() {
    const requestData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        request: document.getElementById('gameRequest').value,
    };

    db.collection("gameRequests").doc(document.getElementById('email').value).set(requestData)
        .then(() => {
            console.log("Request submitted successfully");
            alert("Request submitted successfully");
        })
        .catch((error) => {
            console.error("Error submitting request: ", error);
            alert("Error submitting request");
        });
    
    setTimeout(() => {
        location.reload();
    }, 1000);
}