// using Jolpi API because OpenF1 doesn't offer Championship Standings
const DRIVER_URL = 'https://api.jolpi.ca/ergast/f1/current/driverStandings.json';
const CONSTRUCTOR_URL = 'https://api.jolpi.ca/ergast/f1/current/constructorStandings.json';

let currentData = [];
let currentType = 'drivers'; // 'drivers' or 'constructors'

const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error');
const standingsContainer = document.getElementById('standings-container');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

const tabDrivers = document.getElementById('tab-drivers');
const tabConstructors = document.getElementById('tab-constructors');

async function fetchStandings(type) {
    try {
        currentType = type;
        loadingIndicator.classList.remove('hidden');
        standingsContainer.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        const url = type === 'drivers' ? DRIVER_URL : CONSTRUCTOR_URL;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        
        if (type === 'drivers') {
            currentData = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        } else {
            currentData = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        }
        
        renderCards(currentData);
        
        loadingIndicator.classList.add('hidden');
        standingsContainer.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        loadingIndicator.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

function renderCards(dataSet) {
    standingsContainer.innerHTML = '';
    
    if (dataSet.length === 0) {
        standingsContainer.innerHTML = '<p class="status-message" style="grid-column: 1/-1;">No results found.</p>';
        return;
    }

    dataSet.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('driver-card');
        
        if (currentType === 'drivers') {
            const fullName = `${item.Driver.givenName} ${item.Driver.familyName}`;
            const team = item.Constructors[0]?.name || 'Unknown';
            card.innerHTML = `
                <h2>#${item.position} - ${fullName}</h2>
                <p class="driver-info"><strong>Team:</strong> ${team}</p>
                <p class="driver-info"><strong>Nationality:</strong> ${item.Driver.nationality}</p>
                <p class="driver-info"><strong>Wins:</strong> ${item.wins}</p>
                <div class="points-badge">${item.points} PTS</div>
            `;
        } else {
            const teamName = item.Constructor.name;
            const nationality = item.Constructor.nationality;
            card.innerHTML = `
                <h2>#${item.position} - ${teamName}</h2>
                <p class="driver-info"><strong>Nationality:</strong> ${nationality}</p>
                <p class="driver-info"><strong>Wins:</strong> ${item.wins}</p>
                <div class="points-badge">${item.points} PTS</div>
            `;
        }
        
        standingsContainer.appendChild(card);
    });
}

// Search Feature HOF `filter()`
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    
    const filtered = currentData.filter(item => {
        if (currentType === 'drivers') {
            const name = `${item.Driver.givenName} ${item.Driver.familyName}`.toLowerCase();
            const team = (item.Constructors[0]?.name || '').toLowerCase();
            return name.includes(term) || team.includes(term);
        } else {
            return item.Constructor.name.toLowerCase().includes(term);
        }
    });
    
    renderCards(filtered);
});

// UI Toggles
tabDrivers.addEventListener('click', () => {
    searchInput.value = '';
    tabDrivers.classList.add('active-tab');
    tabConstructors.classList.remove('active-tab');
    fetchStandings('drivers');
});

tabConstructors.addEventListener('click', () => {
    searchInput.value = '';
    tabConstructors.classList.add('active-tab');
    tabDrivers.classList.remove('active-tab');
    fetchStandings('constructors');
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Init
fetchStandings('drivers');
