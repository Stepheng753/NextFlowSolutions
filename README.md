# NextFlow Solutions

**Type:** AI Automation Agency
**Founder:** Stephen Giang
**Location:** San Diego, CA (Global/Remote)

---

## **Core Identity**
NextFlow Solutions is an automation agency specialized in designing and deploying intelligent workflows. The agency focuses on bridging the gap between manual business processes and autonomous AI agents.

## **Primary Technology Stack**
* **Orchestration:** n8n (Node-based Workflow Automation)
* **Scripting & Custom Nodes:** Python, JavaScript/TypeScript (React)
* **Infrastructure:** Linux/Windows Server environments

## **Key Focus Areas**
* **AI Integration:** Implementing LLMs and generative models into actionable business logic.
* **Workflow Automation:** End-to-end automation of repetitive tasks to increase operational efficiency.
* **Idea Generation:** Leveraging AI to assist in brainstorming and creative synthesis for client projects.

## **Operational Philosophy**
* **Language Agnostic Approach:** Utilizing the best tool for the job, whether low-code (n8n) or code-heavy (Python/JS).
* **Self-Hosted Capabilities:** Strong emphasis on data privacy and control, leveraging experience with self-hosted environments (e.g., Docker, Linux).

## **Running the Application**
To run the client portals (e.g., Legal), you will need Node.js and npm installed.

```bash
# Navigate to the specific client directory
cd Legal

# Install dependencies if you haven't already
npm install

# Start the Vite development server
npm run dev
```

Once the development server is running, the application will typically be accessible at `http://localhost:5173`.

### Dynamic Branding
To view the Torrey Pines Law branding, append one of the valid identifiers (`torreypineslaw`, `torreypineslawgroup`, `torreypinesconsulting`, `tpl`, `tpc`, `legal`) to the URL as a query parameter. For example:
- `http://localhost:5173/?legal`
- `http://localhost:5173/?client=tpl`

If no valid identifier is provided, the application will default to a generic "Placeholder Law Group" branding.