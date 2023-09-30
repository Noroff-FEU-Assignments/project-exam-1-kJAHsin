// set classnames to inputs based on their validity
export function isValid(elem) {
	elem.className = "valid";
}

export function isNotValid(elem) {
	elem.className = "invalid";
}

export function isEmpty(elem) {
	elem.className = "";
}
