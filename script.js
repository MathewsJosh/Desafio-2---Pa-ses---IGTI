/**
 * Estado da aplicação (state)
 */
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener("load", () => {
  tabCountries = document.querySelector("#tabCountries");
  tabFavorites = document.querySelector("#tabFavorites");
  countCountries = document.querySelector("#countCountries");
  countFavorites = document.querySelector("#countFavorites");
  totalPopulationList = document.querySelector("#totalPopulationList");
  totalPopulationFavorites = document.querySelector(
    "#totalPopulationFavorites"
  );
  numberFormat = Intl.NumberFormat("pt-BR");

  fetchCountries();
});

//Método fetch comum
/* function fetchCountries() {
    fetch("http://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(json => {
            (allCountries = json);
            console.log(allCountries);
        });
} */

//Método Async/await
async function fetchCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const json = await res.json();

  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    //usado para reduzir a repetição de "country logo abaixo nas atribuições"
    return {
      id: numericCode,
      name: translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    };
    /* id:country.numericCode,
            name: country.translations.pt,
            population:country.population,
            flag: country.flag */
    //flag:flag = Quando repete, você pode eliminar um
    //allCountries = json;
  });

  render();
}

//
function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
}

function renderCountryList() {
  let countriesHTML = "<div>";

  allCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;
    //Tag a cria um botao quando vc está usando o materialize css, ler documentação!
    const countryHTML = `
        <div class="country">
            <div>
                <a id="${id}" class="waves-effect waves-light btn">+</a>
            </div>
            <div>
                <img src="${flag}" alt="${name}"/>
            </div>
            <div>
                <ul>
                    <li>${name}</li>
                    <li>${population}</li>
                </ul>
            </div>
        </div>`; //Template Literals (sinal de crase)
    countriesHTML += countryHTML;
  });
  countriesHTML += "</div>";
  tabCountries.innerHTML = countriesHTML;
  //console.log(countriesHTML);
}

function renderFavorites() {
  let favoritesHTML = "<div>";

  favoriteCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;
    const favoriteCountryHTML = `
        <div class="country">
            <div>
                <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
            </div>
            <div>
                <img src="${flag}" alt="${name}"/>
            </div>
            <div>
                <ul>
                    <li>${name}</li>
                    <li>${population}</li>
                </ul>
            </div>
        </div>`; //Template Literals (sinal de crase)
    favoritesHTML += favoriteCountryHTML;
  });

  favoritesHTML += "</div>";
  tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = totalPopulation;
  totalPopulationFavorites.textContent = totalFavorites;
}

function formatNumber(number) {
  return numberFormat.format(number);
}
