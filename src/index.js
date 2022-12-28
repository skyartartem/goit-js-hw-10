import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const errorRequest =
  'https://global.discourse-cdn.com/brave/original/3X/b/2/b25ce7b5ef1396e782cee4f7bbffaefd7f9d3b49.jpeg';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));

function onInputName(evt){
    // console.dir(evt.target.value)
    const { value: name } = evt.target;

    fetchCountries(name)
      .then(data => createMarkup(data))
      .catch(err => createErrorMessage(err, errorRequest));
}

function createMarkup(data) {
    console.dir(data);
    const markup = data.map(
    ({ flags: { png }, name }) => `<li>
    <img src="${png}" alt="${name}" width="30">
    <span>${name}</span>    
    </li>`
  );

  refs.list.innerHTML = markup.join('');
}

function createErrorMessage(err, img) {
  const markup = `<li>
    <h2>${err}</h2>
    <img src="${img}" alt="${err}" width="300">
</li>`;

  refs.list.innerHTML = markup;
}