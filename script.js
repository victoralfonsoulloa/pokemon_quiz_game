// Get DOM elements 
const resultElement = document.getElementById("result");
const pokemonImageElement = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementById("container");
const loadingContainer = document.getElementById("loadingContainer");

//Initialize variables 
let usedPokemonIds = [];

// Create function to fetch one Pokemon with an ID
async function fetchPokemonById(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
}

// // Create test function to see result from function to fetch Pokemon with ID
// async function testFetch() {
//     const pokemon = await fetchPokemonById(getRamdonPokemonId());
//     console.log(pokemon);
// }

// // Call test function
// testFetch();

//Function to load question with options
async function loadQuestionWithOptions() {
    //Fetch correct answer first
    let pokemonId = getRamdonPokemonId();

    //Check if current question has already been used
    while (usedPokemonIds.includes(pokemonId)) {
        pokemonId = getRamdonPokemonId();
    }

    //If pokemon has not been displayed yet, it is added to usedPokemonIds. And it is set as new const Pokemon.
    usedPokemonIds.push(pokemonId);
    const pokemon = await fetchPokemonById(pokemonId);

    //Create options array
    const options = [pokemon.name];
    const optionsIds = [pokemon.id];

    //Fetch additional random pokemon names to use as options
    while (options.length < 4) {
        let randomPokemonId = getRamdonPokemonId();
        // Ensure fetch option does not exist in the options list. Creates a new random id until it doesn't exist. 
        while (optionsIds.includes(randomPokemonId)) {
            randomPokemonId = getRamdonPokemonId();
        }
        optionsIds.push(randomPokemonId);

        // Fetching random Pokemon with the newly made ID, and adding it to the options array.
        const randomPokemon = await fetchPokemonById(randomPokemonId);
        const randomOption = randomPokemon.name;
        options.push(randomOption);

        // Test

        console.log(options);
        console.log(optionsIds)
    }

    shuffleArray(options);

    // Clear any previous result and update Pokemon image to fetched image URL from the sprites.
    resultElement.textContent = "Who's that Pokemon";
    pokemonImageElement.src = pokemon.sprites.other.dream_world.front_default;
}

// Initial Load

loadQuestionWithOptions();

// --- Utility Functions ---
// Function to randomize the Pokemon ID
function getRamdonPokemonId() {
    return Math.floor(Math.random() * 151) + 1;
}

// Shuffle the array we send it 
function shuffleArray (array) {
    return array.sort(() => Math.random() - 0.5)
}

