# InboxIntel 📧✨

InboxIntel is a powerful cold outreach automation tool designed to help users craft, send, and optimize their email campaigns. Built on a modern, serverless stack, it leverages AI to enhance email content and provides analytics to track campaign effectiveness.

**Live Demo:** [**insert deployed link here**]

---

## 🌟 Core Features

-   **Campaign Management:** Create and manage distinct outreach campaigns with specific goals and audiences.
-   **AI-Powered Email Generation:** Utilize OpenAI (GPT-4) to draft compelling cold emails or improve existing ones.
-   **Gmail Integration:** Securely connect your Gmail account via OAuth to send emails directly from your own address.
-   **Automated Reply Tracking:** A background service automatically polls for replies and updates the status of your emails.
-   **Performance Analytics:** View key metrics for your campaigns, including emails sent, replies received, and reply rates.
-   **Lead Management:** Upload and manage lists of leads for each campaign.

## 🛠️ Tech Stack

| Component      | Technology                                    |
| -------------- | --------------------------------------------- |
| **Frontend**   | Vite, Tailwind CSS, Shadcn UI |
| **Backend**    | Supabase (Auth, PostgreSQL, Edge Functions)   |
| **Email API**  | Gmail API (OAuth 2.0)                         |
| **AI/LLM**     | OpenAI API (GPT-4)                            |
| **Deployment** | Vercel & Supabase CLI    |

---

## 🏛️ Architecture & Development Process

We utilised bolt.new to create the base of our app. We supplemented this with use of the **HULA Framework** for prompt engineering. Our goal was to create a robust, scalable application using Supabase.

This systematic approach allowed for rapid development while ensuring the final product was well-architected and aligned with our vision.
---

## 🚀 Getting Started

### Prerequisites

-   Node.js & npm
-   Supabase Account & CLI (`npm install -g supabase`)
-   Vercel Account
-   Google Cloud Project with OAuth 2.0 credentials
-   OpenAI API Key
-   Comet Opik API Key

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone ** replace **
    cd inbox-intel
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Supabase locally:**
    ```bash
    supabase init
    supabase start
    ```

4.  **Configure environment variables:**
    Create a `.env.local` file in the `inbox-intel` directory and populate it with your keys from Supabase, Google, OpenAI, and Comet Opik.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

### Deployment

This project uses a hybrid deployment model:

1.  **Frontend & Database:** The Next.js frontend is deployed to Vercel.
2.  **Backend Logic:** Supabase Edge Functions are deployed from the local machine using the Supabase CLI:
    ```bash
    supabase functions deploy --project-ref <your-project-ref>
    ```

This process ensures a CI/CD-like workflow for the frontend while allowing direct deployment of the serverless backend functions.

---

## 🔮 Future Plans

-   Implement A/B testing for email variants.
-   Auto-generation of Leads
-   Integrate with other outreach channels like LinkedIn.
-   Build out a more advanced analytics dashboard.

---