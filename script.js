// Get DOM elements 
const resultElement = document.getElementById("result");
const pokemonImageElement = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementsByClassName("container");
const loadingContainer = document.getElementById("loadingContainer");

// Initialize variables 
let usedPokemonIds = [];
let count = 0;
let points = 0;
let showLoading = false;

// Create function to fetch one Pokemon with an ID
async function fetchPokemonById(id) {
    showLoading = true;
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

// Function to load question with options
async function loadQuestionWithOptions() {
    if (showLoading) {
        showLoadingWindow();
        hidePuzzleWindow();
    }

    // Fetch correct answer first
    let pokemonId = getRamdonPokemonId();

    // Check if current question has already been used
    while (usedPokemonIds.includes(pokemonId)) {
        pokemonId = getRamdonPokemonId();
    }

    // If pokemon has not been displayed yet, it is added to usedPokemonIds. And it is set as new const Pokemon.
    usedPokemonIds.push(pokemonId);
    const pokemon = await fetchPokemonById(pokemonId);

    // Create options array
    const options = [pokemon.name];
    const optionsIds = [pokemon.id];

    // Fetch additional random pokemon names to use as options
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

        // Turn off loading if all options have been fetched.
        if (options.length === 4) {
            showLoading = false;
        }
    }

    shuffleArray(options);

    // Clear any previous result and update Pokemon image to fetched image URL from the sprites.
    resultElement.textContent = "Who's that Pokemon";
    pokemonImageElement.src = pokemon.sprites.other.dream_world.front_default;

    // Create options HTML elements from options array in the DOM
    optionsContainer.innerHTML = "";
    options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = (event) => checkAnswer(option === pokemon.name, event);
        optionsContainer.appendChild(button);
    });

    if (!showLoading) {
        hideLoadingWindow();
        showPuzzleWindow();
    }
}

// Create checkAnswer function 
function checkAnswer(isCorrect, event) {
    // Checks if any button is already selected, if falsy => no element => null.
    const selectedButton = document.querySelector(".selected");

    // If already a button is selected, do nothing, exit function.
    if (selectedButton) {
        return;
    }
    
    // Else mark the clicked button as selected and increase the count by 1.
    event.target.classList.add("selected");
    count++;
    totalCount.textContent = count;

    if (isCorrect) {
        displayResult("Correct Answer!");
        // If correct, increase the points by 1.
        points++;
        pointsElement.textContent = points;
        event.target.classList.add("correct");
    } else {
        displayResult("Wrong Answer...");
        event.target.classList.add("wrong");
    }

    // Load the next question with a 1s delay for the user to read the result

    setTimeout(() => {
        showLoading = true;
        loadQuestionWithOptions();
    }, 1000)
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

// Function to update result text and class name.
function displayResult(result) {
    resultElement.textContent = result;
}

// Hide loading 
function hideLoadingWindow() {
    loadingContainer.classList.add("hide");
}

function showLoadingWindow() {
    mainContainer[0].classList.remove("show");
    loadingContainer.classList.remove("hide");
    loadingContainer.classList.add("show");
}

// Show puzzle window
function showPuzzleWindow() {
    loadingContainer.classList.remove("show");
    mainContainer[0].classList.remove("hide");
    mainContainer[0].classList.add("show");
}


// Hide puzzle window
function hidePuzzleWindow() {
    mainContainer[0].classList.add("hide");
}
