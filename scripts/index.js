const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const editPopupContent = editPopup.querySelector('.edit-popup__content');
const addPopupContent = addPopup.querySelector('.add-popup__content');
const editPopupCloseButton = editPopupContent.querySelector('.edit-popup__close');
const addPopupCloseButton = addPopupContent.querySelector('.add-popup__close');
const editForm = editPopupContent.querySelector('.edit-popup__form');
const addForm = addPopupContent.querySelector('.add-popup__form');
const nameField = editForm.querySelector('.edit-popup__input_type_name');
const postField = editForm.querySelector('.edit-popup__input_type_post');
const placeField = addForm.querySelector('.add-popup__input_type_name');
const linkField = addForm.querySelector('.add-popup__input_type_post');
const profileName = document.querySelector('.profile__name');
const profilePost = document.querySelector('.profile__post');
const placeName = document.querySelector('.element__title');
const imageLink = document.querySelector('.element__image');


function openEditPopup() {
    nameField.setAttribute('value', profileName.textContent);
    postField.setAttribute('value', profilePost.textContent);

    editPopup.classList.add('edit-popup_isOpen');
}

function closeEditPopup() {
    editPopup.classList.remove('edit-popup_isOpen');
}

function openAddPopup() {
    addPopup.classList.add('add-popup_isOpen');
}

function closeAddPopup() {
    addPopup.classList.remove('add-popup_isOpen');
}

editButton.addEventListener('click', openEditPopup);

editPopupCloseButton.addEventListener('click', closeEditPopup);

addButton.addEventListener('click', openAddPopup);

addPopupCloseButton.addEventListener('click', closeAddPopup)

function submitEditForm(event) {
    event.preventDefault()

    profileName.textContent = nameField.value;
    profilePost.textContent = postField.value;

    closeEditPopup();
}

editForm.addEventListener('submit', submitEditForm);

function popupClickHandler(event) {
    if (event.target.classList.contains('edit-popup')) {
        closeEditPopup()
    } else if (event.target.classList.contains('add-popup')) {
        closeAddPopup()
    }
}

editPopup.addEventListener('mouseup', popupClickHandler);
addPopup.addEventListener('mouseup', popupClickHandler);