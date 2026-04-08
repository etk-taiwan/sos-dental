// js/component.js

import { getBase } from './config.js';

export function loadComponent(path, targetId, callback){
  const BASE = getBase();

  fetch(BASE + '/' + path)
    .then(res => res.text())
    .then(html => {
      const el = document.getElementById(targetId);
      if(el) el.innerHTML = html;
      if(callback) callback();
    });
}