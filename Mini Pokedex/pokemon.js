async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonname").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            throw new Error("Pokémon not found. Please check the name.");
        }

        const data = await response.json();

        
        const pokemonSprite = document.getElementById("pokemonSprite");
        pokemonSprite.src = data.sprites.front_default;
        pokemonSprite.style.display = "block";

        document.getElementById("pokemonName").textContent = `Name: ${data.name}`;
        document.getElementById("pokemonHeight").textContent = `Height: ${data.height} decimetres`;
        document.getElementById("pokemonWeight").textContent = `Weight: ${data.weight} hectograms`;

       
        const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
        document.getElementById("pokemonAbilities").textContent = `Abilities: ${abilities}`;
        
    } catch (error) {
        console.error(error);
        alert(error.message); 
        document.getElementById("pokemonSprite").style.display = "none"; 
        document.getElementById("pokemonName").textContent = "";
        document.getElementById("pokemonHeight").textContent = "";
        document.getElementById("pokemonWeight").textContent = "";
        document.getElementById("pokemonAbilities").textContent = "";
    }
}
