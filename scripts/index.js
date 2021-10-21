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

initialCards.forEach(appendCard);

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const editPopupContent = editPopup.querySelector('.popup__content_type_edit');
const addPopupContent = addPopup.querySelector('.popup__content_type_add');
const editForm = editPopup.querySelector('.popup__form_type_edit');
const addForm = addPopup.querySelector('.popup__form_type_add');
const nameField = editForm.querySelector('.popup__input_type_name');
const postField = editForm.querySelector('.popup__input_type_post');
const placeField = addForm.querySelector('.popup__input_type_place');
const linkField = addForm.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profilePost = document.querySelector('.profile__post');
const placeName = document.querySelector('.element__title');
const imageLink = document.querySelector('.element__image');

function openEditPopup() {
    nameField.setAttribute('value', profileName.textContent);
    postField.setAttribute('value', profilePost.textContent);

    editPopup.classList.add('popup_opened');
}

function closeEditPopup() {
    editPopup.classList.remove('popup_opened');
}

function openAddPopup() {
    addPopup.classList.add('popup_opened');
}

function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
}


editButton.addEventListener('click', openEditPopup);

addButton.addEventListener('click', openAddPopup);

function submitEditForm(event) {
    event.preventDefault()

    profileName.textContent = nameField.value;
    profilePost.textContent = postField.value;

    closeEditPopup();
}

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

editForm.addEventListener('submit', submitEditForm);

addForm.addEventListener('submit', addCard);

function popupClickHandler(event) {
    if (event.target.classList.contains('popup_type_edit') || event.target.classList.contains('popup__close_type_edit')) {
        closeEditPopup();
    } else if (event.target.classList.contains('popup_type_add') || event.target.classList.contains('popup__close_type_add')) {
        closeAddPopup();
    }
}

editPopup.addEventListener('mouseup', popupClickHandler);
addPopup.addEventListener('mouseup', popupClickHandler);