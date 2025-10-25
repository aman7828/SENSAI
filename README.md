
## 🚀 Overview
SENSAI is a **Full Stack AI-powered Career Coaching Platform** that helps users with personalized career guidance, AI-based resume reviews, mock interview simulations, and custom learning roadmaps.  
Built with modern web technologies like **Next.js**, **Neon DB**, **Prisma**, **Tailwind CSS**, **Inngest**, and **Clerk** for authentication.

---

## 🧩 Features
- 💬 **AI-Powered Career Coach** – Personalized career advice and interview prep powered by Gemini API.  
- 📄 **Smart Resume Feedback** – Upload your resume and receive AI-based improvement suggestions.  
- 🎯 **Career Roadmap Generator** – Get custom skill-building roadmaps based on your career goals.  
- 🧑‍💻 **Mock Interview Simulations** – Practice with realistic AI-generated interview questions.  
- 🔐 **Authentication & Onboarding** – Secure user management with Clerk.  
- 💅 **Modern UI/UX** – Built with Tailwind CSS and Shadcn UI for a sleek, responsive interface.  
- ⚙️ **Serverless Functions** – Workflow automation using Inngest for scalable background processing.

---

## 🛠️ Tech Stack
| Category | Technologies |
|-----------|--------------|
| **Frontend** | Next.js, Tailwind CSS, Shadcn UI |
| **Backend** | Prisma, Inngest, Neon DB |
| **Auth** | Clerk |
| **AI Integration** | Gemini API |
| **Database** | Neon (PostgreSQL) |

---

## ⚙️ Environment Variables
Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=

