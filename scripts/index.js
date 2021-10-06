const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const form = document.querySelector('.popup__form')
const nameField = document.querySelector('.popup__input_type_name');
const postField = document.querySelector('.popup__input_type_post');
const profileName = document.querySelector('.profile__name');
const profilePost = document.querySelector('.profile__post');

function openPopup() {
    popup.classList.add('popup_isOpen');
}

function closePopup() {
    popup.classList.remove('popup_isOpen');
}

editButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

function submitForm(event) {
    event.preventDefault()

    profileName.textContent = nameField.value;
    profilePost.textContent = postField.value;

    closePopup();
}

form.addEventListener('submit', submitForm);

function popupClickHandler(event) {
    if (event.target.classList.contains('popup')) {
        closePopup()
    }
}

popup.addEventListener('mouseup', popupClickHandler)