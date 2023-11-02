---
title: Search
---
<html>
<head>
    <title>Pokemon Info</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f2f2f2;
        }
        #container {
            background-color: #111;
            padding: 100px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(256, 256, 256, 0.2);
            max-width: 400px;
            margin: 0 auto;
        }
        h1 {
            color: #e6494b;
        }
        label {
            display: block;
            margin-top: 10px;
        }
        input {
            width: 100%;
            padding: 7px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            background-color: #e6494b;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #d13234;
        }
        #result {
            text-align: left;
            margin-top: 20px;
        }
        img {
            display: block;
            margin: 0 auto;
            max-width: 300%;
            height: 200px;
        }
    </style>
</head>
<body>
    <div id="container">
        <h1>Pokemon Information</h1>
        <label for="pokemonName">Enter a Pokemon Name or ID:</label>
        <input type="text" id="pokemonName" list="pokemonList">
        <datalist id="pokemonList"></datalist>
        <button onclick="getPokemonInfo()">Get Info</button>
        <div id="result">
            <img id="pokemonImage" src="">
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        // Function to populate the datalist with Pokemon names
        function populatePokemonList() {
            const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
            $.get(apiUrl, function(data) {
                const pokemonList = document.getElementById('pokemonList');
                data.results.forEach(pokemon => {
                    const option = document.createElement('option');
                    option.value = pokemon.name;
                    pokemonList.appendChild(option);
                });
            });
        }
        // Call the function to populate the datalist on page load
        populatePokemonList();
        function getPokemonInfo() {
            const pokemonName = document.getElementById('pokemonName').value;
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
            $.get(apiUrl, function(data) {
                const name = data.name;
                const id = data.id;
                const types = data.types.map(type => type.type.name).join(', ');
                const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
                const imageURL = data.sprites.front_default;
                const result = `
                    <img id="pokemonImage" src="${imageURL}" alt="Pokemon Image">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Types:</strong> ${types}</p>
                    <p><strong>Abilities:</strong> ${abilities}</p>
                `;
                document.getElementById('result').innerHTML = result;
            });
        }
    </script>
</body>
</html>
