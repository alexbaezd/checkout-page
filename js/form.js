const form = document.getElementById("form-checkout");
const submitButton = document.getElementById("submit-btn");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const fullName = document.getElementById("fullName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const country = document.getElementById("selectCountry");
const postalCode = document.getElementById("postalCode");

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

(function () {
  "use strict";

  window.addEventListener(
    "load",
    function () {
      let forms = document.getElementsByClassName("needs-validation");

      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              form.classList.add("was-validated");
              event.preventDefault();
              event.stopPropagation();
            }

            if (form.checkValidity() === true) {
              event.preventDefault();
              event.stopPropagation();
              alert(getMessage());
              form.classList.remove("was-validated");
              form.reset();
              // bootstrap-select
              $(".selectpicker").selectpicker("deselectAll");
            }
          },
          false
        );
      });
    },
    false
  );
})();

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
