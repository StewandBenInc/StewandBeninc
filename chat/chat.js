function goChatRoom(roomId) {
    window.location.href = `/chat/chat.html?roomId=${roomId}`;
};
document.getElementById("createButton").onclick = function() {
    const roomName = document.getElementById("roomName").value;
    if (roomName) {
        goChatRoom(roomName);
    } else {
        alert("Please enter a room name.");
    }
};
document.getElementById("joinButton").onclick = function() {
    const roomSelect = document.getElementById("join");
    const selectedRoom = roomSelect.value;
    goChatRoom(selectedRoom);
};