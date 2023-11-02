window.onload = function () {
    var pack = document.getElementById("pokemon-pack");
    pack.addEventListener("click", openPack);
}

var pokemonData = []; // Initialize the variable to store data

function fetchAPIdata() {
    // You should replace this URL with your actual API endpoint to fetch image data.
    const apiUrl = 'http://127.0.0.1:8086/api/pokemons';

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
    const apiUrl = 'http://127.0.0.1:8086/api/pokemons/random';

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

async function openPack() {
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
            randomPokemonDataArray.forEach(async (randomPokemonData, index) => {
                var container = document.createElement("div");
                container.className = "container";

                var card = document.createElement("div");
                card.className = "card";

                var front = document.createElement("div");
                front.className = "front";

                var back = document.createElement("div");
                back.className = "back";

                var h1 = document.createElement("h1");
                const name = randomPokemonData.pokemon; // Get the Pokémon name

                // Fetch detailed information from PokeAPI
                const pokemonInfo = await getPokemonInfo(name);
                const imageUrl = await getPokemonImage(name);

                h1.textContent = name;
                var p = document.createElement("p");
                p.textContent = pokemonInfo; // Set p.textContent to the Pokémon info
                p.className = "center-text";

                var image = document.createElement("img");
                image.src = imageUrl; // Set the image source
                image.style.width = "250px"; // Set the width to make the image bigger
                image.style.height = "250px"; // Set the height to make the image bigger


                back.appendChild(image);
                back.appendChild(h1);
                back.appendChild(p);
                card.appendChild(front);
                card.appendChild(back);
                container.appendChild(card);

                openedDiv.appendChild(container);
            });
        })
        .catch(error => {
            console.error("Error fetching random Pokémon:", error);
        });
}

// Function to fetch detailed Pokémon information from PokeAPI
async function getPokemonInfo(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = await response.json();
    if (response.status === 200) {
        const types = data.types.map(type => type.type.name).join(", ");
        const abilities = data.abilities.map(ability => ability.ability.name).join(", ");
        return `Type(s): ${types}\nAbilities: ${abilities}`;
    } else {
        return "Pokémon info not found!";
    }
}

// Function to fetch Pokémon image from PokeAPI
async function getPokemonImage(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = await response.json();
    if (response.status === 200) {
        return data.sprites.front_default;
    } else {
        return "Image not found!";
    }
}
