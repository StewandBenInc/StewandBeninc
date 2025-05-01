let dishCoonter = 1;
let partCoonter = [1];
let stepCoonter = [[1]];

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

function adddish() {
    let dataDiv = document.getElementById("dishs");
    ++dishCoonter;
    partCoonter.push(1);
    stepCoonter.push([1]);

    const dishInput = document.createElement("input");
    dishInput.type = "text";
    dishInput.id = `dish${dishCoonter}`;
    dishInput.className = "dish";
    dishInput.required = true;
    dishInput.placeholder = `dish ${dishCoonter}`;
    dishInput.setAttribute("oninput", "collectData(false,true)");

    const partDiv = document.createElement("div");
    partDiv.id = `partlistdish${dishCoonter}`;

    const partInput = document.createElement("input");
    partInput.type = "text";
    partInput.id = `part1dish${dishCoonter}`;
    partInput.className = "part";
    partInput.required = true;
    partInput.placeholder = `Part 1 in Dish ${dishCoonter}`;
    partInput.setAttribute("oninput", "collectData(false,true)");

    const stepListDiv = document.createElement("div");
    stepListDiv.id = `steplistpart1dish${dishCoonter}`;

    const stepTextarea = document.createElement("textarea");
    stepTextarea.id = `step1part1dish${dishCoonter}`;
    stepTextarea.className = "step";
    stepTextarea.required = true;
    stepTextarea.placeholder = `Step 1 in Part 1 in Dish ${dishCoonter}`;
    stepTextarea.setAttribute("oninput", "collectData(false,true)");

    stepListDiv.appendChild(stepTextarea);
    stepListDiv.appendChild(document.createElement("br"));

    const stepAdderBtn = document.createElement("button");
    stepAdderBtn.className = "stepadder";
    stepAdderBtn.textContent = "Add step";
    stepAdderBtn.setAttribute("onclick", `addstep(${dishCoonter}, 1)`);

    partDiv.appendChild(partInput);
    partDiv.appendChild(document.createElement("br"));
    partDiv.appendChild(stepListDiv);
    partDiv.appendChild(stepAdderBtn);
    partDiv.appendChild(document.createElement("br"));

    const partAdderBtn = document.createElement("button");
    partAdderBtn.className = "partadder";
    partAdderBtn.textContent = "Add Part";
    partAdderBtn.setAttribute("onclick", `addpart(${dishCoonter})`);

    dataDiv.appendChild(document.createElement("br"));
    dataDiv.appendChild(dishInput);
    dataDiv.appendChild(partDiv);
    dataDiv.appendChild(document.createElement("br"));
    dataDiv.appendChild(partAdderBtn);

    return 0;
}
function addpart(dish) {
    const partIndex = ++partCoonter[dish - 1];
    stepCoonter[dish - 1].push(1);

    const dataDiv = document.getElementById(`partlistdish${dish}`);

    const partInput = document.createElement("input");
    partInput.type = "text";
    partInput.id = `part${partIndex}dish${dish}`;
    partInput.className = "part";
    partInput.required = true;
    partInput.placeholder = `part ${partIndex} in dish ${dish}`;
    partInput.setAttribute("oninput", "collectData(false,true)");

    const lineBreak1 = document.createElement("br");

    const stepListDiv = document.createElement("div");
    stepListDiv.id = `steplistpart${partIndex}dish${dish}`;

    const stepTextarea = document.createElement("textarea");
    stepTextarea.id = `step1part${partIndex}dish${dish}`;
    stepTextarea.className = "step";
    stepTextarea.required = true;
    stepTextarea.placeholder = `step 1 in Part ${partIndex} in dish ${dish}`;
    stepTextarea.setAttribute("oninput", "collectData(false,true)");

    const lineBreak2 = document.createElement("br");

    stepListDiv.appendChild(stepTextarea);
    stepListDiv.appendChild(lineBreak2);

    const stepButton = document.createElement("button");
    stepButton.className = "stepadder";
    stepButton.textContent = "Add step";
    stepButton.onclick = () => {
        addstep(dish, partIndex);
    };

    const lineBreak3 = document.createElement("br");

    dataDiv.appendChild(lineBreak1);
    dataDiv.appendChild(partInput);
    dataDiv.appendChild(document.createElement("br"));
    dataDiv.appendChild(stepListDiv);
    dataDiv.appendChild(stepButton);
    dataDiv.appendChild(lineBreak3);

    return 0;
}
function addstep(dish, part) {
    const stepIndex = ++stepCoonter[dish - 1][part - 1];

    const stepListDiv = document.getElementById(`steplistpart${part}dish${dish}`);

    const newstepTextarea = document.createElement("textarea");
    newstepTextarea.id = `step${stepIndex}part${part}dish${dish}`;
    newstepTextarea.className = "step";
    newstepTextarea.required = true;
    newstepTextarea.placeholder = `Step ${stepIndex} in Part ${part} in Dish ${dish}`;
    newstepTextarea.setAttribute("oninput", "collectData(false,true)");

    const lineBreak = document.createElement("br");

    stepListDiv.appendChild(newstepTextarea);
    stepListDiv.appendChild(lineBreak);

    return 0;
}
function collectData(submit, save) {
    let step = "";
    let title = document.getElementById("title").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let dishs = [];
    let parts = [[]];
    let steps = [[[]]];
    for (let i = 1; i <= dishCoonter; ++i) {
        dishs.push(document.getElementById(`dish${i}`).value);
        for (let j = 1; j <= partCoonter[i-1]; ++j) {
            parts[i-1].push(document.getElementById(`part${j}dish${i}`).value);
            for (let k = 1; k < stepCoonter[i-1][j-1]+1; ++k) {
                steps[i-1][j-1].push(document.getElementById(`step${k}part${j}dish${i}`).value);
            }
            steps[i-1].push([]);
        }
        parts.push([]);
        steps[i-1].pop();
        steps.push([[]]);
    }
    steps.pop();
    parts.pop();
    if(submit && !save) {
        save = false;
        parseData(title, name, email, subject, dishs, parts, steps);
    }
    if(save && !submit) {
        saveData(title, name, email, subject, dishs, parts, steps);
    }
    return 0;
}
function parseData(title, name, email, subject, dishs, parts, steps) {
    console.log("parsing data to save server-side");
    let parsedData = {
        email: email,
        name: name,
        subject: subject,
        data:{}
    }
    for (let i = 1; i <= dishCoonter; i++) {
        let dishKey = `dish${i}`;
        parsedData.data[dishKey] = {
            name: dishs[i-1],
            parts: {}
        };
        for (let j = 1; j <= partCoonter[i - 1]; j++) {
            let partKey = `part${j}`;
            parsedData.data[dishKey]["parts"][partKey] = {
                name: parts[i-1][j-1],
                steps: {}
            };
            for (let k = 1; k <= stepCoonter[i - 1][j - 1]; k++) {
                let stepKey = `step${k}`;
                parsedData.data[dishKey]["parts"][partKey]["steps"][stepKey] = steps[i-1][j-1][k-1];
            };
        }
    }
    db.collection("recipes").doc(title).set(parsedData);
    setTimeout(() => {clearData();}, 1000)
    return 0;
}
function saveData(title, name, email, subject, dishs, parts, steps) {
    let parsedData = {
        title: title,
        email: email,
        name: name,
        subject: subject,
        data:{}
    }
    for (let a = 1; a <= dishCoonter; a++) {
        let dishKey = `dish${a}`;
        parsedData.data[dishKey] = {
            name: dishs[a-1]
        };
        for (let b = 1; b <= partCoonter[a - 1]; b++) {
            let partKey = `part${b}`;
            parsedData.data[dishKey][partKey] = {
                name: parts[a-1][b-1]
            };
            for (let c = 1; c <= stepCoonter[a - 1][b - 1]; c++) {
                let stepKey = `step${c}`;
                parsedData.data[dishKey][partKey][stepKey] = steps[a-1][b-1][c-1];
            };
        }
    }
    console.log("saving data to local storage");
    localStorage.setstep('data', JSON.stringify(parsedData));
    localStorage.setstep('dishs', dishCoonter.toString());
    localStorage.setstep('parts', JSON.stringify(partCoonter));
    localStorage.setstep('steps', JSON.stringify(stepCoonter));
    return 0;
}

