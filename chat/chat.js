
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
function goChatRoom(roomId) {
    window.location.href = `/chat/chat.html?roomId=${roomId}`;
};
document.getElementById("createButton").onclick = function () {
    const roomName = document.getElementById("roomName").value;
    if (roomName) {
        joinedRoom(true);
    } else {
        alert("Please enter a room name.");
    }
};
document.getElementById("joinButton").onclick = function () {
    joinedRoom(false);
};
function joinedRoom(create) {
    const person = getCookie("username");
    if (!person) {
        alert("Please sign in to join a chat room.");
    }
    let currentTime
    function time() {
      currentTime = new Date();
    };
    const roomRef = db.collection("chatRooms").doc(person);
    const roomName = document.getElementById("roomName").value;
    if (create == true) {
        if (roomName) {
            time()
            try {
                roomRef.set({
                    room: roomName,
                    hide: true,
                    time: time
                });
            } catch (e) {
                console.log(e)
            }
           goChatRoom(roomName);
        }
        else {
            alert("Please enter a room name.");

        }
    }
    else {
        const selectedRoom = document.getElementById("join").value;
        try { roomRef.set({ room: roomName, hide: false, time: time }); } catch (e) { console.log(e) }
        goChatRoom(selectedRoom);
    }
}