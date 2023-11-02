---
title: Search
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Search</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        #search-input {
            padding: 10px;
        }
        #pokemon-info {
            display: none;
        }
    </style>
</head>
<body>
    <h1>Pokémon Search</h1>
    <input type="text" id="search-input" placeholder="Enter a Pokémon or ID">
    <button onclick="searchPokemon()">Search</button>
    <div id="pokemon-info">
        <h2 id="pokemon-name"></h2>
        <img id="pokemon-image" width="200" height="200">
        <p id="pokemon-types"></p>
        <p id="pokemon-abilities"></p>
    </div>
    <script>
        async function searchPokemon() {
            const searchInput = document.getElementById("search-input").value;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`);
            const data = await response.json();
            if (response.status === 200) {
                const name = data.name;
                const image = data.sprites.front_default;
                const types = data.types.map(type => type.type.name).join(", ");
                const abilities = data.abilities.map(ability => ability.ability.name).join(", ");
                document.getElementById("pokemon-name").textContent = name;
                document.getElementById("pokemon-image").src = image;
                document.getElementById("pokemon-types").textContent = `Type(s): ${types}`;
                document.getElementById("pokemon-abilities").textContent = `Abilities: ${abilities}`;
                document.getElementById("pokemon-info").style.display = "block";
            } else {
                alert("Pokemon not found!");
            }
        }
    </script>
</body>
</html>
