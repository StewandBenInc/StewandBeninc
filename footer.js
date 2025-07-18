document.addEventListener("DOMContentLoaded", () => {
  fetch("/FooterAndNav/footer.html")
    .then(response => response.text())
    .then(data => {
    document.body.insertAdjacentHTML("beforeend", data);
    const cookies = document.cookie.split(';');
    let signedIn = false;
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith("username" + '=')) {
        if(cookie.substring(9)) {
          signedIn = true;
        }
      }
    }
    if (!signedIn) {
      document.getElementById("dash").style.display = "none";
      document.getElementById("loginarea").style.display = "inline-block";
    }
    // Remove JS footer positioning logic
    });
});
