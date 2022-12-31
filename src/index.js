import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
// const errorRequest =
//   'https://global.discourse-cdn.com/brave/original/3X/b/2/b25ce7b5ef1396e782cee4f7bbffaefd7f9d3b49.jpeg';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));

function onInputName(evt) {
  //   console.dir(evt.target.value)
  //   const { value: name } = evt.target;
  const name = evt.target.value.trim();
  if (!name) {
    refs.list.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(data => {
      console.dir(data);
      if (data.length > 20) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 1) {
        console.log('длинна', data.length);
        createMarkupCountrie(data);
      } else {
        console.log('длинна', data.length);
        createMarkupCountries(data);
      }
    })
    .catch(createErrorMessage);
}

function createMarkupCountrie(data) {
  const {
    flags: { svg },
    name,
  } = data[0];
  const markup = `<img src="${svg}" alt="${name}" width="30">
    <span>${name}</span>`;
  refs.list.innerHTML = '';
  refs.info.innerHTML = markup;
}

function createMarkupCountries(data) {
  const markup = data.map(
    ({ flags: { svg }, name }) => `<li>
    <img src="${svg}" alt="${name}" width="30">
    <span>${name}</span>    
    </li>`
  );
  refs.info.innerHTML = '';
  refs.list.innerHTML = markup.join('');
}

function createErrorMessage(err) {
  refs.list.innerHTML = '';
  Notify.failure(`Oops, there is no country with that name`);
}
