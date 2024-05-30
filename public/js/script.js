(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const FULL_DASH_ARRAY = 339.292;
const TIME_LIMIT = 300; // Change to desired time limit in seconds
let timePassed = 0;
let timeLeft = TIME_LIMIT;

const timer = document.querySelector(".timer");
const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function startTimer() {
  const timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    timer.textContent = formatTime(timeLeft);
    setCircleProgress();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Timer Up");
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function setCircleProgress() {
  const offset = circumference - (timePassed / TIME_LIMIT) * -circumference;
  circle.style.strokeDashoffset = offset;
}
if (timer && circle) {
  startTimer();
}
