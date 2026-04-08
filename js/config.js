// js/config.js

export function getBase(){
  const { hostname, pathname } = location;

  if(hostname.includes('github.io')){
    return '/' + pathname.split('/')[1];
  }
  return '';
}