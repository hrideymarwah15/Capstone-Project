const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get('id');

const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error');
const driverDetailsContainer = document.getElementById('driver-details');
const driverSubtitle = document.getElementById('driver-subtitle');
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if(themeToggle) themeToggle.textContent = '☀️ Light Mode';
}

async function fetchDriverDetails() {
    if (!driverId) {
        showError('No driver ID provided.');
        return;
    }
    
    try {
        loadingIndicator.classList.remove('hidden');
        
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/current/drivers/${driverId}/driverStandings.json`);
        
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        
        const standingsList = data.MRData.StandingsTable.StandingsLists[0];
        
        if (!standingsList || standingsList.DriverStandings.length === 0) {
            showError('Driver not found in current season standings.');
            return;
        }
        
        const driverInfo = standingsList.DriverStandings[0];
        renderDriverProfile(driverInfo);
        
    } catch (error) {
        console.error(error);
        showError('Failed to load driver details.');
    }
}

function renderDriverProfile(data) {
    const driver = data.Driver;
    const team = data.Constructors[0]?.name || 'Unknown Team';
    const fullName = `${driver.givenName} ${driver.familyName}`;
    
    driverSubtitle.textContent = `Detailed statistics for ${fullName}`;
    
    const wikiLink = driver.url ? `<p style="margin-top: 1rem;"><a href="${driver.url}" target="_blank" style="color: var(--accent-red); font-weight: bold; text-decoration: none;">Wikipedia Profile ↗</a></p>` : '';
    
    driverDetailsContainer.innerHTML = `
        <div class="profile-header">
            <h2>${fullName} ${driver.permanentNumber ? `(#${driver.permanentNumber})` : ''}</h2>
            <p class="driver-info" style="font-size: 1.1rem;">
                <strong>Nationality:</strong> ${driver.nationality} | 
                <strong>Date of Birth:</strong> ${driver.dateOfBirth}
                ${driver.code ? `| <strong>Code:</strong> ${driver.code}` : ''}
            </p>
            ${wikiLink}
        </div>
        
        <h3 style="margin-top: 2.5rem; border-bottom: 2px solid var(--accent-red); padding-bottom: 0.5rem; display: inline-block;">Current Season Performance</h3>
        
        <div class="profile-stats">
            <div class="stat-box">
                <div class="stat-label">Championship Position</div>
                <div class="stat-value">#${data.position}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Total Points</div>
                <div class="stat-value">${data.points}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Race Wins</div>
                <div class="stat-value">${data.wins}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Constructor Team</div>
                <div class="stat-value" style="font-size: 1.3rem; margin-top: 1rem;">${team}</div>
            </div>
        </div>
    `;
    
    loadingIndicator.classList.add('hidden');
    driverDetailsContainer.classList.remove('hidden');
}

function showError(msg) {
    loadingIndicator.classList.add('hidden');
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

fetchDriverDetails();
