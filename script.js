// Get DOM elements 
const resultElement = document.getElementById("result");
const pokemonImage = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementById("container");
const loadingContainer = document.getElementById("loadingContainer");

// Create function to fetch one Pokemon with an ID
async function fetchPokemonById(id) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    const data = await response.json();
}