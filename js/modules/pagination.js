import { generateRandomNum } from '../utils/generateRandomNum.js';

function pagination(data) {
  const navigationList = document.querySelector(".navigation");
  const allButtons = navigationList.querySelectorAll('.btn');
  const currentPage = document.querySelector('.current-page');

  let page = 1;
  let cardsOnPage = 8;
  let totalPages = 6;

  if (window.innerWidth >= 1280) {
    cardsOnPage = 8;
    totalPages = 6;
  } else if (window.innerWidth < 1280 && window.innerWidth >= 660) {
    cardsOnPage = 6;
    totalPages = 8;
  } else if (window.innerWidth < 660) {
    cardsOnPage = 3;
    totalPages = 16;
  }

  const fullData = genrateCardsData(cardsOnPage);

  navigationList.addEventListener("click", (e) => {
    if (e.target && e.target.getAttribute('data-nav')) {
      const currentBtn = e.target.getAttribute('data-nav');
      switch (currentBtn) {
        case 'start':
          page = 1;
          break;
        case 'prev':
          page--;
          break;
        case 'next':
          page++;
          break;
        case 'end':
          page = totalPages
          break;
      }
    }
    renderCards(cardsOnPage, fullData, page);
    updateNavigationButtons();
  });

  function updateNavigationButtons() {
    if (page > 1 && page < totalPages) {
      allButtons.forEach(btn => {
        btn.removeAttribute("disabled");
        btn.classList.remove("btn-pagination--disabled");
      });
    } else {
      allButtons.forEach(btn => {
        btn.setAttribute("disabled", true);
        btn.classList.add('btn-pagination--disabled');
        if (page === 1) {
          turnOnTheButton(".btn-next")
          turnOnTheButton(".btn-end")
        } else if (page === totalPages) {
          turnOnTheButton(".btn-start")
          turnOnTheButton(".btn-prev")
        } else if (page > 1 && page < totalPages) {

        }
      });
    }
    currentPage.textContent = page;
    currentPage.classList.remove('btn-pagination--disabled');
  }

  function turnOnTheButton(btnSelector) {
    const btn = document.querySelector(btnSelector);
    btn.removeAttribute("disabled");
    btn.classList.remove("btn-pagination--disabled");
  }

  renderCards(cardsOnPage, fullData, page);
  updateNavigationButtons();

  function genrateCardsData(quantity) {
    const arrCards = [];

    while (arrCards.length < 48) {
      let arrQuant = [];

      while (arrQuant.length < quantity) {
        let num = generateRandomNum();
        if (!arrQuant.includes(num)) {
          arrQuant.push(num);
        }
      }
      arrCards.push(...arrQuant);
    }
    return arrCards.map((item) => data[item - 1]);
  };
};


function renderCards(cardsOnPage, fullData, page) {
  const paginationContent = document.querySelector(".pagination__content");

  const start = cardsOnPage * (page - 1);
  const end = start + cardsOnPage;

  const data = fullData.slice(start, end);
  let cards = "";

  data.forEach((item) => {
    cards += `<div class="card" id=${item.id}>
                    <img class="card__image" width="270" height="270" src=${item.img}
                    alt="Katrine">
                    <div class="card__title">${item.name}</div>
                    <button class="btn btn__secondary">Learn more</button>
                 </div>`
  });
  paginationContent.innerHTML = cards;
};

export default pagination;