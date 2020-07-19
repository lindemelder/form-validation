const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input, message) {
  //traverse to parent element, which is div class=form-control
  const formControl = input.parentElement;
  //applies the styling fof .form.control.error small css styling
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Success outline of input forms
function showSuccess(input) {
  //traverse to parent element, which is div class=form-control
  const formControl = input.parentElement;
  //applies the styling for.form.control.success small
  formControl.className = 'form-control success';
}

//regex to validate email
//source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //removed with refactoring: return re.test(String(email).toLowerCase());
  if (re.test(String(email.value.trim()).toLowerCase())) {
    showSuccess(email);
  } else {
    showError(email, 'Email is not valid');
  }
}

//check Required fields
function checkRequired(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length for username and pass
function checkLength(input, min, max) {
  //min check
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    //max check
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
}

//validate passwords match
function checkPasswordsMatch(password1, password2) {
  if (password1.value != password2.value) {
    showError(password2, 'Passwords do not match');
  }
}

//for the custom error messages, depending on which input
function getFieldName(input) {
  //grab input, take first letter make upper case, concat the rest of the input
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Event listeners
form.addEventListener('submit', (e) => {
  //prevents submit
  e.preventDefault();
  //function call to check form validation
  checkRequired([username, email, password, password2]);
  //username validation func (input, min, max)
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
