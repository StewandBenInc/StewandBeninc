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

function convertWebcalToHttps(url) {
    return url.replace(/^webcal:/i, "https:");
}

async function addTheThing(data) {
        username = getCookie("username");
        console.log(username)
            try {
                const doc = await db.collection("accounts").doc(username).get();
                if (doc.exists) {
                    const otherdata = doc.data();
                    const webcalURL = otherdata.calendar;
                    const httpsURL = convertWebcalToHttps(webcalURL);

                    const corsProxy = "https://corsproxy.io/?";
                    const response = await fetch(corsProxy + encodeURIComponent(httpsURL));
                    const icsText = await response.text();

                    const jcalData = ICAL.parse(icsText);
                    const comp = new ICAL.Component(jcalData);
                    const vevents = comp.getAllSubcomponents("vevent");

                    const icsEvents = vevents.map(vevent => {
                        const event = new ICAL.Event(vevent);
                        return {
                            title: event.summary,
                            start: event.startDate.toJSDate(),
                            end: event.endDate.toJSDate()
                        };
                    });

                    return [...data, ...icsEvents]; // combine and return
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log("Error getting document or parsing ICS:", error);
            }
    return data; // fallback
}

document.addEventListener('DOMContentLoaded', function () {
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
                .then(data => addTheThing(data))
                .then(allEvents => successCallback(allEvents))
                .catch(error => {
                    console.error("Error loading events:", error);
                    failureCallback(error);
                });
        }
    });

    calendar.render();
});
