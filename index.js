function loaded() {
  document.getElementById('contact-form').addEventListener("submit", handleFormSubmit);
  document.getElementById('popup-contact-form').addEventListener("submit", handlePopupForm);
  document.getElementById('popup-phone').addEventListener('change', phoneNumberValidation);
  document.getElementById('phone').addEventListener('change', phoneNumberValidation);
};

document.addEventListener("DOMContentLoaded", loaded, false);

// Handlers move-to-top and whatsapp chat function
window.addEventListener('scroll', function () {
  const scrollY = window.scrollY; // Get current scroll position
  const moveTopBtn = document.getElementById('move-top');
  const whatsappRedirectBtn = document.getElementById('whatsapp-redirect');
  const threshold = 100;

  if (scrollY > threshold) {
    moveTopBtn.classList.add('visible');
    whatsappRedirectBtn.classList.add('visible');
  } else {
    moveTopBtn.classList.remove('visible');
    whatsappRedirectBtn.classList.remove('visible');
  }
});


// Handles Poppers
const popperElements = document.querySelectorAll(".poppers");

for (const popperElement of popperElements) {
  popperElement.addEventListener("click", openPopupForm);
}

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
    "popup-contact-form"
  ).reset();
  document.getElementById(
    "popup-form-container"
  ).style.display = "none";
  document.getElementById(
    "popup-overlay"
  ).style.display = "none";
}

function getFormData(form) {
  var elements = form.elements;
  var honeypot;
  var formData = {};
  formData.full_name = elements.full_name.value;
  formData.email = elements.email.value;
  formData.phoneNumber = elements.phone_number.value;
  formData.honeypot = elements._protect.checked;
  return { data: formData, honeypot: honeypot };
}


function handleFormSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var formData = getFormData(form);

  if (formData == null || formData.honeypot) {
    return;
  }

  var data = formData.data;

  pauseButtonDuringRequest(form, true);
  var url = "https://script.google.com/macros/s/AKfycbwpWqJDsz_EDsLgDFiaD88ydOJur212I_o-FFkLOJ6MGlqeWenAUcCU1ZKMSd9vDUZPqg/exec";
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      form.reset();
      var thankYouMessage = form.querySelector(".thankyou_message");
      if (thankYouMessage) {
        thankYouMessage.style.display = "block";
      }
    }
    pauseButtonDuringRequest(form, false);
  };
  var encoded = Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
  }).join('&');

  try {
    console.log(encoded);
    xhr.send(encoded);
  } catch (error) {
    console.log(error);
  }
}

function handlePopupForm(event) {
  var result = handleFormSubmit(event);
  if (result == null)
    closePopupForm();
}

function phoneNumberValidation(ev) {
  const input = ev.target;
  const indianPhoneRegex = /^[6-789]\d{9}$/;
  if (!indianPhoneRegex.test(input.value)) {
    input.setCustomValidity("Invalid phone number. Please enter valid 10-digit number");
  } else {
    input.setCustomValidity("");
  }
}

function pauseButtonDuringRequest(form, isPause) {
  var buttons = form.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = isPause;
  }
}
