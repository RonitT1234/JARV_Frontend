window.onload = function() {
    var pack = document.getElementById("pokemon-pack");
    pack.addEventListener("click", openPack);
}

function openPack() {
    var pack = document.getElementById("pokemon-pack");
    pack.style.display = "none";
    
    for (let i = 0; i < 11; i++) {
        // Create a container element
        var container = document.createElement("div");
        container.className = "container";

        // Create a card element
        var card = document.createElement("div");
        card.className = "card";

        // Create a front element
        var front = document.createElement("div");
        front.className = "front";

        // Create a back element
        var back = document.createElement("div");
        back.className = "back";

        // Create content for the back of the card
        var h1 = document.createElement("h1");
        h1.textContent = "Back of Card";

        var p = document.createElement("p");
        p.textContent = "Additional Info on the back of the card";

        // Append elements to the appropriate parents
        back.appendChild(h1);
        back.appendChild(p);
        card.appendChild(front);
        card.appendChild(back);
        container.appendChild(card);

        // Append the container to the "pokemon-cards-opened" div
        var openedDiv = document.getElementById("pokemon-cards-opened");
        openedDiv.appendChild(container);
    }
}
