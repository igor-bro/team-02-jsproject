import { openModalWindEx } from './modal-window-exercise';

const exercisesNotFound = document.querySelector(
  '.favorites-page-items-not-found'
);
const exercisesGallery = document.querySelector(
  '.favorites-page-items-gallery'
);
const mobilePagination = document.querySelector('.favorites-mobile-pagination');

const svgArrowUrl = new URL('/img/sprite.svg#icon-arrow', import.meta.url);
const KEY = 'favorites';
const storageFetch = localStorage.getItem(KEY);
const savedInStorageExercises = JSON.parse(storageFetch);

const limitPerPage = 8;
let currentPage = 1;
let lastIdx = currentPage * limitPerPage;
let firstIdx = lastIdx - limitPerPage;
let markup = '';
let newStorageFetch;
let actualExercisesList;
let paginationButtons;
let totalPages = Math.ceil(savedInStorageExercises.length / limitPerPage);

console.log('totalPages: ', totalPages);
console.log('savedInStorageExercises.length:', savedInStorageExercises.length);

function hideElem(elem) {
  elem.style.display = 'none';
}
function showElem(elem) {
  elem.style.display = 'flex';
}

if (window.innerWidth < 768) {
  showElem(mobilePagination);
}
function renderExerciseCards(arr) {
  exercisesGallery.innerHTML = '';
  const galleryItems = arr.reduce(
    (html, card) =>
      html +
      `<li class="gallery-list-item">
                <div class="workout-box">
                    <div class="workout-header">
                        <div class="workout-header-wrap">
                            <span class="workout-title">WORKOUT</span>
                            <button type="button" class="delete-workout-btn" id="${card._id}">                            
                                <svg class="trash-icon" id="${card._id}" width="16" height="16" aria-label="trash-icon">
                                  <use href="./img/sprite.svg#icon-trash" id="${card._id}"></use>
                                </svg>
                            </button>
                        </div>
                        <div class="start-button-wrap">
                            <button type="button" class="start-button" id=${card._id}>Start
                                <svg class="start-arrow-icon" id=${card._id} width="14" height="14" aria-label="start-arrow">
                                  <use href=${svgArrowUrl}></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="workout-type">
                        <svg class="run-man-icon" width="24" height="24" aria-label="run-man">
                            <use href="./img/sprite.svg#icon-lighticon"></use>
                        </svg>
                        <h3 class="workout-name">${card.name}</h3>
                    </div>
                    <div class="workout-description">
                        <p class="description-item-name">Burned calories:
                            <span class="description-item-value">${card.burnedCalories} / ${card.time} min</span>
                        </p>
                        <p class="description-item-name">Body part:
                            <span class="description-item-value">${card.bodyPart}</span>
                        </p>
                        <p class="description-item-name">Target:
                            <span class="description-item-value">${card.target}</span>
                        </p>
                    </div>
                </div>
            </li>`,
    ''
  );
  exercisesGallery.innerHTML = galleryItems;
}

if (storageFetch === null || savedInStorageExercises.length === 0) {
  hideElem(exercisesGallery);
} else {
  hideElem(exercisesNotFound);
  renderExerciseCards(savedInStorageExercises);
}

exercisesGallery.addEventListener('click', async event => {
  let id;
  const clickedButton = event.target;
  console.log(clickedButton);
  if (clickedButton && clickedButton.closest('.start-button')) {
    id = clickedButton.closest('.start-button').getAttribute('id');
    await openModalWindEx(id);
  }
});

if (window.innerWidth < 768) {
  markup = '';
  mobilePagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1) {
      markup += `
        <li>
          <button class="favorites-pagination-button fav-active-page" type="button" id="${i}">${i}</button>
        </li>`;
    } else {
      markup += `
        <li>
          <button class="favorites-pagination-button" type="button" id="${i}">${i}</button>
        </li>`;
    }
  }
  mobilePagination.innerHTML = markup;

  renderExerciseCards(savedInStorageExercises.slice(firstIdx, lastIdx));

  mobilePagination.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList.value.includes('favorites-pagination-button')) {
      currentPage = event.target.id;
      lastIdx = currentPage * limitPerPage;
      firstIdx = lastIdx - limitPerPage;
      newStorageFetch = localStorage.getItem(KEY);
      actualExercisesList = JSON.parse(newStorageFetch);
      renderExerciseCards(actualExercisesList.slice(firstIdx, lastIdx));

      const clickedButton = event.target.closest(
        '.favorites-pagination-button'
      );
      paginationButtons = document.querySelectorAll(
        '.favorites-pagination-button'
      );
      paginationButtons.forEach(button => {
        if (button.id === clickedButton.id) {
          button.classList.add('fav-active-page');
        } else {
          button.classList.remove('fav-active-page');
        }
      });
      window.scrollBy({
        top: 700,
        behavior: 'smooth',
      });
    }
  });
}

exercisesGallery.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.className === 'delete-workout-btn') {
    newStorageFetch = localStorage.getItem(KEY);
    actualExercisesList = JSON.parse(newStorageFetch);
    const filteredArr = actualExercisesList.filter(
      card => card._id !== event.target.id
    );
    localStorage.setItem(KEY, JSON.stringify(filteredArr));

    if (filteredArr.length === 0) {
      hideElem(exercisesGallery);
      showElem(exercisesNotFound);
      window.scrollBy({
        top: 700,
        behavior: 'smooth',
      });
      if (window.innerWidth < 768) {
        hideElem(mobilePagination);
      }
    } else {
      if (window.innerWidth < 768) {
        totalPages = Math.ceil(filteredArr.length / limitPerPage);
        markup = '';
        for (let i = 1; i <= totalPages; i++) {
          if (i === Number(currentPage)) {
            markup += `
              <li>
                <button class="favorites-pagination-button fav-active-page" type="button" id="${i}">${i}</button>
              </li>`;
          } else {
            markup += `
              <li>
                <button class="favorites-pagination-button" type="button" id="${i}">${i}</button>
              </li>`;
          }
        }
        console.log('currentPage: ', currentPage);
        mobilePagination.innerHTML = markup;
        lastIdx = currentPage * limitPerPage;
        firstIdx = lastIdx - limitPerPage;
        renderExerciseCards(filteredArr.slice(firstIdx, lastIdx));
        window.scrollBy({
          top: 700,
          behavior: 'smooth',
        });
      } else {
        renderExerciseCards(filteredArr);
      }
    }
  }
});

export const renderFavorites = () => {
  savedInStorageExercises = JSON.parse(localStorage.getItem(KEY)) || {};
  if (!savedInStorageExercises || savedInStorageExercises.length === 0) {
    hideElem(exercisesGallery);
  } else {
    hideElem(exercisesNotFound);
    renderExerciseCards(savedInStorageExercises);
  }
  totalPages = Math.ceil(savedInStorageExercises.length / 3);
};

function adjustLengthName(name) {
  const widthScreen = document.documentElement.clientWidth;
  let fontSize = 20;
  let boxWidth = 295;
  let factor = 0.7;
  if (widthScreen > 1439) {
    fontSize = 24;
    boxWidth = 424;
    factor = 0.85;
  } else if (widthScreen > 767) {
    fontSize = 24;
    boxWidth = 313;
    factor = 0.8;
  }

  const maxCharacters = (boxWidth / (fontSize / 2)) * factor;
  if (name.length > maxCharacters) {
    return name.slice(0, maxCharacters) + '...';
  }
  return name;
}
