const burgerMenu = () => {
  const navbar = document.querySelector('.btn-burger');
  const navWrapper = document.querySelector('.nav-wrapper');
  const navItems = document.querySelectorAll('.nav-wrapper__item');
  const overlay = document.querySelector('.overlay');

  navbar.addEventListener('click', () => {

    if (navbar.classList.contains('btn-burger--active')) {
      resetNav();
    } else {
      overlay.classList.add('show');
      navbar.classList.add('btn-burger--active');
      navWrapper.classList.add('nav-wrapper--active');

      navItems.forEach((item) => {
        item.addEventListener('click', resetNav);
      });
      hideScroll();
    }
  });

  const hideScroll = () => {
    const scrollWidth = `${getScrollbarWidth()}px`;
    document.body.style.paddingRight = scrollWidth;
    document.body.style.overflow = 'hidden';
  };

  const showScroll = () => {
    document.body.style.paddingRight = '';
    document.body.style.overflow = 'visible';
  };

  const resetNav = () => {
    overlay.classList.remove('show');
    navbar.classList.remove('btn-burger--active');
    navWrapper.classList.remove('nav-wrapper--active');
    showScroll();
  };

  document.addEventListener("click", (e) => {
    const target = e.target;
    const its_menu = target == navWrapper || navWrapper.contains(target);
    const its_btnMenu = target == navbar;
    const menu_is_active = navbar.classList.contains('btn-burger--active');
    if (!its_menu && !its_btnMenu && menu_is_active) {
      resetNav();
    }
  });

  window.addEventListener('resize', resetNav);

  // Get scrollbar width
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
}

export default burgerMenu;