# Workflow Ideation: Nextflow Legal

## 1. Current State Analysis

Based on an analysis of the existing n8n workflows (e.g., "Patentability Analysis", "Clio Intake", "Reconciliate Bills", "Medical Contradiction"), the creation style and frequent API combinations are characterized by:

- **Complex Orchestration:** Workflows often involve complex sequential logic using node types like `Switch`, `Code` (for custom JavaScript processing like mammoth.js docx extraction), and raw `HTTP Request` nodes to interact deeply with specialized APIs (e.g., Clio CRM OAuth2 endpoints).
- **AI-Driven Data Processing:** Heavy reliance on advanced AI models for both analytical and generative tasks. Models like Perplexity (`sonar-deep-research`) are used for deep reasoning/research (e.g., patentability analysis), while Gemini (`gemini-2.5-flash`, `gemini-3-pro-preview`) is used for summarization, description generation, and HTML formatting.
- **Dynamic Prompts:** Prompts are often dynamically sourced from Google Docs, allowing for easy updates to the AI's instructions without altering the workflow structure itself.
- **File Handling:** Workflows frequently handle document ingestions (PDFs/DOCX) via Webhooks, parse the text, process it through AI, and upload the results back to AWS/Clio.
- **Frequent API Combinations:**
  - `Webhook` -> `Google Docs` (Fetch Prompt) -> `Perplexity/Gemini` -> `Webhook Response` (HTML)
  - `Webhook` -> `Clio` (Contact/Matter/Folder/Document creation) -> `AWS/S3` (File upload) -> `Gemini` (Summarization/Metadata)

## 2. Available APIs & Target Audience

- **Target Audience:** Small law firms needing to automate administrative overhead, case management, and client intake.
- **Available APIs:** Clio, USPTO, Google Suite, Microsoft, Twilio, Blotato.

## 3. Ideation Guidelines

To create novel, high-value workflows, follow these guidelines:
1. **Focus on Unbillable Administrative Tasks:** Automate tasks that consume paralegal and attorney time but cannot be billed (e.g., chasing invoices, organizing intake files, scheduling).
2. **Combine CRM with Communication:** Use Clio as the source of truth, and leverage Twilio/Microsoft for automated client touchpoints.
3. **Keep AI Grounded:** When using AI for legal reasoning (like USPTO checks), ensure the output is structured as a draft or alert for attorney review, rather than a final client-facing legal opinion.