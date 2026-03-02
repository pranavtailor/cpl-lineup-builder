// Global state
let lineups = {};
const ROUNDS = 8;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLineups();
    renderRounds();
    setupEventListeners();
});

// Initialize empty lineups structure
function initializeLineups() {
    for (let round = 1; round <= ROUNDS; round++) {
        lineups[`round_${round}`] = [];
        for (let game = 0; game < 4; game++) {
            lineups[`round_${round}`].push({
                player1: '',
                player2: ''
            });
        }
    }
}

// Get game type for a round
function getGameType(roundNum) {
    return roundNum % 2 === 1 ? 'mixed' : 'gender';
}

// Get available players for a dropdown based on context
function getAvailablePlayers(roundNum, gameNum, pairNum, playerNum) {
    const gameType = getGameType(roundNum);
    let availablePlayers = [];

    if (gameType === 'mixed') {
        // For mixed games, alternate between men and women
        // For simplicity, we'll provide all players but let validation catch issues
        availablePlayers = ['', ...MEN, ...WOMEN];
    } else {
        // For gender games, determine which gender based on game number
        if (gameNum < 2) {
            // First 2 games are women's
            availablePlayers = ['', ...WOMEN];
        } else {
            // Last 2 games are men's
            availablePlayers = ['', ...MEN];
        }
    }

    return availablePlayers;
}

// Render all rounds
function renderRounds() {
    const container = document.getElementById('roundsContainer');
    container.innerHTML = '';

    for (let round = 1; round <= ROUNDS; round++) {
        const roundDiv = document.createElement('div');
        roundDiv.className = 'round';

        const gameType = getGameType(round);
        const roundHeader = document.createElement('div');
        roundHeader.className = 'round-header';

        const title = document.createElement('div');
        title.className = 'round-title';
        title.textContent = `Round ${round}`;

        const badge = document.createElement('div');
        badge.className = `round-type ${gameType}`;
        badge.textContent = gameType === 'mixed' ? 'Mixed (M+F)' : 'Gender Separated';

        roundHeader.appendChild(title);
        roundHeader.appendChild(badge);
        roundDiv.appendChild(roundHeader);

        // Games grid
        const gamesGrid = document.createElement('div');
        gamesGrid.className = 'games-grid';

        for (let game = 0; game < 4; game++) {
            const gameDiv = document.createElement('div');
            gameDiv.className = 'game';

            const gameTitle = document.createElement('div');
            gameTitle.className = 'game-title';
            gameTitle.textContent = `Game ${game + 1}`;
            gameDiv.appendChild(gameTitle);

            // For mixed rounds: Player 1 (Man), Player 2 (Woman)
            // For gender rounds: Both same gender (women for games 0-1, men for games 2-3)
            if (gameType === 'mixed') {
                // Player 1: Male
                const player1Div = createPlayerInput(round, game, 1, 'male');
                gameDiv.appendChild(player1Div);
                
                // Player 2: Female
                const player2Div = createPlayerInput(round, game, 2, 'female');
                gameDiv.appendChild(player2Div);
            } else {
                // Gender rounds
                const gender = game < 2 ? 'female' : 'male';
                
                // Player 1
                const player1Div = createPlayerInput(round, game, 1, gender);
                gameDiv.appendChild(player1Div);
                
                // Player 2
                const player2Div = createPlayerInput(round, game, 2, gender);
                gameDiv.appendChild(player2Div);
            }

            gamesGrid.appendChild(gameDiv);
        }

        roundDiv.appendChild(gamesGrid);
        container.appendChild(roundDiv);
    }
}

// Create player input field
function createPlayerInput(roundNum, gameNum, playerNum, gender) {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'pair';

    const label = document.createElement('div');
    label.className = 'pair-label';
    label.textContent = `Player ${playerNum}`;
    
    const badge = document.createElement('span');
    badge.className = `gender-badge ${gender === 'male' ? 'male' : 'female'}`;
    badge.textContent = gender === 'male' ? 'M' : 'F';
    label.appendChild(badge);
    
    playerDiv.appendChild(label);

    const inputsDiv = document.createElement('div');
    inputsDiv.className = 'pair-inputs';

    const select = document.createElement('select');
    select.id = `r${roundNum}g${gameNum}p${playerNum}`;

    // Add empty option
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = 'Select player...';
    select.appendChild(emptyOption);

    // Get available players based on gender
    const players = gender === 'male' ? MEN : WOMEN;

    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player;
        option.textContent = player;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        updateLineup(roundNum, gameNum, playerNum, e.target.value);
    });

    // Set current value if exists
    const currentValue = lineups[`round_${roundNum}`][gameNum][`player${playerNum}`];
    select.value = currentValue;

    inputsDiv.appendChild(select);
    playerDiv.appendChild(inputsDiv);
    return playerDiv;
}

