window.addEventListener('scroll', function () {
  const scrollY = window.scrollY; // Get current scroll position
  const moveTopBtn = document.getElementById('move-top');
  const whatsappRedirectBtn = document.getElementById('whatsapp-redirect');
  const threshold = 100; // Show button after scrolling more than 100px

  if (scrollY > threshold) {
    moveTopBtn.classList.add('visible');
    whatsappRedirectBtn.classList.add('visible');
  } else {
    moveTopBtn.classList.remove('visible');
    whatsappRedirectBtn.classList.remove('visible');
  }
});


const popperElements = document.querySelectorAll(".poppers");

for (const popperElement of popperElements) {
  popperElement.addEventListener("click", openPopupForm);
}


// Main contact form
const form = document.getElementById("contact-form");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const phoneNumber = phoneInput.value;
  const indianPhoneRegex = /^[6-789]\d{9}$/;
  if (!indianPhoneRegex.test(phoneNumber)) {
    phoneError.style.visibility = "visible";
    phoneError.textContent = "Invalid phone number. Please enter valid 10-digit number";
    phoneInput.classList.add("error");
    return;
  }

  phoneError.style.visibility = "hidden";
  phoneInput.classList.remove("error");

  console.log("Form submitted! Name:", document.getElementById("name").value, ", Phone:", phoneNumber);
  form.reset();
});


// Popup contact form:
const popupForm = document.getElementById("popup-contact-form");
const popupPhoneInput = document.getElementById("popup-phone");
const popupPhoneError = document.getElementById("popup-phone-error");

popupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const phoneNumber = popupPhoneInput.value;
  const indianPhoneRegex = /^[6-789]\d{9}$/;
  if (!indianPhoneRegex.test(phoneNumber)) {
    popupPhoneError.style.visibility = "visible";
    popupPhoneError.textContent = "Invalid phone number. Please enter valid 10-digit number";
    return;
  }

  console.log("Popup Form submitted! Name:", document.getElementById("popup-name").value, ", Phone:", phoneNumber);
  closePopupForm();
});

document.getElementById('popup-overlay').addEventListener("onclick", closePopupForm());

function openPopupForm() {
  document.getElementById(
    "popup-form-container"
  ).style.display = "block";

  document.getElementById(
    "popup-overlay"
  ).style.display = "block";
}

function closePopupForm() {
  document.getElementById(
    "popup-form-container"
  ).style.display = "none";

  document.getElementById(
    "popup-overlay"
  ).style.display = "none";

  document.getElementById(
    "popup-contact-form"
  ).reset();

  const popupPhoneError = document.getElementById("popup-phone-error");
  popupPhoneError.style.visibility = "hidden";
}