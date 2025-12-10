const modal = (data, triggerSelector, modalSelector) => {
  const trigger = document.querySelector(triggerSelector);
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');

  trigger.addEventListener('click', (e) => {
    const card = e.target.closest(modalSelector)
    if (card) {
      const id = card.getAttribute('id')
      openModal(id);
      modalClose();
    }
  });

  function openModal(id) {
    const btn = document.createElement("button");
    btn.classList.add("modal__btn-close");

    const content = document.createElement("div");
    content.classList.add("modal__content");

    const item = data
      .filter((item) => item.id === +id)
      .map((item) => {
        return `
      <img class="modal__img" src="${item.img}" />
      <div class="modal__info">
        <h2 class="modal__title">${item.name}</h2>
        <p class="modal__subtitle">${item.type} - ${item.breed}</p>
        <p class="modal__description">${item.description}</p>
        <ul class="modal__list">
          <li class="modal__list-item">
            <span class="modal__list-item-text"><b>Age: </b>${item.age}
            </span>
          </li>
          <li class="modal__list-item">
            <span class="modal__list-item-text"><b>Inoculations: </b>${item.inoculations.join(
          ", "
        )}
            </span>
          </li>
          <li class="modal__list-item">
            <span class="modal__list-item-text"><b>Diseases: </b>${item.diseases.join(
          ", "
        )}
            </span>
          </li>
          <li class="modal__list-item">
            <span class="modal__list-item-text"><b>Parasites: </b>${item.parasites.join(
          ", "
        )}
            </span>
          </li>
        </ul>
      </div>
      `;
      });

    btn.innerHTML = '&#10006;'
    content.innerHTML = item[0];
    modal.append(btn);
    modal.append(content);
    overlay.classList.add('show');
    modal.classList.add('show');
    hideScroll();
  }

  function modalClose() {
    const btnClose = document.querySelector(".modal__btn-close");
    const modalContent = document.querySelector('.modal__content');


    btnClose.addEventListener("click", () => {
      overlay.classList.remove('show');
      modal.classList.remove('show');
      modalContent.remove();
      btnClose.remove();
      showScroll();
    });

    overlay.addEventListener("click", (e) => {
      if (e.target.classList.contains("overlay")) {
        overlay.classList.remove('show');
        modal.classList.remove('show');
        modalContent.remove();
        btnClose.remove();
        showScroll();
      }
    });
  }

  const hideScroll = () => {
    const scrollWidth = `${getScrollbarWidth()}px`;
    document.body.style.paddingRight = scrollWidth;
    document.body.style.overflow = 'hidden';
  };

  const showScroll = () => {
    document.body.style.paddingRight = '';
    document.body.style.overflow = 'visible';
  };

  const getScrollbarWidth = () => {
    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    outer.style.width = '50px';
    outer.style.height = '50px';
    outer.style.overflow = 'scroll';
    outer.style.visibility = 'hidden';

    document.body.appendChild(outer);
    const scrollbarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);

    return scrollbarWidth;
  };
};

export default modal;
