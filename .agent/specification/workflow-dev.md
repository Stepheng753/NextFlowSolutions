# N8N Workflow Developer Specification

## Purpose
This document serves as the primary specification and pattern guide for creating N8N workflows in the NextFlowLegal ecosystem. Based on an analysis of existing workflows via `n8n-mcp`, this guide explains how legal-tech automations are constructed, what components they use, and enforces architectural standards for future development.

## Common Workflows & Their Purpose
Most of the workflows fall into the following categories:

1. **Intake & Onboarding (e.g., Clio Intake)**
   - **Purpose:** Automate the creation of clients, matters, and document folders when a new intake occurs.
   - **Key Integrations:** Clio API (Contacts, Matters), AWS S3 (Document storage), Google Drive (Folders).
   - **Flow:** Receives webhook -> Gets input/forms -> Creates Contacts/Matters in Clio -> Creates folders -> Uploads to AWS -> Responds to webhook.

2. **Legal & Document Analysis (e.g., Patentability Analysis, Medical Contradiction)**
   - **Purpose:** Analyze uploaded legal or medical documents using LLMs to extract information, find contradictions, or assess patentability.
   - **Key Integrations:** Google Docs (Prompt storage), Google Gemini / Perplexity (LLM processing), File extraction tools.
   - **Flow:** Receives webhook -> Switches based on input -> Extracts file content -> Formats via Code/Set nodes -> Fetches Prompt from Google Docs -> Runs LLM -> Responds to webhook.

3. **Financial Operations (e.g., Reconciliate Bills)**
   - **Purpose:** Process billing documents and convert them to structured formats (CSV, JSON) for reconciliation.
   - **Key Integrations:** LLMs for data extraction, Code nodes for data transformation.

## Standard Workflow Architecture

A well-architected standard legal workflow follows a distinct pipeline pattern:

### 1. Trigger & Intake
- **`Webhook` Node:** The entry point for frontend integrations. Almost always configured to expect a synchronous response.
- **`Switch` Node:** Used immediately after the webhook to handle different input types (e.g., distinguishing between a text payload vs. a binary file upload).
- **`Extract from File` Node:** When processing documents, binary data is extracted and converted into text.

### 2. Data Preparation
- **`Code` (JavaScript) Node:** Used to parse, clean, or structure incoming JSON or extracted text.
- **`Set` Node (Edit Fields):** Assigns variables and structures the payload before passing it to prompts or APIs.

### 3. Prompt Management & LLM Execution
- **`Google Docs` Node:** Prompts are NOT hardcoded in the workflow. They are fetched dynamically from Google Docs (e.g., "Prompt - Medical Contradiction", "Prompt - Patentability Analysis").
- **`Google Gemini` / `Perplexity` Nodes:** The LLM receives the dynamic prompt and the structured data to perform analysis, categorization, or summarization.

### 4. Third-Party Actions (APIs)
- **`HTTP Request` Node:** Used for standard API interactions (e.g., Clio API, AWS). Actions like "Get Matter Folder Id", "Create Contact", or "Upload to AWS" are chained sequentially.

### 5. Final Response
- **`Respond to Webhook` Node:** Crucial for frontend integrations. This node ensures that the final processed data is returned to the frontend synchronously with a `200 OK` status and the necessary payload.

## Required Development Standards

When developing new workflows, act as the **N8N Workflow Creator** and follow these strict rules:

1. **Synchronous Webhooks:** Webhooks linked to the frontend must return synchronous responses unless explicitly commanded otherwise. Avoid asynchronous polling loops. Ensure the `Respond to Webhook` node is the terminal step.
2. **Dynamic Prompts:** Never hardcode large LLM prompts in nodes. Fetch them using Google Docs or another external source to decouple prompt engineering from workflow structure.
3. **Data Privacy:** NEVER use live PII or real client data during development. Rely entirely on mocked legal data.
4. **Resilience & Error Handling:** Automatically implement a standardized error-handling pattern for every new workflow. Inject an `Error Trigger` node that routes failures to an alerting system (e.g., Slack, Email, or a logging database) to ensure resilience.
5. **Folder Organization:** All legal workflows must belong in the `Nextflow - Legal Folder` to maintain environment consistency.
6. **Overwrite Protection:** NEVER overwrite an existing workflow without explicit user approval.

## Handoff & Deployment
After constructing a workflow using `n8n-mcp`:
1. Validate all connections and verify that mocked data produces the expected output.
2. Summarize the webhook URLs and required environment variables in standard markdown code blocks.
3. Ping the Orchestrator with a concise, bulleted handoff summary.
