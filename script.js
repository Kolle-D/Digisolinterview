const container = document.getElementById("countries-container");

const API_URL = "https://www.apicountries.com/countries";
const CORS_PROXY = "https://corsproxy.io/?";

fetch(CORS_PROXY + encodeURIComponent(API_URL))
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((countries) => {
    countries.forEach((country) => {
      const card = document.createElement("div");
      card.className = "card";

      const name = country.name?.common || "N/A";
      const flag = country.flags?.png || "";
      const capital = country.capital?.[0] || "N/A";
      const population = country.population
        ? country.population.toLocaleString()
        : "N/A";
    //   const languages = country.languages
    //     ? Object.values(country.languages).join(", ")
    //     : "N/A";

    let languages = "N/A";
    if (country.languages) {
      if (Array.isArray(country.languages)) {
        languages = country.languages
          .map((lang) => lang.name || Object.values(lang).join(", "))
          .join(", ");
      } else {
        languages = Object.entries(country.languages)
          .map(([key, value]) => {
            if (typeof value === "string") return value;
            if (typeof value === "object")
              return value.name || Object.values(value).join(", ");
            return "";
          })
          .join(", ");
      }
    }

    // const languages = country.languages
    //   ? Object.entries(country.languages)
    //       .map(([code, name]) => name)
    //       .join(", ")
    //   : "N/A";

      const currencies = country.currencies
        ? Object.values(country.currencies)
            .map((c) => c.name)
            .join(", ")
        : "N/A";
      const latlng = country.latlng ? country.latlng.join(", ") : "N/A";
      const timezone = country.timezones?.[0] || "N/A";

      card.innerHTML = `
        <img src="${flag}" alt="${name} flag">
        <h3>${country.name || "N/A"}</h3>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Currency:</strong> ${currencies}</p>
        <p><strong>Lat / Lng:</strong> ${latlng}</p>
        <p><strong>Timezone:</strong> ${timezone}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    container.innerHTML = "<p>Failed to load country data.</p>";
  });

  const searchInput = document.getElementById("search");

  let countriesData = [];

  fetch("https://www.apicountries.com/countries")
    .then((res) => res.json())
    .then((data) => {
      countriesData = data;
      displayCountries(data);
    });

  function displayCountries(data) {
    container.innerHTML = "";
    data.forEach((country) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
      <img src="${country.flags?.png}">
      <h3>${country.name.common}</h3>
      <p>Population: ${country.population.toLocaleString()}</p>
    `;

      container.appendChild(card);
    });
  }

 searchInput.addEventListener("change", (e) => {
   const value = e.target.value.trim().toLowerCase();

   if (!value) {
     displayCountries(countriesData);
     return;
   }

   const filtered = countriesData.filter((country) =>{
        // return country.name?.common.toLowerCase() != value
        console.log(country)
    }
   );

   displayCountries(filtered);
 });
