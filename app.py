from flask import Flask, render_template, request, jsonify, send_file
from datetime import datetime
import webbrowser
import threading
import time
import json
from io import BytesIO
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors

app = Flask(__name__)

# Player data
MEN = [
    "Matt Marletta",
    "Pranav Tailor",
    "Jesse Mynahan",
    "Jonathan Marquez",
    "Lassen Christov",
    "Diogenis Panagiotis",
    "Yevgeniy",
    "Xhulio Kola",
    "Neel Goyal"
]

WOMEN = [
    "Addy Aquino",
    "Kaleigh Tierney",
    "Natalie Ruiz",
    "Joreen Sun",
    "Jill Del Pozzo",
    "Maggie Jiang",
    "Jennifer Hansen"
]

# Game structure: 8 rounds, 4 games per round
# Rounds 1, 3, 5, 7 are mixed (guy + girl)
# Rounds 2, 4, 6, 8 are gender (2 womens, 2 mens)

def get_game_type(round_num):
    """Returns 'mixed' or 'gender' based on round number (1-indexed)"""
    return 'mixed' if round_num % 2 == 1 else 'gender'

def validate_lineups(lineups):
    """
    Validates that lineups follow all rules:
    1. No player plays same partner more than 2 times
    2. No player plays more than once per round
    
    Returns: (is_valid, errors)
    """
    errors = []
    
    # Check max 1 game per round per player
    for round_num in range(1, 9):
        round_key = f"round_{round_num}"
        player_count = {}
        
        if round_key in lineups:
            for game_num, game in enumerate(lineups[round_key]):
                for player_slot in ['player1', 'player2']:
                    player = game.get(player_slot)
                    if player:
                        player_count[player] = player_count.get(player, 0) + 1
                        if player_count[player] > 1:
                            errors.append(f"{player} plays more than once in Round {round_num}")
    
    # Check partnership rules (max 2 games together)
    partnerships = {}
    for round_num in range(1, 9):
        round_key = f"round_{round_num}"
        if round_key in lineups:
            for game in lineups[round_key]:
                p1 = game.get('player1')
                p2 = game.get('player2')
                if p1 and p2:
                    partnership = tuple(sorted([p1, p2]))
                    partnerships[partnership] = partnerships.get(partnership, 0) + 1
                    if partnerships[partnership] > 2:
                        errors.append(f"{p1} and {p2} play together more than 2 times")
    
    return len(errors) == 0, errors

@app.route('/')
def index():
    return render_template('index.html', men=MEN, women=WOMEN)

@app.route('/api/validate', methods=['POST'])
def validate():
    lineups = request.json
    is_valid, errors = validate_lineups(lineups)
    return jsonify({'valid': is_valid, 'errors': errors})

@app.route('/api/stats', methods=['POST'])
def get_stats():
    lineups = request.json
    stats = {}
    
    all_players = MEN + WOMEN
    for player in all_players:
        stats[player] = {
            'games_played': 0,
            'rounds': [],
            'partners': {},
            'game_types': {'mixed': 0, 'gender': 0}
        }
    
    for round_num in range(1, 9):
        round_key = f"round_{round_num}"
        game_type = get_game_type(round_num)
        
        if round_key in lineups:
            for game in lineups[round_key]:
                p1 = game.get('player1')
                p2 = game.get('player2')
                
                if p1 and p2:
                    for player in [p1, p2]:
                        stats[player]['games_played'] += 1
                        stats[player]['rounds'].append(round_num)
                        stats[player]['game_types'][game_type] += 1
                    
                    # Track partnership
                    stats[p1]['partners'][p2] = stats[p1]['partners'].get(p2, 0) + 1
                    stats[p2]['partners'][p1] = stats[p2]['partners'].get(p1, 0) + 1
    
    return jsonify(stats)

@app.route('/api/export-pdf', methods=['POST'])
def export_pdf():
    lineups = request.json
    
    # Create PDF
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=landscape(letter), topMargin=0.5*inch, bottomMargin=0.5*inch)
    
    # Build content
    elements = []
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        textColor=colors.HexColor('#1f77b4'),
        spaceAfter=12,
    )
    
    elements.append(Paragraph("Pickleball Team Lineup", title_style))
    elements.append(Spacer(1, 0.2*inch))
    
    # Create tables for each round
    for round_num in range(1, 9):
        round_key = f"round_{round_num}"
        game_type = get_game_type(round_num)
        game_type_label = "Mixed" if game_type == 'mixed' else "Gender"
        
        elements.append(Paragraph(f"Round {round_num} - {game_type_label}", styles['Heading3']))
        
        if round_key in lineups:
            # Create header row with game numbers
            data = [['Game 1', 'Game 2', 'Game 3', 'Game 4']]
            
            # Create one row with all games, players stacked vertically
            row = []
            for game_idx in range(4):
                game = lineups[round_key][game_idx] if game_idx < len(lineups[round_key]) else {}
                p1 = game.get('player1', '')
                p2 = game.get('player2', '')
                # Stack players vertically
                cell_text = f"{p1}\n{p2}"
                row.append(cell_text)
            data.append(row)
            
            table = Table(data, colWidths=[1.5*inch, 1.5*inch, 1.5*inch, 1.5*inch])
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 10),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ('FONTSIZE', (0, 1), (-1, -1), 9),
                ('ROWHEIGHT', (0, 1), (-1, -1), 0.6*inch),
            ]))
            elements.append(table)
            elements.append(Spacer(1, 0.2*inch))
    
    doc.build(elements)
    buffer.seek(0)
    
    return send_file(
        buffer,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f'pickleball_lineup_{datetime.now().strftime("%Y%m%d_%H%M%S")}.pdf'
    )

if __name__ == '__main__':
    # open the browser automatically once the server has started
    def _open_browser():
        # give Flask a moment to bind to the port
        time.sleep(2)
        webbrowser.open('http://localhost:8000')

    browser_thread = threading.Thread(target=_open_browser, daemon=True)
    browser_thread.start()

    app.run(debug=False, port=8000)
