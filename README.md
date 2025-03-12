# EduForge AI 🎓

## Overview 🌟

EduForge AI is an advanced platform designed to assist users in building and managing online educational content seamlessly. With the power of AI, specifically through integration with the innovative Gemini API, this tool lets educators create, edit, and deliver course materials. Powered by Next.js, Firebase for secure file storage, and Clerk for user authentication, EduForge AI makes the learning experience both interactive and efficient for all.

## Core Features ✨

### User Registration and Authentication 🔐

- Secure user authentication with Clerk.
- Easy sign-up, login, and user profile management.

### Course Generation and Management 📚

- Users can craft personalized courses easily.
- AI tools assist in generating dynamic content for courses.
- Customizable templates streamline the course-building process.

### Cloud-based File Storage 📂

- All media files, documents, and courses are securely stored in Firebase.
- Reliable and scalable storage infrastructure ensures smooth user experiences.
- Easy access and management of course resources and materials.

### AI-Driven Content Creation 🤖

- Powered by the Gemini API for automatic course material generation.
- Dynamic and interactive course content.
- Facilitates immersive learning experiences for users.

### Mobile-Optimized User Interface 📱

- Fully responsive design tailored for both mobile and desktop platforms.
- Ensures fluid navigation across all devices.
- User-friendly interface adapts to varying screen sizes.

### Performance and Progress Tracking 📊

- Real-time tracking of course progress for each user.
- Displays learning achievements and course completion rates.


## Key Technologies 🌐

| **Technology**       | **Description**                                                                 |
|----------------------|---------------------------------------------------------------------------------|
| Next.js 14.x         | A powerful framework for building fast, scalable web applications.               |
| Clerk                | Manages secure user authentication and profiles.                                |
| Gemini API           | AI-driven content generation to enhance course material.                        |
| Firebase             | Cloud-based file storage and real-time database management.                     |
| Tailwind CSS         | A modern CSS framework that simplifies styling with utility-first classes.       |
| React Icons          | A collection of customizable icons for React applications.                      |
| Vercel               | A cloud platform for deploying fast and scalable web applications.              |

## Installation Guide 🛠️

### Step 1: Clone the Repository

```bash
git clone https://github.com/xmadmaxdx/EduForge.git
```

### Step 2: Navigate to the Project Directory

```bash
cd EduForge
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Add Environment Variables

Create a `.env` file in the root directory and include the following keys:

```env
NEXT_PUBLIC_GEMINI_API_KEY=<your-key>
NEXT_PUBLIC_YOUTUBE_API_KEY=<your-key>
NEXT_PUBLIC_DB_CONNECTION_STRING=<your-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-key>
CLERK_SECRET_KEY=<your-key>
NEXT_PUBLIC_FIREBASE_API_KEY=<your-key>
```

### Step 5: Run the Development Server

```bash
npm run dev
```

## Live Demo 🌍

Visit the live platform at: [EduForge Demo](https://eduforge.vercel.app/)

## Contributing 🤝

We welcome your contributions to make EduForge even better! Here's how you can get started:

1. **Fork the Repository**  
   Click on the "Fork" button at the top right of the repository page to create your own copy.

2. **Clone Your Fork**  
   Use the following command to clone your fork:

   ```bash
   git clone https://github.com/<your-username>/EduForge.git
   ```

3. **Create a Feature Branch**  
   Create a new branch for your changes:

   ```bash
   git checkout -b your-feature-name
   ```

4. **Make Your Changes**  
   Modify the codebase to add your feature or fix the bug.

5. **Commit Your Changes**  
   Use the following commands to commit your updates:

   ```bash
   git add .
   git commit -m "Descriptive message about the changes"
   ```

6. **Push Changes**  
   Push your branch to your fork:

   ```bash
   git push origin your-feature-name
   ```

7. **Create a Pull Request**  
   Submit a pull request from your branch to the original repository.

8. **Code Review**  
   Your pull request will be reviewed by the maintainers, so be open to any feedback or changes.

9. **Merge**  
   Once your changes are approved, your pull request will be merged into the main branch.
