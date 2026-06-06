const form = document.querySelector("#eventForm");
const ticketType = document.querySelector("#ticketType");
const conditionalField = document.querySelector("#conditionalField");
const conditionalLabel = document.querySelector("#conditionalLabel");
const errorsSection = document.querySelector("#errors");
const output = document.querySelector("#output");

function updateConditionalField() {
  const val = ticketType.value;

  if (val === "student") {
    conditionalField.hidden = false;
    conditionalLabel.textContent = "Student I#";
    form.conditionalInput.value = "";
  } else if (val === "guest") {
    conditionalField.hidden = false;
    conditionalLabel.textContent = "Access Code";
    form.conditionalInput.value = "";
  } else {
    conditionalField.hidden = true;
    form.conditionalInput.value = "";
  }
}

ticketType.addEventListener("change", updateConditionalField);
updateConditionalField();


function isPastOrToday(dateValue) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(dateValue + "T00:00:00");
  return chosen <= today;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  errorsSection.innerHTML = "";
  output.innerHTML = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.ticketType.value;
  const eventDate = form.eventDate.value;
  const extra = form.conditionalInput.value.trim();

  const errors = [];

  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");

  if (!email) {
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!type) errors.push("Please select a ticket type.");

  if (!eventDate) {
    errors.push("Please select an event date.");
  } else if (isPastOrToday(eventDate)) {
    errors.push("Event date must be later than today.");
  }

  if (type === "student") {
    if (!extra) {
      errors.push("Student I# is required.");
    } else if (!/^\d{9}$/.test(extra)) {
      errors.push("Student I# must be 9 digits.");
    }
  } else if (type === "guest") {
    if (!extra) {
      errors.push("Access Code is required.");
    } else if (extra !== "EVENT131") {
      errors.push("Access Code is invalid.");
    }
  }

  if (errors.length > 0) {
    errorsSection.innerHTML = errors.map(e => `<p>${e}</p>`).join("");
    return;
  }

  output.innerHTML = `
    <h2>Ticket Created</h2>
    <p>${firstName} ${lastName}</p>
    <p>${type}</p>
    <p>${eventDate}</p>
  `;

  form.reset();
  updateConditionalField();
});