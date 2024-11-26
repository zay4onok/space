const animItems = document.querySelectorAll(".--anim-items");
let animationPaused = true;

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 64;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if (
        scrollY > animItemOffset - animItemPoint &&
        scrollY < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("--active");
      } else {
        if (!animItem.classList.contains("--anim-no-hide")) {
          animItem.classList.remove("--active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
}

// if ("scrollRestoration" in history) {
//   history.scrollRestoration = "manual";
// }

$(".slider__box").slick({
  prevArrow:
    '<img class="slider__arrow slider__arrow-left" src="images/arrowPrev.svg">',
  nextArrow:
    '<img class="slider__arrow slider__arrow-right" src="images/arrowNext.svg">',
});

const buttons = document.querySelectorAll(".button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    const targetBlock = document.querySelector(".contacts");
    targetBlock.scrollIntoView({ behavior: "smooth" });
  });
}

function isValidEmail(email) {
  const atSymbolCount = email.split("@").length - 1;
  if (atSymbolCount !== 1) {
    return false;
  }
  const atSymbolIndex = email.indexOf("@");
  const localPart = email.slice(0, atSymbolIndex);
  const domainPart = email.slice(atSymbolIndex + 1);

  if (!localPart || !domainPart) {
    return false;
  }

  const dotIndex = domainPart.indexOf(".");
  if (dotIndex === -1 || dotIndex === 0 || dotIndex === domainPart.length - 1) {
    return false;
  }

  const invalidChars = [
    " ",
    ",",
    "!",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "=",
    "+",
    "{",
    "}",
    "[",
    "]",
    ";",
    ":",
    "'",
    '"',
    "<",
    ">",
    "/",
    "\\",
    "|",
    "`",
    "~",
  ];
  for (let char of email) {
    if (invalidChars.includes(char)) {
      return false;
    }
  }

  return true;
}

function checkFormValidity(form) {
  const inputs = form.querySelectorAll(".contacts__form-input");
  const formButton = form.querySelector(".contacts__btn");

  let allFilled = true;
  let emailValid = true;

  inputs.forEach((input) => {
    const value = input.value.trim();

    if (value === "") {
      allFilled = false;
    }

    if (input.classList.contains("mail")) {
      emailValid = isValidEmail(value);
    }
  });

  if (allFilled && emailValid) {
    formButton.removeAttribute("disabled");
  } else {
    formButton.setAttribute("disabled", true);
  }
}

const forms = document.querySelectorAll(".contacts__form");

forms.forEach((form) => {
  const inputs = form.querySelectorAll(".contacts__form-input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => checkFormValidity(form));
  });
});

const submitButtons = document.querySelectorAll(".contacts__btn");
submitButtons.forEach((submitButton) => {
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.remove("popup--active");
    document.body.classList.remove("--no-scroll");
    animOnScroll();
  });
});

const popupButton = document.querySelector(".login__img");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");

window.addEventListener("load", function () {
  popup.classList.add("popup--active");
  document.body.classList.add("--no-scroll");
});
popupButton.addEventListener("click", function () {
  popup.classList.add("popup--active");
  document.body.classList.add("--no-scroll");
});

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup--active");
  document.body.classList.remove("--no-scroll");
  animOnScroll();
});

popup.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.classList.remove("popup--active");
    document.body.classList.remove("--no-scroll");
    animOnScroll();
  }
});

const btn = document.querySelector(".menu__btn");
const list = document.querySelector(".menu__list");
const tel = document.querySelector(".phone");
const login = document.querySelector(".login");

btn.addEventListener("click", () => {
  btn.classList.toggle("--active");
  list.classList.toggle("--active");
});

document.addEventListener("click", (event) => {
  if (
    !btn.contains(event.target) &&
    !list.contains(event.target) &&
    !tel.contains(event.target) &&
    !login.contains(event.target)
  ) {
    btn.classList.remove("--active");
    list.classList.remove("--active");
  }
});

btn.addEventListener("click", (event) => {
  event.stopPropagation();
});

list.addEventListener("click", (event) => {
  event.stopPropagation();
});
