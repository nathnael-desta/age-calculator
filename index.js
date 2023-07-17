const dayTextArea = document.getElementById("day");
const monthTextArea = document.getElementById("month");
const yearTextArea = document.getElementById("year");
const ageYears = document.querySelector(".years");
const ageMonths = document.querySelector(".months");
const ageDays = document.querySelector(".days");
const submit = document.querySelector(".arrow");
const eDay = document.querySelector(".error-day");
const eMonth = document.querySelector(".error-month");
const eYear = document.querySelector(".error-year");
const dayLabel = document.querySelector('label[for="day"]');
const monthLabel = document.querySelector('label[for="month"]');
const yearLabel = document.querySelector('label[for="year"]');

let error = false;
let day;
let month;
let year;
let today = new Date();
let tDay = today.getDate();
let tMonth = today.getMonth() + 1;
let tYear = today.getFullYear();
let monthMinus = 0;
let yearMinus = 0;
let calculated = false;

function checkIfError() {
  day = parseInt(dayTextArea.value);
  month = parseInt(monthTextArea.value);
  year = parseInt(yearTextArea.value);
  error = !Number.isInteger(day)
    ? true
    : !Number.isInteger(month)
    ? true
    : !Number.isInteger(year)
    ? true
    : false;

  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    if (day > 31 || day < 1) {
      error = true;
    }
  } else if ([4, 5, 9, 11].includes(month)) {
    if (day > 30 || day < 1) {
      error = true;
    }
  } else if (month == 2) {
    if (day > 29 || day < 1) {
      error = true;
    }
  } else {
    error = true;
  }

  if (year > 2023 || year < 1900) {
    error = true;
  }
}

function reset() {
  error = false;
  eDay.textContent = "";
  dayTextArea.classList.remove("border-color-red");
  dayLabel.classList.remove("text-color-red");
  eMonth.textContent = "";
  monthTextArea.classList.remove("border-color-red");
  monthLabel.classList.remove("text-color-red");
  eYear.textContent = "";
  yearTextArea.classList.remove("border-color-red");
  yearLabel.classList.remove("text-color-red");
}

function getBD() {
  if (calculated) {
    return;
  }
  calculated = true;
  reset();
  day = parseInt(dayTextArea.value);
  month = parseInt(monthTextArea.value);
  year = parseInt(yearTextArea.value);

  if (dayTextArea.value == "") {
    error = true;
    eDay.textContent = "This field is required";
    dayTextArea.classList.add("border-color-red");
    dayLabel.classList.add("text-color-red");
  }
  if (monthTextArea.value == "") {
    error = true;
    eMonth.textContent = "This field is required";
    monthTextArea.classList.add("border-color-red");
    monthLabel.classList.add("text-color-red");
  }
  if (yearTextArea.value == "") {
    error = true;
    eYear.textContent = "This field is required";
    yearTextArea.classList.add("border-color-red");
    yearLabel.classList.add("text-color-red");
  }

  if (error) {
    return;
  }

  if (!Number.isInteger(day) || 0 > day || day > 31) {
    error = true;
    eDay.textContent = "Must be valid day";
    dayTextArea.classList.add("border-color-red");
    dayLabel.classList.add("text-color-red");
  }
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    if (day > 31 || day < 1) {
      error = true;
      eDay.textContent = "Must be valid day";
      dayTextArea.classList.add("border-color-red");
      dayLabel.classList.add("text-color-red");
    }
  } else if ([4, 5,6, 9, 11].includes(month)) {
    if (day > 30 || day < 1) {
      error = true;
      eDay.textContent = "Must be valid day";
      dayTextArea.classList.add("border-color-red");
      dayLabel.classList.add("text-color-red");
    }
  } else if (month == 2) {
    if (day > 29 || day < 1) {
      error = true;
      eDay.textContent = "Must be valid day";
      dayTextArea.classList.add("border-color-red");
      dayLabel.classList.add("text-color-red");
    }
  } else {
    error = true;
    eMonth.textContent = "Must be valid month";
    monthTextArea.classList.add("border-color-red");
    monthLabel.classList.add("text-color-red");
  }

  if (year > 2023 || year < 1900) {
    error = true;
    eYear.textContent = "Must be valid year";
    yearTextArea.classList.add("border-color-red");
    yearLabel.classList.add("text-color-red");
  }

  if (year == tYear & month > tMonth) {
    error = true;
    eMonth.textContent = "Must be valid month";
    monthTextArea.classList.add("border-color-red");
    monthLabel.classList.add("text-color-red");
  } else if (year == tYear & month && tMonth && tDay < day) {
    error = true;
      eDay.textContent = "Must be valid day";
      dayTextArea.classList.add("border-color-red");
      dayLabel.classList.add("text-color-red");
  }

  if (error) {
    return;
  }

  if (tDay >= day) {
    ageDays.textContent = tDay - day;
  } else {
    ageDays.textContent = [1, 3, 5, 7, 8, 10, 12].includes(month)
      ? 31 - (day - tDay)
      : [4, 5,6, 9, 11].includes(month)
      ? 30 - (day - tDay)
      : 28 - (day - tDay);
      monthMinus++;
  }

  if (tMonth >= month) {
    if(tMonth - month - monthMinus >= 0){
      ageMonths.textContent = tMonth - month - monthMinus;
    }else {
      ageMonths.textContent = 11;
      yearMinus++
    }
  } else {
    ageMonths.textContent = month - tMonth;
    yearMinus++
  }

  ageYears.textContent = tYear - year - yearMinus;
}

submit.addEventListener("click", getBD);


function redo() {
  calculated = false;
}

dayTextArea.addEventListener("change", redo);
monthTextArea.addEventListener("change", redo);
yearTextArea.addEventListener("change", redo);