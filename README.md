<div align="center">
  
# 🚀 NextFlow Solutions
**Intelligent Workflows. Autonomous AI Agents. Seamless Bridging.**

[![Agency Type](https://img.shields.io/badge/Agency-AI_Automation-blue?style=for-the-badge)](https://nextflowsolutions.dev)
[![Location](https://img.shields.io/badge/Location-San_Diego_CA-orange?style=for-the-badge)](/)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](/)

*NextFlow Solutions is a specialized automation agency designing and deploying intelligent workflows, bringing the power of modern LLMs directly into actionable business logic.*

---

</div>

## 🌟 Core Identity

We focus on bridging the gap between manual, repetitive business processes and fully autonomous AI agents. By leveraging the industry's best orchestration tools, we significantly increase operational efficiency for our clients.

### 💼 Operational Philosophy
- **Language Agnostic Approach:** We utilize the best tool for the job, whether it's low-code visual builders like **n8n**, or code-heavy custom nodes in **Python** and **JavaScript (TypeScript/React)**.
- **Self-Hosted Capabilities:** We place a strong emphasis on data privacy and control. We leverage profound experience with self-hosted environments (Docker, Linux/Windows Servers) to keep sensitive client data under lock and key.

---

## 🛠️ Technology Stack

<p align="center">
  <img src="https://img.shields.io/badge/n8n-FF6E4A?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript"/>
</p>

### Key Focus Areas
1. **AI Integration:** Implementing Large Language Models (LLMs) and generative artificial intelligence into highly actionable, secure pipelines.
2. **Workflow Automation:** Building end-to-end automation of repetitive tasks.
3. **Idea Generation:** Leveraging AI to assist in brainstorming, creative synthesis, and document drafting (e.g., Legal workflows).

---

## 🏗️ Repository Structure

This monorepo currently contains two primary React + Vite frontends representing distinct client portal applications:

| Directory | Description | Default Port |
| :--- | :--- | :--- |
| **`/main`** | The main NextFlow Solutions dashboard application. | `localhost:5173` |
| **`/Legal`** | Custom dynamically-branded portal built for automating logic and form completion in the Legal industry. | `localhost:5174` |

---

## 🚀 Running the Application Environment

To start developing and running the local servers, you will need **Node.js** and **npm** installed on your machine. 

### ⚡ Quick Start

For simultaneous execution of both the `main` and `Legal` environments, a bash script is provided at the root:

```bash
# Make the script executable
chmod +x run_dev.sh

# Start all development servers
./run_dev.sh
```

*(Press `Ctrl+C` to gracefully kill both servers.)*

### ⚙️ Manual Start

If you prefer to run the portals individually:

```bash
# Navigate to the specific client directory (e.g., Legal)
cd Legal

# Ensure dependencies are installed
npm install

# Start the Vite development server
npm run dev
```

---

<div align="center">
  <i>Developed and engineered by Stephen Giang & NextFlow Solutions.</i>
</div> 