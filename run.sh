#!/bin/bash

# CPL Pickleball Lineup Builder - Startup Script
# This script will set up and run the application

echo "🎾 CPL Pickleball Lineup Builder"
echo "=================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✓ Python found: $(python3 --version)"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

# Run the app
echo ""
echo "✓ Setup complete!"
echo ""
echo "🚀 Starting the Pickleball Lineup Builder..."
echo "📱 Open your browser and go to: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Open browser automatically
sleep 2 && open "http://localhost:8000" &

python3 app.py
