# Freelance Marketplace Client

This is the frontend client for the **Freelance Marketplace** project, built with **React.js**. It interacts with the backend server to allow users to browse jobs, manage tasks, submit reviews, and update profiles.


## 🌐 Live Demo

- **Frontend (Netlify)**: splendorous-pixie-703dd8.netlify.app

---

## Features

- Browse all available jobs
- Add new jobs (for clients)
- Accept jobs (for freelancers)
- Manage personal tasks and assigned jobs
- Submit and view reviews
- User authentication (Firebase Auth)
- Update user profile (name and image)
- Responsive design with Tailwind CSS
- Animations with Framer Motion
- Reusable components and custom hooks

---

## Tech Stack

- React.js (Functional Components & Hooks)
- Firebase Authentication
- Axios for API requests
- Tailwind CSS
- Framer Motion
- React Icons

---

## API Endpoints

### Jobs
- `GET /AllJobs` — Fetch all jobs
- `POST /addjobs` — Add a new job
- `GET /AllJobs/:id` — Get a single job by ID
- `PUT /AllJobs/:id/accept` — Accept a job
- `GET /my-add-job/:email` — Get jobs added by a specific user
- `DELETE /my-added-jobs/:id` — Delete a job
- `PUT /my-added-jobs/:id/accept` — Update job details

### Users
- `PUT /users/:email` — Create or update a user (upsert)
- `GET /users/:email` — Get a user by email (excludes password)
- `PUT /update-profile/:email` — Update a user's profile (name, image)

### Tasks
- `POST /my-task-collection` — Assign a task to a freelancer
- `GET /my-task-collection/:email` — Get tasks assigned to a freelancer
- `DELETE /my-task/:id` — Delete a task

### Reviews
- `POST /reviews` — Submit a review
- `GET /getTopReviews` — Fetch all reviews
