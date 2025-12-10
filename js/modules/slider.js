import { generateRandomNum, arraysHaveSimilar } from '../utils/index.js';

const slider = (data) => {
  const slider = document.querySelector('.slider');
  const mainItem = document.querySelector('.slider-item__main');
  const leftItem = document.querySelector('.slider-item__left');
  const rightItem = document.querySelector('.slider-item__right');
  const btnPrev = document.querySelector('.btn-slider--prev');
  const btnNext = document.querySelector('.btn-slider--next');

  const createCard = (item, contentSelector) => {
    let card = document.createElement('div');
    card.setAttribute('id', item.id);
    card.classList.add('card');

    let img = document.createElement('img');
    img.classList.add('card__image');
    img.setAttribute('src', item.img);
    img.setAttribute('alt', item.name);
    card.append(img);

    let name = document.createElement('div');
    name.classList.add('card__title');
    name.textContent = item.name;
    card.append(name);

    let button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn__secondary');
    button.textContent = 'Learn more';
    card.append(button);

    contentSelector.append(card);
  };

  let count = 3;
  let current = [];
  let leftSlideItem = [];
  let rightSlideItem = [];

  const initCarousel = () => {
    while (current.length < count) {
      let number = generateRandomNum();
      if (data[number] && !current.includes(number)) {
        current.push(number);
      }
    }
    current.forEach((el) => {
      createCard(data[el], mainItem);
    });
  }
  initCarousel();

  const createUniqArr = () => {
    const newArr = [...current];

    while (newArr.length < count * 2) {
      let number = generateRandomNum();
      if (data[number] && !newArr.includes(number)) {
        newArr.push(number);
      }
    }
    newArr.splice(0, count);
    return newArr;
  };

  const createLeftSlide = (arr) => {
    const uniqArr = arr ? arr : createUniqArr();
    leftItem.innerHTML = '';
    uniqArr.forEach(el => {
      createCard(data[el], leftItem);
    });
    leftSlideItem = [...uniqArr];
  };

  const createRightSlide = (arr) => {
    const uniqArr = arr ? arr : createUniqArr();
    rightItem.innerHTML = '';
    uniqArr.forEach(el => {
      createCard(data[el], rightItem);
    });
    rightSlideItem = [...uniqArr];
  };

  createLeftSlide();
  createRightSlide();

  const moveLeft = () => {
    if (!arraysHaveSimilar(current, leftSlideItem)) createLeftSlide();
    rightSlideItem = [...current];
    createRightSlide(current);
    current = [...leftSlideItem];
    slider.classList.add('transition-to-left');
    btnPrev.removeEventListener('click', moveLeft);
    btnNext.removeEventListener('click', moveRight);
  };

  const moveRight = () => {
    if (!arraysHaveSimilar(current, rightSlideItem)) createRightSlide();
    leftSlideItem = [...current];
    createLeftSlide(current);
    current = [...rightSlideItem];
    slider.classList.add('transition-to-right');
    btnNext.removeEventListener('click', moveRight);
    btnPrev.removeEventListener('click', moveLeft);
  };

  btnPrev.addEventListener('click', moveLeft);
  btnNext.addEventListener('click', moveRight);

  slider.addEventListener('animationend', (animationEvent) => {
    if (animationEvent.animationName === 'move-to-right') {
      slider.classList.remove('transition-to-right');
      mainItem.innerHTML = rightItem.innerHTML;
    } else if (animationEvent.animationName === 'move-to-left') {
      slider.classList.remove('transition-to-left');
      mainItem.innerHTML = leftItem.innerHTML;
    }

    btnPrev.addEventListener('click', moveLeft);
    btnNext.addEventListener('click', moveRight);
  });
};

export default slider;