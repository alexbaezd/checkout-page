const form = document.getElementById("form-checkout");
const submitButton = document.getElementById("submit-btn");

const email = document.getElementById("email");
const phone = document.getElementById("phone");
const fullName = document.getElementById("fullName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const country = document.getElementById("selectCountry");
const postalCode = document.getElementById("postalCode");
const selectCountries = new vanillaSelectBox("#selectCountry", {
  placeHolder: "Your Country",
  maxSelect: 3,
  translations: { all: "All", items: "Countries" },
});

const btnIncrement = document.getElementById("incrementVintageBackpack");
const btnDecrement = document.getElementById("decrementVintageBackpack");
const btnIncrementShoes = document.getElementById("incrementLeviShoes");
const btnDecrementShoes = document.getElementById("decrementLeviShoes");
const totalAmount = document.getElementById("totalAmount");
const shipping = parseInt(
  document.getElementById("shipping").innerText.substring(1)
);
const offerVintageBackpack = parseFloat(
  document.getElementById("offerVintageBackpack").innerText.substring(1)
);
const offerLeviShoes = parseFloat(
  document.getElementById("offerLeviShoes").innerText.substring(1)
);

const ERROR_MESSAGES = {
  BLANK: (ref, error) => showError(ref, error),
  EMAIL: (ref, error) => {
    if (!isEmail(ref.value)) {
      setErrorFor(ref, error);
    } else {
      setSuccessFor(ref);
    }
  },
  PHONE: (ref, error) => {
    if (!isPhoneNumber(ref.value)) {
      setErrorFor(ref, error);
    } else {
      setSuccessFor(ref);
    }
  },
  SELECT: (ref, error) => {
    if (getValuesFromSelect("selectCountry").length === 0) {
      setErrorFor(ref, error);
    } else {
      setSuccessForSelect(ref);
    }
  },
};
const getDataWithErrorMessages = () => {
  return [
    {
      id: 1,
      ref: email,
      message: "Email cannot be blank",
      type: "BLANK",
    },
    {
      id: 12,
      ref: email,
      message: "Not a valid email",
      type: "EMAIL",
    },
    {
      id: 2,
      ref: fullName,
      message: "Full name cannot be blank",
      type: "BLANK",
    },
    {
      id: 3,
      ref: phone,
      message: "Phone cannot be blank",
      type: "PHONE",
    },
    {
      id: 4,
      ref: address,
      message: "Address cannot be blank",
      type: "BLANK",
    },
    {
      id: 5,
      ref: city,
      message: "City cannot be blank",
      type: "BLANK",
    },
    {
      id: 6,
      ref: postalCode,
      message: "Postal cannot be blank",
      type: "BLANK",
    },
    {
      id: 7,
      ref: country,
      message: "Choose a country",
      type: "SELECT",
    },
  ];
};

const validate = () => {
  const data = getDataWithErrorMessages();
  data.forEach((element) => {
    if (ERROR_MESSAGES[element.type]) {
      ERROR_MESSAGES[element.type](element.ref, element.message);
    }
  });
};

const showError = (element, message) => {
  if (isEmpty(element)) setErrorFor(element, message);
  else setSuccessFor(element);
};

const setErrorFor = (input, message) => {
  const formControl = input.closest(".form-control");
  const small = formControl.querySelector("small");

  formControl.className = "form-control error";
  small.innerText = message;
};

const setSuccessFor = (input) => {
  const formControl = input.closest(".form-control");
  formControl.className = "form-control success";
};

const setSuccessForSelect = () => {
  const select = document.getElementById("btn-group-selectCountry");
  select.className = "vsb-main success";
};

const isEmpty = (element) => (element.value.trim() === "" ? true : false);

const getMessage = () =>
  "===== Ticket =======" +
  "\n " +
  "Name: " +
  fullName.value +
  "\n " +
  "Phone: " +
  phone.value +
  "\n " +
  "Email: " +
  email.value +
  "\n" +
  "Address: " +
  address.value +
  " " +
  city.value +
  " " +
  postalCode.value +
  " " +
  getValuesFromSelect("selectCountry") +
  "\n===== Total =======" +
  "\n" +
  totalAmount.innerText +
  "\n=================";

const removeStylesSuccess = () => {
  getDataWithErrorMessages().forEach((element) => {
    const formControl = element.ref.closest(".form-control");
    formControl.className = "form-control";
  });
  const select = document.getElementById("btn-group-selectCountry");
  select.className = "vsb-main";
};
const getValuesFromSelect = (id) => {
  let result = [];
  let collection = document.querySelectorAll("#" + id + " option");
  collection.forEach(function (x) {
    if (x.selected) {
      result.push(x.value);
    }
  });
  return result;
};
const isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const isPhoneNumber = (phone) => {
  return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
};

submitButton.addEventListener("click", validate);

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("👀 Please email address");
  } else {
    email.setCustomValidity("");
    setSuccessFor(email);
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (getValuesFromSelect("selectCountry").length > 0) {
    alert(getMessage());
    form.reset();
    selectCountries.empty();
    removeStylesSuccess();
  }
});

/*=====================Products================================== */
btnIncrement.addEventListener("click", () =>
  incrementAmount("amountVintageBackpack")
);

btnIncrementShoes.addEventListener("click", () =>
  incrementAmount("amountLeviShoes")
);

btnDecrement.addEventListener("click", () =>
  decrementAmount("amountVintageBackpack")
);

btnDecrementShoes.addEventListener("click", () =>
  decrementAmount("amountLeviShoes")
);

const incrementAmount = (id) => {
  const element = document.getElementById(id);
  element.innerHTML = parseInt(element.innerHTML) + 1;
  calculateAmount();
};

const decrementAmount = (id) => {
  const element = document.getElementById(id);
  let amount = parseInt(element.innerHTML);

  if (amount !== 0) amount = amount - 1;
  else amount = 0;

  element.innerHTML = amount;
  calculateAmount();
};

const calculateAmount = () => {
  const product1 = getSubTotalProduct(
    offerVintageBackpack,
    "amountVintageBackpack"
  );

  const product2 = getSubTotalProduct(offerLeviShoes, "amountLeviShoes");

  const amount = product1 + product2 + shipping;

  if (!validateAmount(product1 + product2)) {
    totalAmount.innerHTML = `$${amount.toFixed(2)}`;
    submitButton.disabled = false;
  } else {
    totalAmount.innerHTML = "Please add a product";
    submitButton.disabled = true;
  }
};

const getSubTotalProduct = (offer, amount) =>
  offer * parseInt(document.getElementById(amount).innerHTML);

const validateAmount = (amount) => (amount === 0 ? true : false);
