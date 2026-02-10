#!/bin/bash

# Ask which project to deploy
echo "Which project are you updating?"
echo "1) Main Landing Page"
echo "2) Torrey Pines Law Client"
echo "3) Both"
read -p "Enter choice [1-3]: " choice

case $choice in
  1)
    echo "🚀 Deploying Main Landing Page..."
    cd ~/Development/NextFlowSolutions/main
    npm run build
    pm2 reload nextflow-main
    echo "✅ Main Site Deployed!"
    ;;
  2)
    echo "🚀 Deploying Torrey Pines Law..."
    cd ~/Development/NextFlowSolutions/clients/TorreyPinesLaw
    npm run build
    pm2 reload nextflow-torreypineslaw
    echo "✅ Client Site Deployed!"
    ;;
  3)
    echo "🚀 Deploying EVERYTHING..."
    # Main
    cd ~/Development/NextFlowSolutions/main
    npm run build
    pm2 reload nextflow-main
    
    # Client
    cd ~/Development/NextFlowSolutions/clients/TorreyPinesLaw
    npm run build
    pm2 reload nextflow-torreypineslaw
    
    echo "✅ All Systems Deployed!"
    ;;
  *)
    echo "❌ Invalid option."
    ;;
esac
