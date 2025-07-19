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
    if (getCookie(option) == false) {
        document.cookie = `${option[i]}=true; path=/;`;
        document.getElementById(option[i]).style.backgroundColor = "green";
        console.log(`${option[i]} set to true`)

    } else if (getCookie(option[i]) == true) {
        document.cookie = `${option[i]}=false; path=/;`;
        document.getElementById(option[i]).style.backgroundColor = "red";

        console.log(`${option[i]} set to false`)
    }
}

const availArrayOps = [{
    name: "Weather",
    signinReq: false
}]

function setAvaibleNavOptions(availArrayOps) {
    let options ="";
    for (let i = 0; i < availArrayOps.length; i++) {
        id = availArrayOps[i].name;
        console.log(id);
        if (availArrayOps[i].signinReq == false) {
            options += `<li id="${id}">${id}</li> <button class="toggle-btn" id="${id}btn" onclick="toggleNav(['${id}']); window.alert("Toggled ${id} on the nav bar");">Toggle</button>`
            console.log(`Added ${id} to the nav bar options`)
        };
    };
    document.getElementById("customOptions").innerHTML = options;

};