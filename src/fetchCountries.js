export function fetchCountries(name) {
    // if (!name.target.valu) {
    //   return  
    // }
    
    const BASE_URL = 'https://restcountries.com/v2/name';
    // console.log(name.target.value);
    return fetch(`${BASE_URL}/${name}`).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      return resp.json();
    });
}