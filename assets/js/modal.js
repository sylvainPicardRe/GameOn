
// Fonction pour modifier la classe de la barre de navigation
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

let newMessage = "Merci pour votre inscription";

// Sélection des éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close-btn");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelectorAll(".btn-submit");
const validationInscription = document.querySelector(".validationInscription");
let modalBody = document.querySelector(".modal-body");

// Récupération des champs de formulaire
const lastField = document.getElementById("last");
const firstField = document.getElementById("first");
const emailField = document.getElementById("email");
const birthdateField = document.getElementById("birthdate");
const quantityField = document.getElementById("quantity");
const agreeField = document.getElementById("agree");

// Récupération des options de localisations
const location1 = document.getElementById("location1");
const location2 = document.getElementById("location2");
const location3 = document.getElementById("location3");
const location4 = document.getElementById("location4");
const location5 = document.getElementById("location5");
const location6 = document.getElementById("location6");

// Tableau pour stocker les IDs des localisations
let locationIDs = [];
locationIDs.push(location1, location2, location3, location4, location5, location6);

// Création d'un paragraphe de confirmation
confirmationParagraphe = document.createElement("p");
confirmationParagraphe.textContent = "Merci pour votre inscription";

// Création du bouton de fermeture
buttonClose = document.createElement("button");
buttonClose.textContent = "Fermer";
buttonClose.classList.add("btn");
buttonClose.onclick = function(ev){
  closeModal()
};

// Événements pour ouvrir et fermer le modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));


// Fonction pour lancer le modal
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction pour fermer le modal
function closeModal() {
  modalbg.style.display = "none";
  form.style.display = "block";
  validationInscription.style.display = "none";
}

// Événement de soumission du formulaire
form.addEventListener("submit", (event) =>{
  event.preventDefault();
  if(validate()){
    form.style.display = "none";
    validationInscription.style.display = "block";
    form.reset();
  }
});

// Fonction de validation du formulaire
function validate(){
  const emailRegExp = new RegExp("[a-z._-]+@[a-z._-]+");

  // Récupération des valeurs des champs
  const last = lastField.value;
  const first = firstField.value;
  const email = emailField.value;
  const birthdate = birthdateField.value;
  const quantity = quantityField.value;
  const agree = agreeField.checked;

  // Récupération des éléments d'erreur
  const lastError = document.getElementById("last-error");
  const firstError = document.getElementById("first-error");
  const emailError = document.getElementById("email-error");
  const birthdateError = document.getElementById("birthdate-error");
  const quantityError = document.getElementById("quantity-error");
  const localisationError = document.getElementById("localisation-error");
  const agreeError = document.getElementById("agree-error");

  // Réinitialisation des messages d'erreur
  lastError.textContent = "";
  firstError.textContent = "";
  emailError.textContent = "";
  birthdateError.textContent = "";
  quantityError.textContent = "";
  agreeError.textContent = "";

  let isValid = true;

  // Validation du champ Nom
  if (last === "" || last.length < 2){
    lastField.classList.add("error");
    lastError.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    isValid = false;
  } else {
    lastField.classList.remove("error");
  }

  /// Validation du champ Prénom
  if (first === "" || first.length < 2){
    firstError.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    firstField.classList.add("error");
    isValid = false;
  } else {
    firstField.classList.remove("error");
  } 

  // Validation du champ Email
  if (email === "" || !emailRegExp.test(email)){
    emailError.textContent = "Veuillez entrer une adresse email valide";
    emailField.classList.add("error");
    isValid = false;
  } else {
    emailField.classList.remove("error");
  }
  
  // Validation du champ Date de naissance
  if (birthdate === ""){
    birthdateError.textContent = "Vous devez entrer votre date de naissance.";
    birthdateField.classList.add("error");
    isValid = false;
  } else {
    birthdateField.classList.remove("error");
  }

  // Validation du champ Quantité
  if (isNaN(quantity) || quantity === "" || quantity < 0){
    quantityError.textContent = "Veuillez saisir une quantité";
    quantityField.classList.add("error");
    isValid = false;
  } else {
    quantityField.classList.remove("error");
  }

  // Validation de la sélection de localisation
  if(!localisationCheck()){
    localisationError.textContent = "Vous devez sélectionner une ville.";
    isValid = false
  } else {
    localisationError.classList.remove("error");
  }

  // Validation de l'accord sur les termes
  if (!agree){
    agreeError.textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
    isValid = false;
  } else {
    agreeField.classList.remove("error");
  }
  return isValid;
}

// Fonction pour vérifier la sélection de localisation
function localisationCheck(){
  const radios = document.querySelectorAll('input[name="location"]');
  for(let radio of radios){
    if(radio.checked){
      return true;
    }
  }
  return false;
}

