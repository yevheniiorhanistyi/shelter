import data from '../data/pets.json' with { type: "json" };
import burgerMenu from './modules/burgerMenu.js';
import slider from './modules/slider.js';
import modal from './modules/modal.js';

window.addEventListener('DOMContentLoaded', () => {
  burgerMenu();
  modal(data, '.slider-item__main', '.card');
  slider(data);
});