// Update lineup when dropdown changes
function updateLineup(roundNum, gameNum, playerNum, playerName) {
    lineups[`round_${roundNum}`][gameNum][`player${playerNum}`] = playerName;
}

// Setup event listeners for buttons
function setupEventListeners() {
    document.getElementById('validateBtn').addEventListener('click', validateLineup);
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
    document.getElementById('clearBtn').addEventListener('click', clearLineups);
    
    document.getElementById('refreshStatsBtn').addEventListener('click', displayStats);

    // Tab switching
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', switchTab);
    });
}

// Switch tabs
function switchTab(e) {
    const tabName = e.target.dataset.tab;

    // Update active tab button
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    // Load stats when switching to info tab
    if (tabName === 'info') {
        displayStats();
    }
}

// Validate lineup
async function validateLineup() {
    const msgDiv = document.getElementById('validationMessage');
    msgDiv.className = 'validation-message show';

    try {
        const response = await fetch('/api/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lineups)
        });

        const data = await response.json();

        if (data.valid) {
            msgDiv.className = 'validation-message show success';
            msgDiv.innerHTML = '<strong>✓ Lineup is valid! All rules are satisfied.</strong>';
        } else {
            msgDiv.className = 'validation-message show error';
            let html = '<strong>✗ Lineup has issues:</strong><ul>';
            data.errors.forEach(error => {
                html += `<li>${error}</li>`;
            });
            html += '</ul>';
            msgDiv.innerHTML = html;
        }
    } catch (error) {
        msgDiv.className = 'validation-message show error';
        msgDiv.innerHTML = '<strong>Error validating lineup:</strong> ' + error.message;
    }
}

// Display stats
async function displayStats() {
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = '<p style="text-align: center; color: #718096;">Loading stats...</p>';

    try {
        const response = await fetch('/api/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lineups)
        });

        const stats = await response.json();

        // Separate men and women
        const menStats = MEN.map(name => ({ name, ...stats[name] }))
            .sort((a, b) => b.games_played - a.games_played);
        
        const womenStats = WOMEN.map(name => ({ name, ...stats[name] }))
            .sort((a, b) => b.games_played - a.games_played);

        let html = '';

        // Men's stats
        html += '<div class="stats-group">';
        html += '<div class="stats-group-title">👨 Men\'s Players</div>';
        html += '<div class="player-stats">';
        menStats.forEach(player => {
            html += renderPlayerStat(player);
        });
        html += '</div></div>';

        // Women's stats
        html += '<div class="stats-group">';
        html += '<div class="stats-group-title">👩 Women\'s Players</div>';
        html += '<div class="player-stats">';
        womenStats.forEach(player => {
            html += renderPlayerStat(player);
        });
        html += '</div></div>';

        statsContainer.innerHTML = html;
    } catch (error) {
        statsContainer.innerHTML = '<p style="color: #f56565; text-align: center;">Error loading stats: ' + error.message + '</p>';
    }
}

// Render individual player stat
function renderPlayerStat(player) {
    const roundsList = player.rounds.length > 0 
        ? player.rounds.sort((a, b) => a - b).join(', ')
        : 'None';
    
    const partnersHTML = Object.entries(player.partners).length > 0
        ? Object.entries(player.partners)
            .map(([name, count]) => `${name} (${count}x)`)
            .join(', ')
        : 'None';

    return `
        <div class="player-stat-item">
            <div>
                <div class="player-name">${player.name}</div>
                <div class="player-details">
                    <div><span class="stat-badge games">Games: ${player.games_played}</span></div>
                    <div><span class="stat-badge mixed">Mixed: ${player.game_types.mixed}</span></div>
                    <div><span class="stat-badge gender">Gender: ${player.game_types.gender}</span></div>
                </div>
            </div>
        </div>
        <div style="padding-left: 16px; font-size: 12px; color: #718096; margin-bottom: 8px;">
            <div><strong>Rounds:</strong> ${roundsList}</div>
            <div><strong>Partners:</strong> ${partnersHTML}</div>
        </div>
    `;
}

// Export to PDF
async function exportToPDF() {
    try {
        const response = await fetch('/api/export-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lineups)
        });

        if (!response.ok) throw new Error('Failed to generate PDF');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pickleball_lineup_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        alert('Error exporting PDF: ' + error.message);
    }
}

// Clear all lineups
function clearLineups() {
    if (confirm('Are you sure you want to clear all lineups? This cannot be undone.')) {
        initializeLineups();
        renderRounds();
        document.getElementById('validationMessage').classList.remove('show');
    }
}
