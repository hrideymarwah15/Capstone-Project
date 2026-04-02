const API_URL = 'https://api.openf1.org/v1/drivers?session_key=latest';
let allDrivers = [];

// DOM Elements
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error');
const standingsContainer = document.getElementById('standings-container');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

// Fetch Data Using OpenF1 API
async function fetchF1Data() {
    try {
        loadingIndicator.classList.remove('hidden');
        
        // Fetch from OpenF1 Drivers endpoint (Latest Session)
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch API data');
        
        const data = await response.json();
        
        // OpenF1 returns an array of driver objects.
        allDrivers = data;
        
        renderDrivers(allDrivers);
        
        loadingIndicator.classList.add('hidden');
        standingsContainer.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        loadingIndicator.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

// Render Data
function renderDrivers(drivers) {
    standingsContainer.innerHTML = '';
    
    if (drivers.length === 0) {
        standingsContainer.innerHTML = '<p class="status-message" style="grid-column: 1/-1;">No results found.</p>';
        return;
    }

    drivers.forEach(driver => {
        const card = document.createElement('div');
        card.classList.add('driver-card');
        
        const teamName = driver.team_name || 'Unknown Team';
        const fullName = driver.full_name || 'Driver';

        card.innerHTML = `
            <h2>#${driver.driver_number} - ${fullName}</h2>
            <p class="driver-info"><strong>Constructor Team:</strong> ${teamName}</p>
            <p class="driver-info"><strong>Driver Acronym:</strong> ${driver.name_acronym}</p>
            <div class="points-badge">${teamName} Racing</div>
        `;
        
        standingsContainer.appendChild(card);
    });
}

// Search & Filtering
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        const filteredDrivers = allDrivers.filter(driver => {
            const fullName = (driver.full_name || '').toLowerCase();
            const team = (driver.team_name || '').toLowerCase();
            
            return fullName.includes(term) || team.includes(term);
        });
        
        renderDrivers(filteredDrivers);
    });
}

// Dark Mode
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
}

fetchF1Data();
