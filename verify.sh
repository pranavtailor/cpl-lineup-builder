#!/bin/bash
# Verification script to ensure all components are properly installed

echo "🔍 CPL Pickleball Lineup Builder - Verification Script"
echo "======================================================"
echo ""

# Check Python
echo "Checking Python installation..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python found: $PYTHON_VERSION"
else
    echo "❌ Python not found"
    exit 1
fi

# Check Flask
echo ""
echo "Checking Flask installation..."
if python3 -c "import flask" 2>/dev/null; then
    FLASK_VERSION=$(python3 -c "import flask; print(flask.__version__)")
    echo "✅ Flask found: v$FLASK_VERSION"
else
    echo "⚠️  Flask not installed. Run: pip install flask"
fi

# Check ReportLab
echo ""
echo "Checking ReportLab installation..."
if python3 -c "import reportlab" 2>/dev/null; then
    REPORTLAB_VERSION=$(python3 -c "import reportlab; print(reportlab.__version__)")
    echo "✅ ReportLab found: v$REPORTLAB_VERSION"
else
    echo "⚠️  ReportLab not installed. Run: pip install reportlab"
fi

# Check app.py
echo ""
echo "Checking application files..."
if [ -f "app.py" ]; then
    echo "✅ app.py found ($(wc -l < app.py) lines)"
else
    echo "❌ app.py not found"
    exit 1
fi

# Check templates
if [ -f "templates/index.html" ]; then
    echo "✅ templates/index.html found"
else
    echo "❌ templates/index.html not found"
    exit 1
fi

# Check static files
if [ -f "static/style.css" ]; then
    echo "✅ static/style.css found"
else
    echo "❌ static/style.css not found"
    exit 1
fi

if [ -f "static/script.js" ]; then
    echo "✅ static/script.js found"
else
    echo "❌ static/script.js not found"
    exit 1
fi

# Test app loading
echo ""
echo "Testing Flask app import..."
if python3 -c "from app import app, MEN, WOMEN; print(f'✅ App loads successfully. Players: {len(MEN)} men, {len(WOMEN)} women')" 2>&1; then
    :
else
    echo "❌ App import failed"
    exit 1
fi

# Check documentation
echo ""
echo "Checking documentation..."
for doc in README.md QUICK_START.md SETUP.md DEPLOYMENT.md BUILD_EXECUTABLE.md; do
    if [ -f "$doc" ]; then
        echo "✅ $doc found"
    else
        echo "⚠️  $doc not found"
    fi
done

# Check startup scripts
echo ""
echo "Checking startup scripts..."
if [ -f "run.sh" ]; then
    echo "✅ run.sh found"
else
    echo "❌ run.sh not found"
fi

if [ -f "run.bat" ]; then
    echo "✅ run.bat found"
else
    echo "❌ run.bat not found"
fi

echo ""
echo "======================================================"
echo "✅ Verification Complete!"
echo ""
echo "Next steps:"
echo "1. Run: ./run.sh"
echo "2. Open: http://localhost:5000"
echo "3. Start building lineups!"
echo ""
