
const calendarEl = document.getElementById("calendar");
const markOlistic = document.getElementById("mark-olistic");
const markFinasterida = document.getElementById("mark-finasterida");
const markMinoxil = document.getElementById("mark-minoxil");
const monthYearEl = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

let currentDate = new Date();
let records = JSON.parse(localStorage.getItem("records") || "{}");

function getToday() {
    return new Date().toISOString().slice(0, 10);
}

function saveRecord(type) {
    const today = getToday();
    if (!records[today]) records[today] = [];
    if (!records[today].includes(type)) records[today].push(type);
    localStorage.setItem("records", JSON.stringify(records));
    renderCalendar();
}

markOlistic.addEventListener("click", () => saveRecord("olistic"));
markFinasterida.addEventListener("click", () => saveRecord("finasterida"));
markMinoxil.addEventListener("click", () => saveRecord("minoxil"));

prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

function renderCalendar() {
    calendarEl.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYearEl.textContent = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay() || 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    weekdays.forEach(day => {
        const dayEl = document.createElement("div");
        dayEl.classList.add("weekday");
        dayEl.textContent = day;
        calendarEl.appendChild(dayEl);
    });

    for (let i = 1; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarEl.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().slice(0, 10);
        const div = document.createElement("div");
        div.classList.add("day");
        div.textContent = day;

        if (records[dateStr]) {
            if (records[dateStr].includes("olistic")) div.classList.add("taken-olistic");
            if (records[dateStr].includes("finasterida")) div.classList.add("taken-finasterida");
            if (records[dateStr].includes("minoxil")) div.classList.add("taken-minoxil");
        }

        calendarEl.appendChild(div);
    }
}

// Notificación diaria a las 11:00
if ('Notification' in window) {
    Notification.requestPermission().then(() => scheduleNotification());
}

function scheduleNotification() {
    const now = new Date();
    const notificationTime = new Date();
    notificationTime.setHours(11, 0, 0, 0);
    if (now > notificationTime) notificationTime.setDate(notificationTime.getDate() + 1);
    const timeout = notificationTime - now;

    setTimeout(() => {
        new Notification("No olvides registrar tu Olistic, Finasterida y Minoxil");
        scheduleNotification();
    }, timeout);
}

renderCalendar();
