window.onload = function () {
    var pack = document.getElementById("pokemon-pack");
    pack.addEventListener("click", openPack);
}

var pokemonData = []; // Initialize the variable to store data

function fetchAPIdata() {
    // You should replace this URL with your actual API endpoint to fetch image data.
    const apiUrl = 'https://jarvproject.stu.nighthawkcodingsociety.com/api/pokemons/';

    // Make an HTTP GET request to the API
    return fetch(apiUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            pokemonData = data; // Store the data as it is
            console.log(pokemonData[0].image);
            // Call moveTarget immediately to position the dot at the first location
        })
        .catch(error => {
            console.error("Error fetching images:", error);
        });
}

function fetchRandomName() {
    // You should replace this URL with your actual API endpoint to fetch image data.
    const apiUrl = 'https://jarvproject.stu.nighthawkcodingsociety.com/api/pokemons/random';

    // Make an HTTP GET request to the API
    return fetch(apiUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            return data; // Return the entire randomPokemonData
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function openPack() {
    var pack = document.getElementById("pokemon-pack");
    pack.style.display = "none";

    // Create an array to store promises for fetch requests
    var fetchPromises = [];

    for (let i = 0; i < 11; i++) {
        fetchPromises.push(fetchRandomName());
    }

    // Use Promise.all to wait for all fetch requests to complete
    Promise.all(fetchPromises)
        .then(randomPokemonDataArray => {
            var openedDiv = document.getElementById("pokemon-cards-opened");

            // Create and display cards
            randomPokemonDataArray.forEach(randomPokemonData => {
                var container = document.createElement("div");
                container.className = "container";

                var card = document.createElement("div");
                card.className = "card";

                var front = document.createElement("div");
                front.className = "front";

                var back = document.createElement("div");
                back.className = "back";

                var h1 = document.createElement("h1");
                h1.textContent = randomPokemonData.pokemon; // Set h1.textContent to randomPokemonData.info

                var p = document.createElement("p");
                p.textContent = randomPokemonData.info;

                back.appendChild(h1);
                back.appendChild(p);
                card.appendChild(front);
                card.appendChild(back);
                container.appendChild(card);

                openedDiv.appendChild(container);
            });
        })
        .catch(error => {
            console.error("Error fetching random Pokemons:", error);
        });
}
