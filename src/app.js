// app.js - Milestone 2 & 3 Features (Simple)
const API_URL = 'https://api.jolpi.ca/ergast/f1/current/driverStandings.json';

// Global Data Store
let allDrivers = [];

// DOM Elements
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error');
const standingsContainer = document.getElementById('standings-container');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

// 1. Fetching Data using API (Milestone 2)
async function fetchF1Data() {
    try {
        loadingIndicator.classList.remove('hidden');
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch API data');
        
        const data = await response.json();
        allDrivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        
        renderDrivers(allDrivers);
        
        loadingIndicator.classList.add('hidden');
        standingsContainer.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        loadingIndicator.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

// 2. Rendering Data using `.forEach()` (Array HOF Requirement)
function renderDrivers(drivers) {
    standingsContainer.innerHTML = '';
    
    if (drivers.length === 0) {
        standingsContainer.innerHTML = '<p class="status-message" style="grid-column: 1/-1;">No results found.</p>';
        return;
    }

    drivers.forEach(driver => {
        const card = document.createElement('div');
        card.classList.add('driver-card');
        
        const teamName = driver.Constructors[0]?.name || 'Unknown Team';
        const fullName = `${driver.Driver.givenName} ${driver.Driver.familyName}`;

        card.innerHTML = `
            <h2>#${driver.position} - ${fullName}</h2>
            <p class="driver-info"><strong>Team:</strong> ${teamName}</p>
            <p class="driver-info"><strong>Nationality:</strong> ${driver.Driver.nationality}</p>
            <div class="points-badge">${driver.points} PTS</div>
        `;
        
        standingsContainer.appendChild(card);
    });
}

// 3. Search & Filtering using `.filter()` (Array HOF Requirement)
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        const filteredDrivers = allDrivers.filter(driver => {
            const fullName = `${driver.Driver.givenName} ${driver.Driver.familyName}`.toLowerCase();
            const team = (driver.Constructors[0]?.name || '').toLowerCase();
            
            return fullName.includes(term) || team.includes(term);
        });
        
        renderDrivers(filteredDrivers);
    });
}

// 4. Dark Mode / Light Mode Toggle (Button Interactions Requirement)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Light Mode';
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
        }
    });
}

// Initialize on load
fetchF1Data();
