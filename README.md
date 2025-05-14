# 🎨 InkSpiration 2.0

A creative productivity and community platform that helps artists, writers, and dreamers track their projects and share inspiration with others.

**Link to Project:** [HOSTED LINK](https://inkspiration-2-0.onrender.com/)

<!-- Screenshots (compact for readability) -->
<p align="center">
  <img src="https://github.com/CodingWCal/Inkspiration-2.0/blob/main/public/img/inkspiration-home-screenshot.png" width="450" alt="InkSpiration Home"/>
  <br/><em>Home Page</em>
</p>

<p align="center">
  <img src="https://github.com/CodingWCal/Inkspiration-2.0/blob/main/public/img/inkspiration-profile-screenshot.png" width="450" alt="InkSpiration Profile"/>
  <br/><em>Profile Page</em>
</p>

<p align="center">
  <img src="https://github.com/CodingWCal/Inkspiration-2.0/blob/main/public/img/inkspiration-feed-screenshot.png" width="450" alt="InkSpiration Feed"/>
  <br/><em>Community Feed</em>
</p>

<p align="center">
  <img src="https://github.com/CodingWCal/Inkspiration-2.0/blob/main/public/img/inkspiration-project-post-screenshot.png" width="450" alt="Project Post"/>
  <br/><em>Project Post Detail</em>
</p>

---

## About the Project:

InkSpiration was built to support creatives through the entire lifecycle of their work. From fruition of ideas to final draft. Users can log in, upload project images, set creative goals, and tag each entry with moods, themes, and palettes. It’s a space that values process over perfection.

Every part of this app was designed to feel calming, intuitive, and community-oriented. To feel like an online studio where creative people feel supported, not judged.

---

## How It's Made:

- HTML5 + TailwindCSS
- JavaScript (ES6)
- EJS Templating Engine
- Node.js + Express
- MongoDB + Mongoose (database)
- Passport.js (authentication)
- Cloudinary + Multer (image uploads & middleware)
- Render (deployment)

---

## Features:

- Full CRUD for projects and comments
- Image uploads via Cloudinary (GIF, JPG, PNG)
- Public/private project toggles
- Community Gallery Feed Page for Creatives to share public projects
- Likes on projects and comments
- User-specific profile pages and a global feed
- Optional creative stages, themes, moods, and tags
- Binary file upload support

---

## Optimizations in Progress:

- General to-do list feature for users
- Per-project to-do/task breakdown
- Integrated calendar functionality for to-do list tasks
- Pomodoro timer and lofi music player on future Productivity Page
- Filtering by medium, mood, or stage
- Improved image resizing and grid layout
- Implementing drag-and-drop project reordering for dashboard UX
- Responsive design for all screen sizes

---

## Lessons Learned:

InkSpiration taught me how to think like a fullstack engineer. Looking at how models, routes, and controllers interact, and how to build systems that are both flexible and secure. Implementing file uploads with Cloudinary was a new challenge, and one I’m proud to have solved.

More than anything, this reminded me why I love tech: to build meaningful tools that help people express themselves and connect with others.

---

## Installation:

1. Clone the repo
2. run npm install

---

## Things to add:

- Create a `.env` file in config folder and add following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

## Usage:

1. run npm start
2. Navigate to http://localhost:2121

---

## Inspiration & Credit:
- Binary upload & Cloudinary integration adapted from [binary-upload-boom](https://github.com/100devs/binary-upload-boom)
- Auth flow inspired by Scotch.io's Passport tutorial
