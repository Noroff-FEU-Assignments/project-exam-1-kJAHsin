import { isValid, isNotValid } from "../functions/validation.js";
import { logoLink } from "../functions/links.js";

// set link on logo in header
logoLink();

// form validation
// hooking into
const contactForm = document.querySelector(".contact-form");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactSubject = document.getElementById("contactSubject");
const contactMessage = document.getElementById("contactMessage");

const submitBtn = document.getElementById("submitBtn");

// object with key-valued alert messages
const invalidAlertMessages = {
	contactName:
		"Please enter a valid name: 5-33 characters, only letters and spaces",
	contactEmail: "Please enter a valid email",
	contactSubject: "Please enter a valid subject: greater than 15 characters",
	contactMessage: "Please enter a valid message: greater than 25 characters",
};

// validate name
function validateName() {
	const regEx = /^[a-zA-Z,æ,ø,å, ]*$/g;
	const minLength = 4;
	const maxLength = 33;
	const nameInput = contactName.value;
	const nameInputLength = nameInput.length;

	minLength <= nameInputLength &&
	nameInputLength < maxLength &&
	regEx.test(nameInput)
		? isValid(contactName)
		: isNotValid(contactName);
}

// validate email
function validateEmail() {
	const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	const emailInput = contactEmail.value;

	regEx.test(emailInput) 
		? isValid(contactEmail) 
		: isNotValid(contactEmail);
}

// validate subject
function validateSubject() {
	const subjectInputLength = contactSubject.value.length;
	subjectInputLength >= 14
		? isValid(contactSubject)
		: isNotValid(contactSubject);
}

// validate message
function validateMessage() {
	const messageInputLength = contactMessage.value.length;
	messageInputLength >= 24
		? isValid(contactMessage)
		: isNotValid(contactMessage);
}

// array of inputs for contact form
const contactInputs = [
	...contactForm.querySelectorAll("input:not([type='submit'])"),
	contactForm.querySelector("textarea"),
];

// catch errors and report error message to user
function alertInvalid() {
	const errorMessage = document.querySelectorAll(".form-input p");

	contactInputs.forEach((input, idx) => {
		if (input.className == "invalid") {
			const messageKey = input.id;
			const alertMessage = invalidAlertMessages[messageKey];
			errorMessage[idx].innerText = alertMessage;
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
contactInputs.forEach((input) => {
	input.addEventListener("keydown", () => {
		validateName();
		validateEmail();
		validateSubject();
		validateMessage();
	});
});

// name in modal
const submitModal = document.querySelector(".submit-modal");
const closeBtn = document.querySelector(".close-modal");
const modalText = submitModal.querySelector("p");

function showModal() {
	contactInputs.forEach((input) => {
		if (input.className != "invalid") {
			submitModal.classList.add("show");
			modalText.innerText = contactName.value;
		}
	});
}

function closeModal() {
	submitModal.classList.remove("show");
	contactInputs.forEach((input) => {
		input.value = "";
	});
}

submitBtn.addEventListener("click", showModal);

closeBtn.addEventListener("click", closeModal);
