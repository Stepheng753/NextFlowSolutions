#!/bin/bash

# Ask which project to deploy
echo "Which project are you updating?"
echo "1) Main Landing Page"
echo "2) LawIP Client"
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
    echo "🚀 Deploying LawIP..."
    cd ~/Development/NextFlowSolutions/clients/LawIP
    npm run build
    pm2 reload nextflow-lawip
    echo "✅ Client Site Deployed!"
    ;;
  3)
    echo "🚀 Deploying EVERYTHING..."
    # Main
    cd ~/Development/NextFlowSolutions/main
    npm run build
    pm2 reload nextflow-main
    
    # Client
    cd ~/Development/NextFlowSolutions/clients/LawIP
    npm run build
    pm2 reload nextflow-lawip
    
    echo "✅ All Systems Deployed!"
    ;;
  *)
    echo "❌ Invalid option."
    ;;
esac
