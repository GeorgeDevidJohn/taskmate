# 🏡 Neighborly – Requirement Specification Document

## 📘 Overview

**Project Name:** Neighborly  
**Purpose:**  
A hyper-local community platform that connects neighbors within the same postal code to **request** and **offer** help for small tasks or services (e.g., grocery pickup, snow shoveling, tutoring, pet sitting).  
The platform is **non-monetary** — built on **trust**, **volunteering**, and **community collaboration**.

---

## 🎯 Objectives

- Simplify how TaskMaster connect and assist each other.
- Build a safe, verified, and real-time communication system.
- Enable local discovery of tasks and helpers.
- Foster community engagement without any financial exchange.

---

## 👥 User Roles

| Role | Description | Example Use |
|------|--------------|--------------|
| **Helper** | Offers services or assistance nearby. | John offers to mow lawns. |
| **User (Task Poster)** | Requests help for a task. | Maria posts “Need help moving boxes.” |
| **Admin** | Manages the platform, users, and reports. | Admin verifies users, removes spam. |

---

## 🗺️ User Flow

1. User registers or signs in (email or Google).
2. Selects role — *Helper* or *Task Poster*.
3. Completes profile setup.
4. Task Poster: Creates and posts tasks.
5. Helper: Finds and accepts nearby tasks.
6. Users chat in real time to coordinate.
7. Task marked as completed.
8. Users leave reviews and ratings.

---

## 📄 Functional Requirements

### 1. Public Pages

| Page | Description | Core Features |
|------|--------------|----------------|
| **Landing Page** | Introduction and overview of platform. | CTA buttons (“Find Help”, “Offer Help”), postal code search, testimonials. |
| **About Page** | Platform mission and safety info. | Static content. |
| **Contact Page** | Support and feedback submission. | Email/contact form integration. |
| **Login / Signup** | Account creation and access. | Email/Password + Google Auth via Supabase. |

---

### 2. User Dashboard (Task Posters)

| Page | Description | Key Features |
|------|--------------|---------------|
| **Profile Setup** | Add name, photo, and postal code. | Google Maps API integration for location detection. |
| **Dashboard (Main)** | Overview of user’s tasks. | View active/completed tasks, task status. |
| **Post a Task** | Create and publish new task. | Title, description, category, date/time, image upload. |
| **My Tasks** | Manage existing tasks. | Edit/Delete, track task status. |
| **Messages / Chat** | Communicate with helpers. | Real-time chat via Supabase Realtime. |
| **Reviews** | Provide feedback. | Star + text reviews for helpers. |

---

### 3. Helper Dashboard

| Page | Description | Key Features |
|------|--------------|---------------|
| **Profile Setup** | Add skills, bio, and area of service. | ID verification upload (optional). |
| **Available Tasks Nearby** | View nearby open tasks. | Postal code filter (within 5km). |
| **My Accepted Tasks** | Manage accepted tasks. | Task status: “In Progress”, “Completed”. |
| **Messages / Chat** | Communicate with users. | Real-time updates. |
| **Reviews / Ratings** | View feedback from past tasks. | Display average rating. |

---

### 4. Admin Panel

| Section | Description | Features |
|----------|--------------|-----------|
| **User Management** | Manage helpers and task posters. | Verify/block users. |
| **Task Management** | Monitor posted tasks. | Remove or hide inappropriate tasks. |
| **Reports / Disputes** | Handle flagged content. | Admin action log. |
| **Analytics Dashboard** | View platform metrics. | Track active users, posted tasks, and community stats. |

---

## ⚙️ Core Functional Features

### 🔐 Authentication
- Email/password login or Google Auth (Supabase Auth).
- Role selection after signup.
- Password reset and session management (JWT).
- Profile verification and image uploads.

### 📍 Location & Matching
- Auto-detect postal code using Google Maps API.
- Filter tasks by same postal code or radius (up to 5 km).
- Helpers can set custom service range.

### 💬 Real-time Chat
- Built using **Supabase Realtime** or **Firebase**.
- Chat threads linked to task IDs.
- Push/email notifications.
- Block/report functionality.

### ⭐ Reviews & Ratings
- Users can rate each other after task completion.
- Average rating displayed on profiles.
- Reporting system for inappropriate reviews.

---

## 🚫 Excluded Features (Removed)
- No payment or monetary system (e.g., Stripe, escrow, commission).
- No subscription or monetization integration.
- No wallet or credit tracking.

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | Next.js / React with Tailwind CSS |
| **Backend** | Supabase (Auth, Database, Realtime, Storage) |
| **Database** | PostgreSQL (hosted on Supabase) |
| **API Integrations** | Google Maps API (for location/postal code) |
| **Notifications** | Email (Resend / SendGrid) + Supabase Realtime |
| **Hosting** | Vercel / Netlify |

---

## 🧩 Non-Functional Requirements

- **Performance:**  
  Pages load under 3 seconds on average connections.

- **Security:**  
  JWT session tokens, password hashing, profile moderation.

- **Scalability:**  
  Modular API endpoints and Supabase scalability.

- **Accessibility:**  
  WCAG 2.1 Level AA compliance; mobile-first design.

- **Maintainability:**  
  Component-based structure with reusable UI.

---

## 🚀 Roadmap

| Phase | Timeline | Deliverables |
|--------|-----------|--------------|
| **Phase 1: MVP** | Month 1–2 | Authentication, Profile setup, Task posting, Chat |
| **Phase 2: Enhancements** | Month 3–4 | Reviews, Admin panel, User reports |
| **Phase 3: Community Growth** | Month 5–6 | Analytics dashboard, Verification badges |
| **Phase 4: Future Add-ons** | TBD | Gamification (karma points, badges), event-based engagement |

---

## 🧰 Developer Notes

- Environment variables for Supabase and Google Maps API required.  
- Realtime chat should be modular for future mobile extension.  
- Codebase to follow ESLint + Prettier conventions.  
- Maintain a consistent design system with Tailwind components.

---

## 📎 Future Considerations

- Add **Karma Points System** for non-monetary contribution tracking.  
- Integrate **Community Bulletin Board** for local announcements.  
- Mobile App (React Native) sync using same Supabase backend.

---

**Document Version:** v1.0  
**Last Updated:** October 2025  
**Maintainer:** George Devid John Thekkineth
