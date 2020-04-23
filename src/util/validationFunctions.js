export function required(propertyType) {
  return v => (v && v.length > 0) || `You must input ${propertyType}`;
}
export function minLength(propertyType, minLength) {
  return v =>
    (v && v.length >= minLength) || `Must be at least ${minLength} characters`;
}
export function regexUsername() {
  let regexUsername = /^([a-zA-Z0-9\-._@+\\])*$/;
  return v =>
    regexUsername.test(v) || 'Your username contains not allowed characters.';
}
export function passwordUppercase() {
  let regexPasswordUpper = /[A-Z]+/;
  return v =>
    regexPasswordUpper.test(v) ||
    'Password must contain at least one uppercase letter';
}
export function passwordNumber() {
  let regexPasswordNumber = /[0-9]+/;
  return v =>
    regexPasswordNumber.test(v) || 'Password must contain at least one number';
}
export function regexEmail() {
  let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return v =>
    regexEmail.test(v) || 'Email provided is not a valid email address';
}
export function isName() {
  let regexName = /[0-9]+/;
  return v => !regexName.test(v) || 'Name cannot contain number';
}
