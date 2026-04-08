// js/app.js

import { loadComponent } from './component.js';
import { initMenu } from './menu.js';
import { initScrollAnimation } from './ui.js';

document.addEventListener('DOMContentLoaded', ()=>{

  loadComponent('components/header.html','header', initMenu);
  loadComponent('components/floating-cta.html','floating-cta');

  initScrollAnimation();
});