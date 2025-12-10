import data from '../data/pets.json' with { type: "json" };
import burgerMenu from './modules/burgerMenu.js';
import modal from './modules/modal.js';
import pagination from './modules/pagination.js';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', () => { pagination(data) });
  burgerMenu();
  modal(data, '.pagination__content', '.card');
  pagination(data);
});