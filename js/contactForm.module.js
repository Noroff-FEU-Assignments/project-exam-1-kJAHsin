import { isValid, isNotValid, isEmpty } from "./validation.js";
import { logoLink } from "./links.js";

logoLink();

// form validation
const contactForm = document.querySelector(".contact-form");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactSubject = document.getElementById("contactSubject");
const contactMessage = document.getElementById("contactMessage");

const submitBtn = document.getElementById("submitBtn");

const invalidAlertMessages = {
	contactName:
		"Please enter a valid name: 5-33 characters, only letters and spaces",
	contactEmail: "Please enter a valid email",
	contactSubject: "Please enter a valid subject: greater than 15 characters",
	contactMessage: "Please enter a valid message: greater than 25 characters",
};

console.log(invalidAlertMessages);

// validate name
function validateName() {
	const regEx = /^[a-zA-Z]*$/g;
	const minLength = 5;
	const maxLength = 33;
	const nameInput = contactName.value;
	const nameInputLength = nameInput.length;

	minLength <= nameInputLength &&
	nameInputLength <= maxLength &&
	regEx.test(nameInput)
		? isValid(contactName)
		: isNotValid(contactName);
}

// validate email
function validateEmail() {
	const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	const emailInput = contactEmail.value;

	regEx.test(emailInput) ? isValid(contactEmail) : isNotValid(contactEmail);
}

// validate subject
function validateSubject() {
	const subjectInputLength = contactSubject.value.length;
	subjectInputLength > 15
		? isValid(contactSubject)
		: isNotValid(contactSubject);
}

// validate message
function validateMessage() {
	const messageInputLength = contactMessage.value.length;
	messageInputLength > 25
		? isValid(contactMessage)
		: isNotValid(contactMessage);
}

const contactInputs = [
	...contactForm.querySelectorAll("input"),
	contactForm.querySelector("textarea"),
];

function alertInvalid() {
	contactInputs.forEach((input) => {
		if (input.className === "invalid") {
			const messageKey = input.id;
			const alertMessage = invalidAlertMessages[messageKey];
			alert(alertMessage);
		}
	});
}

// click handler on submit
submitBtn.addEventListener("click", (e) => {
	e.preventDefault();
	validateName();
	validateEmail();
	validateSubject();
	validateMessage();
	alertInvalid();
});

// dynamic change of validation colors
contactInputs.forEach(input => {
	input.addEventListener("keydown", () => {
		validateName();
		validateEmail();
		validateSubject();
		validateMessage();
	});
});
