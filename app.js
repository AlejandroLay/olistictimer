const calendarEl = document.getElementById("calendar");
const markBtn = document.getElementById("mark-taken");
const monthYearEl = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

let currentDate = new Date();
let takenDays = JSON.parse(localStorage.getItem("takenDays") || "[]");

markBtn.addEventListener("click", () => {
    const today = new Date().toISOString().slice(0, 10);
    if (!takenDays.includes(today)) {
        takenDays.push(today);
        localStorage.setItem("takenDays", JSON.stringify(takenDays));
        renderCalendar();
        alert("¡Olistic registrado hoy!");
    } else {
        alert("Ya registraste Olistic hoy.");
    }
});

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

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    weekdays.forEach(day => {
        const dayEl = document.createElement("div");
        dayEl.classList.add("weekday");
        dayEl.textContent = day;
        calendarEl.appendChild(dayEl);
    });

    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        const emptyCell = document.createElement("div");
        calendarEl.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().slice(0, 10);
        const div = document.createElement("div");
        div.classList.add("day");
