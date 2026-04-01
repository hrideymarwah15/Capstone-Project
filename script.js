const API_URL = 'https://rickandmortyapi.com/api/character';

// DOM Elements
const characterContainer = document.getElementById('character-container');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error');

// Fetch characters from the API
async function fetchCharacters() {
    try {
        // 1. Show loading state
        loadingIndicator.classList.remove('hidden');
        characterContainer.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // 2. Make the API Call using fetch
        const response = await fetch(API_URL);
        
        // Handle HTTP errors
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // 3. Display the fetched data
        displayCharacters(data.results);
        
        // Hide loading, show content
        loadingIndicator.classList.add('hidden');
        characterContainer.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error fetching data:', error);
        // Show error state
        loadingIndicator.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

// Render characters to the DOM
function displayCharacters(characters) {
    // Clear any previous content
    characterContainer.innerHTML = ''; 

    characters.forEach(character => {
        // Create card element container
        const card = document.createElement('div');
        card.classList.add('card');

        // Determine status color class for simple styling
        const statusClass = character.status.toLowerCase();

        // Inject content
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="card-content">
                <h2>${character.name}</h2>
                <p>Status: <span class="status ${statusClass}">${character.status}</span></p>
                <p>Species: ${character.species}</p>
                <p>Location: ${character.location.name}</p>
            </div>
        `;

        // Append to the grid container
        characterContainer.appendChild(card);
    });
}

// Call the function when the script loads
fetchCharacters();
