function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function toggleNav(option) {
    console.log(option)
    if (getCookie(option) == "false") {
        document.cookie = `${option}=true; path=/;`;
        document.getElementById(`${option}btn`).style.backgroundColor = "green";
        window.alert(`${option} set to true`)

    } else {
        document.cookie = `${option}=false; path=/;`;
        document.getElementById(`${option}btn`).style.backgroundColor = "red";

        window.alert(`${option} set to false`)
    }
}

function setAvaibleNavOptions(availArrayOps) {
    let options = "";
    for (let i = 0; i < availArrayOps.length; i++) {
        id = availArrayOps[i].name;
        const displayName = camelToTitleCase(id); // Convert for <p>

        console.log(id);
        if (availArrayOps[i].signinReq == false) {
            options += `<li style="list-style-type:none; display:flex; flex-direction:row;"id="${id}"><button class="toggle-btn" id="${id}btn" onclick="toggleNav('${id}');">Toggle</button><p style="margin-left:10px">${displayName}</p></li><br>`
            console.log(`Added ${id} to the nav bar options`)
        } else if (availArrayOps[i].signinReq == true) {
            if (getCookie("username")) {
                options += `<li style="list-style-type:none; display:flex; flex-direction:row;"id="${id}"><button class="toggle-btn" id="${id}btn" onclick="toggleNav('${id}');">Toggle</button><p style="margin-left:10px">${displayName}</p></li><br>`
                console.log(`Added ${id} to the nav bar options`)
            }
        }
    };
    if (options == null) {
        console.log("nothin")
    } else {
        document.getElementById("customOptions").innerHTML = options;
    }
    setTimeout(() => {
        for (let i = 0; i < availArrayOps.length; i++) {
            const id = availArrayOps[i].name;
            const btn = document.getElementById(`${id}btn`);
            if (!btn) continue;

            const state = getCookie(id);
            if (state === "false") {
                btn.style.backgroundColor = "red";
            } else {
                btn.style.backgroundColor = "green";
            }
        }
    }, 0);
};

function camelToTitleCase(camel) {
    return camel
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
}

window.onload = () => {
    setAvaibleNavOptions(availArrayOps);
};