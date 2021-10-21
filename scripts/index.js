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
      link: 'https://images.unsplash.com/photo-1568028476727-0c86534220fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1931&q=80'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1769&q=80'
    }
  ]; 
const elementList = document.querySelector('.elements');
const templateElement = document.querySelector('.template').content;
const figure = document.querySelector('.figure');
const figureContent = figure.querySelector('.figure__content');
const figureImage = figureContent.querySelector('.figure__image');
const figureCaption = figureContent.querySelector('.figure__caption');
const figureClose = figureContent.querySelector('.figure__close');

initialCards.forEach(appendCard);

function closeFigure(event) {
    if (event.target.classList.contains('figure') || event.target.classList.contains('figure__close')) {
        figure.classList.remove('figure_opened');
    }
}

function createCard(item) {
    const element = templateElement.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    image.style.backgroundImage = `url('${item.link}')`;
    element.querySelector('.element__title').innerText = item.name;

    element.querySelector('.element__button').addEventListener('click', function(event) {
        element.remove();
    })

    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', function(event) {
        likeButton.classList.toggle('element__like_active');
    })

    image.addEventListener('click', (event) => {
        if (event.target.classList.contains('element__image')) {
            figure.classList.add('figure_opened');
        }
        figureImage.setAttribute('src', item.link);
        figureCaption.textContent = item.name;
        figure.addEventListener('click', closeFigure);
        figureClose.addEventListener('click', closeFigure);
    })

    return element;
}

function appendCard(item) {
    const element = createCard(item);
    elementList.prepend(element);
}

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

addForm.addEventListener('submit', addCard)

function addCard(event) {
    event.preventDefault();

    const place = placeField.value;
    const link = linkField.value;
    const item = {
        name: place,
        link: link
    }
    appendCard(item);
    event.target.reset();

    closeAddPopup();
}

function openEditPopup() {
    nameField.setAttribute('value', profileName.textContent);
    postField.setAttribute('value', profilePost.textContent);

    editPopup.classList.add('edit-popup_opened');
}

function closeEditPopup() {
    editPopup.classList.remove('edit-popup_opened');
}

function openAddPopup() {
    addPopup.classList.add('add-popup_opened');
}

function closeAddPopup() {
    addPopup.classList.remove('add-popup_opened');
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
        closeEditPopup();
    } else if (event.target.classList.contains('add-popup')) {
        closeAddPopup();
    }
}

editPopup.addEventListener('mouseup', popupClickHandler);
addPopup.addEventListener('mouseup', popupClickHandler);