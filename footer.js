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
        const footer = document.querySelector(".footer");
        const body = document.body;
        const isContentShort = body.scrollHeight <= window.innerHeight;
        if (isContentShort) {
          footer.style.position = "fixed";
          footer.style.bottom = "0";
          footer.style.left = "0";
          footer.style.width = "100%";
          body.style.overflow = 'hidden';
        } else {
          footer.style.position = "relative";
          body.style.overflow = 'auto';
        }
      });
  });
  