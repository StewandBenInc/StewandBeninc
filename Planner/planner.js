let calendar;
const classes = [];
const frees = [];
const homework = [];
const scheduledTasks = [];

const schedule = [];

document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });
  calendar.render();
});

function parseTimeString(timeStr) {
  const minutes = Number.parseInt(timeStr);
  if (Number.isNaN(minutes)) return 0;
  return minutes;
}

function addClass() {
  const subject = document.getElementById('class').value;
  const classTime = document.getElementById('classTime').value;
  const days = Array.from(document.getElementById('classDay').selectedOptions).map(option => option.value);
  if (!subject || !classTime || days.length === 0) {
    alert('Please fill all class fields');
    return false;
  }
  // biome-ignore lint/complexity/noForEach: <explanation>
  days.forEach(day => {
    classes.push([subject, classTime, day]);
    schedule.push({ type: 'Class', name: subject, day: day, time: classTime });
  });
  updateHomeworkClassOptions();
  console.log('Schedule:', schedule);
  return false;
}

function addFreeTime() {
  const freeName = document.getElementById('freeName').value;
  const freeTimeStart = document.getElementById('freeTimeStart').value;
  const freeTimeEnd = document.getElementById('freeTimeEnd').value;
  const freeDay = document.getElementById('freeDay').value;

  if (!freeName || !freeTimeStart || !freeTimeEnd || !freeDay) {
    alert('Please fill all free time fields');
    return false;
  }

  frees.push({ name: freeName, start: freeTimeStart, end: freeTimeEnd, day: freeDay });
  schedule.push({ type: 'Free', name: freeName, day: freeDay, start: freeTimeStart, end: freeTimeEnd });
  console.log('Schedule:', schedule);
  return false;
}

function addHomework() {
  const homeworkName = document.getElementById('taskName').value;
  const selectedClass = document.getElementById('taskClass').value;
  const dueDate = document.getElementById('taskDue').value;
  const taskTime = document.getElementById('taskTime').value;
  const isPriority = document.getElementById('taskPriority').checked;

  if (!homeworkName || !selectedClass || !dueDate || !taskTime) {
    alert('Please fill all homework fields');
    return false;
  }

  homework.push({ name: homeworkName, class: selectedClass, due: dueDate, time: taskTime, priority: isPriority });

  scheduleHomeworkTasks();
  updateAssignmentsList();

  return false;
}

function updateHomeworkClassOptions() {
  const taskClassSelect = document.getElementById('taskClass');
  taskClassSelect.innerHTML = '';
  // biome-ignore lint/complexity/noForEach: <explanation>
  classes.forEach(([subject]) => {
    if (![...taskClassSelect.options].some(opt => opt.value === subject)) {
      const option = document.createElement('option');
      option.value = subject;
      option.textContent = subject;
      taskClassSelect.appendChild(option);
    }
  });
}

function updateAssignmentsList() {
  const assignmentList = document.getElementById('assignmentList');
  assignmentList.innerHTML = '';

  // biome-ignore lint/complexity/noForEach: <explanation>
  homework.forEach(({ name, class: relatedClass, due, time, priority }) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', function() {
      if (this.checked) {
        listItem.classList.add('funny-animation');
        setTimeout(() => {
          listItem.remove();
          alert("🎉 Good job! Task completed!");
        }, 500);
      }
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(` ${name} (${relatedClass}) - Due: ${due} - Estimated: ${time} min - Priority: ${priority ? 'Yes' : 'No'}`));

    const taskSchedule = scheduledTasks.find(t => t.name === name);
    if (taskSchedule) {
      const scheduleInfo = document.createElement('div');
      scheduleInfo.style.fontSize = '0.8em';
      scheduleInfo.innerHTML = `Scheduled: ${taskSchedule.day} ${taskSchedule.start} - ${taskSchedule.end}`;
      listItem.appendChild(scheduleInfo);
    }

    assignmentList.appendChild(listItem);
  });
}

function scheduleHomeworkTasks() {
  scheduledTasks.length = 0;
  const sortedHomework = [...homework].sort((a, b) => b.priority - a.priority);
  // biome-ignore lint/complexity/noForEach: <explanation>
  sortedHomework.forEach(task => {
    let minutesLeft = parseTimeString(task.time);

    for (const free of frees) {
      if (minutesLeft <= 0) break;

      // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
      const freeStart = free.start.split(":"), freeEnd = free.end.split(":"), freeStartMinutes = Number.parseInt(freeStart[0]) * 60 + Number.parseInt(freeStart[1]), freeEndMinutes = Number.parseInt(freeEnd[0]) * 60 + Number.parseInt(freeEnd[1]);
      const freeDuration = freeEndMinutes - freeStartMinutes;

      if (freeDuration <= 0) continue;

      const slotMinutes = Math.min(freeDuration, minutesLeft);

      const slotStartHour = Math.floor(freeStartMinutes / 60).toString().padStart(2, '0');
      const slotStartMin = (freeStartMinutes % 60).toString().padStart(2, '0');
      const slotEndTotalMinutes = freeStartMinutes + slotMinutes;
      const slotEndHour = Math.floor(slotEndTotalMinutes / 60).toString().padStart(2, '0');
      const slotEndMin = (slotEndTotalMinutes % 60).toString().padStart(2, '0');

      scheduledTasks.push({
        name: task.name,
        day: free.day,
        start: `${slotStartHour}:${slotStartMin}`,
        end: `${slotEndHour}:${slotEndMin}`
      });

      minutesLeft -= slotMinutes;
      free.start = `${slotEndHour}:${slotEndMin}`;
    }
  });
  console.log('Schedule:', schedule);
}