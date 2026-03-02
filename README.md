# 🎾 CPL Pickleball Lineup Builder

A comprehensive web application for managing competitive pickleball team lineups with automatic validation, player statistics, and PDF export capabilities.

## Features

✅ **Interactive Lineup Builder**
- Dropdown selectors for each player slot
- 8 rounds with 4 games per round (32 games total)
- Alternating mixed and gender-separated game types

✅ **Automatic Rule Validation**
- Enforces "maximum 2 games together" partnership rule
- Prevents players from playing more than once per round
- Validates mixed game gender requirements

✅ **Player Statistics Dashboard**
- Real-time overview of which players are playing
- Games played per player
- Game type breakdown (mixed vs. gender)
- Partner history for each player
- Rounds participation tracking

✅ **PDF Export**
- Professional lineup export with formatting
- Easy to print and share with team

✅ **Easy to Use Interface**
- Clean, modern UI designed for non-technical users
- Real-time validation feedback
- Responsive design works on desktop and tablet

## System Requirements

- **Python 3.7+**
- **Internet browser** (Chrome, Safari, Firefox, Edge)
- **macOS, Windows, or Linux**

## Installation & Setup

### Option 1: Automated Setup (Recommended)

#### On macOS/Linux:
```bash
# Make the script executable
chmod +x run.sh

# Run the application
./run.sh
```

#### On Windows:
```bash
# Simply double-click run.bat
# Or run from Command Prompt:
run.bat
```

### Option 2: Manual Setup

1. **Install Python 3** (if not already installed)
   - Download from https://www.python.org/downloads/
   - Ensure "Add Python to PATH" is checked during installation

2. **Create a virtual environment**
   ```bash
   python3 -m venv venv
   ```

3. **Activate the virtual environment**
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
   - **Windows:**
     ```bash
     venv\Scripts\activate.bat
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**
   ```bash
   python3 app.py
   ```

6. **Open in browser**
   - Navigate to `http://localhost:5000`

## How to Use

### Building Your Lineup

1. **Select Players**: Click on dropdown menus for each player slot in each game
2. **Follow the Structure**:
   - **Odd Rounds (1, 3, 5, 7)**: Mixed games (1 man + 1 woman per pair)
   - **Even Rounds (2, 4, 6, 8)**: Gender-separated games (women's and men's)

### Validating Your Lineup

1. Click the **"✓ Validate Lineup"** button
2. You'll see either:
   - ✅ "Lineup is valid" - All rules are satisfied
   - ❌ List of issues - Follow the suggestions to fix

### Viewing Player Statistics

1. Click on the **"Info & Stats"** tab
2. See:
   - How many games each player is playing
   - Which rounds they're in
   - Game type breakdown
   - Partnership history

### Exporting to PDF

1. Click the **"📄 Export to PDF"** button
2. A PDF file will download automatically
3. Print or share with your team

## Rules Enforced

1. **Partnership Rule**: No two players can play together more than 2 games
2. **Round Limit**: Each player can play maximum 1 game per round (max 8 games total)
3. **Mixed Game Rule**: In mixed rounds, each pair must have 1 man and 1 woman
4. **Gender Game Rule**: In gender rounds, women play women and men play men

## Team Players

### Men (9 total)
- Matt Marletta
- Pranav Tailor
- Jesse Mynahan
- Jonathan Marquez
- Lassen Christov
- Diogenis Panagiotis
- Yevgeniy
- Xhulio Kola
- Neel Goyal

### Women (7 total)
- Addy
- Kaleigh Tierney
- Natalie Ruiz
- Joreen Sun
- Jill Del Pozzo
- Maggie Jiang
- Jennifer Hansen

## Match Structure

### 8 Rounds × 4 Games = 32 Games Total

**Mixed Rounds** (Rounds 1, 3, 5, 7):
- Each game: 2 pairs (Guy + Girl in each pair)
- 4 men and 4 women per round

**Gender Rounds** (Rounds 2, 4, 6, 8):
- Games 1-2: Women's doubles (2 women per pair)
- Games 3-4: Men's doubles (2 men per pair)
- 4 women and 4 men per round

## Troubleshooting

### "Port 5000 is already in use"
- Another application is using port 5000
- Modify `app.py` line near the end: change `port=5000` to another number (e.g., `port=5001`)

### Virtual environment not activating
- Make sure you're in the correct directory
- Try using the full path to activate script

### Players not appearing in dropdowns
- Refresh your browser (Ctrl+R or Cmd+R)
- Clear browser cache if issues persist

### PDF export not working
- Ensure reportlab is installed: `pip install reportlab`
- Check that the application is running correctly

## File Structure

```
cpl-lineup-builder/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── run.sh                # Startup script (macOS/Linux)
├── run.bat               # Startup script (Windows)
├── README.md             # This file
├── templates/
│   └── index.html        # Web interface
└── static/
    ├── style.css         # Styling
    └── script.js         # Frontend logic
```

## Support

For issues or feature requests, please check:
1. That Python 3.7+ is installed
2. That all dependencies are installed (`pip install -r requirements.txt`)
3. That port 5000 is available
4. Browser console for any JavaScript errors (F12 → Console)

## License

This project is created for the CPL Pickleball Team.

---

Made with ❤️ for competitive pickleball
