let showingWelcome = true;
let correctPassword = "yourCorrectPassword"; 

function toggleView() {
  const welcomeSection = document.querySelector(".welcome-section");
  const loginSection = document.querySelector(".login-section");
  const toggleButton = document.querySelector(".switch-btn");

  if (showingWelcome) {
    welcomeSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    toggleButton.setAttribute("aria-expanded", "true");
  } else {
    loginSection.classList.add("hidden");
    welcomeSection.classList.remove("hidden");
    toggleButton.setAttribute("aria-expanded", "false");
  }

  showingWelcome = !showingWelcome;
}

document.querySelector("#password").addEventListener("input", function () {
  const password = this.value;
  const leftLock = document.querySelector(".left-lock");
  const rightLock = document.querySelector(".right-lock");

  if (password === correctPassword) {
    leftLock.classList.add("unlock");
    rightLock.classList.add("unlock");
    leftLock.classList.remove("wiggle");
    rightLock.classList.remove("wiggle");
  } else {
    leftLock.classList.remove("unlock");
    rightLock.classList.remove("unlock");
    leftLock.classList.add("wiggle");
    rightLock.classList.add("wiggle");
  }
});

function showAlertAndRedirect() {
  alert("WELLCOME TO ECHO-VIT");
  window.location.href = "./project1.html.html";

}
