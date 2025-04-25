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

async function addTheThing() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                const username = cookie.substring(9);
                console.log(username)
                await db.collection("accounts").doc(username).get().then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        const webcalURL = data.calendar;
                        return fetchICSandParseToFullCalendar(webcalURL);
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }
        }
    }
}

function convertWebcalToHttps(url) {
    return url.replace(/^webcal:/i, "https:");
}

let fullCalendarEvents = [];
async function fetchICSandParseToFullCalendar(url) {
    
const httpsURL = convertWebcalToHttps(url);
const proxiedURL = "https://corsproxy.io/?" + encodeURIComponent(httpsURL);
    

try {
    const response = await fetch(proxiedURL);
    const icsText = await response.text();
    const jcalData = ICAL.parse(icsText);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents("vevent");

    // Clear existing events
    fullCalendarEvents = [];

    for (const evt of vevents) {
    const e = new ICAL.Event(evt);
    fullCalendarEvents.push({
        title: e.summary,
        start: e.startDate.toString(),
        end: e.endDate.toString()
    });
    return fullCalendarEvents;
    }

    console.log("Updated FullCalendar events:", fullCalendarEvents);
} catch (err) {
    console.error("Failed to fetch or parse .ics file:", err);
}
}

document.addEventListener('DOMContentLoaded', function() {
    if (!window.FullCalendar) {
        console.error("FullCalendar is not loaded properly.");
        return;
    }
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: 'bootstrap5',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        weekNumbers: true,
        dayMaxEvents: true,
        initialView: 'dayGridMonth',
        events: function (fetchInfo, successCallback, failureCallback) {
            fetch('dates.json')
            .then(response => response.json())
            .then(data => successCallback(data))
            .catch(error => failureCallback(error));
        }
    });
    calendar.render();
});

addTheThing();
console.log(fullCalendarEvents)