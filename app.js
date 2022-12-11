const form = document.querySelector(".form");
const input = document.querySelector(".input--coords");
const buttonSubmit = document.querySelector(".btn-submit");
const textLocation = document.querySelector(".location--text");
const countriesContainer = document.querySelector(".countries");

let lat;
let long;

input.addEventListener("input", (e) => {
  const langLoc = e.target.value;
  lat = langLoc.split(",")[0];
  long = langLoc.split(",")[1];
});

async function fetchApi(lat, long) {
  const fetchData = await fetch(
    `https://geocode.xyz/${lat},${long}?json=1&auth=267396929018598295230x59455`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const data = await fetchData.json();
  changeText(data);
}

async function fetchCountry(country) {
  const fetchData = await fetch(
    `https://restcountries.com/v3/name/${country}?fullText=true`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const [data] = await fetchData.json();
  console.log(data);
  generateUI(data);
}

function changeText(data) {
  textLocation.innerHTML = `you reside in ${data.city}, ${data.country}`;
  fetchCountry(data.country);
}

function generateUI(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
  <article class="country">
  <img class="country__img" src=${data.flags[1]} />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.continents[0]}</h4>
    <p class="country__row"><span>👫</span>${(data.population / 100000).toFixed(
      1
    )} bln people</p>
    <p class="country__row"><span>🏙️</span>${data.capital}</p>
  </div>
</article>
   `;
  countriesContainer.appendChild(card);
}
form.addEventListener("submit", (e) => {
  input.value = "";
  e.preventDefault();
  console.log(lat, long);
  fetchApi(lat, long);
});