function loadData() {
    let grabbeddishs = JSON.parse(localStorage.getstep('dishs'));
    let grabbedpart = JSON.parse(localStorage.getstep('parts'));
    let grabbedsteps = JSON.parse(localStorage.getstep('steps'));
    let grabbedData = JSON.parse(localStorage.getstep('data'));

    // Dealing with dishs
    let neededdishs = grabbeddishs-dishCoonter;
    for (let i=0; i<neededdishs; i++) {
        adddish();
    }

    // Dealing with parts
    let neededparts = 0;
    for (let j=0; j<dishCoonter; j++) {
        neededparts = grabbedpart[j]-partCoonter[j];
        for (let k=0; k<neededparts; k++) {
            addpart(j+1);
        }
    }

    // Dealing with steps
    let neededsteps = 0;
    for (let l=0; l<dishCoonter; l++) {
        for (let m=0; m<partCoonter[l]; m++) {
            neededsteps = grabbedsteps[l][m]-stepCoonter[l][m];
            for (let n=0; n<neededsteps; n++) {
                addstep(l+1, m+1);
            }
        }
    }

    // Dealing with other fields
    document.getElementById("email").value = grabbedData.email;
    document.getElementById("name").value = grabbedData.name;
    document.getElementById("subject").value = grabbedData.subject;
    document.getElementById("title").value = grabbedData.title;

    // Dealing with data
    for(let o=1; o<=dishCoonter; o++) {
        document.getElementById(`dish${o}`).value = grabbedData.data[`dish${o}`].name;
        for (let p=1; p<=partCoonter[o-1]; p++) {
            document.getElementById(`part${p}dish${o}`).value = grabbedData.data[`dish${o}`][`part${p}`].name;
            for (let q=1; q<=stepCoonter[o-1][p-1]; q++) {
                document.getElementById(`step${q}part${p}dish${o}`).value = grabbedData.data[`dish${o}`][`part${p}`][`step${q}`];
            }
        }
    }
    console.log("loaded data from local storage");
}
function clearData() {
    localStorage.removestep('data');
    localStorage.removestep('dishs');
    localStorage.removestep('parts');
    localStorage.removestep('steps');
    location.reload();
}

window.onload = setTimeout(() => {loadData();}, 100)