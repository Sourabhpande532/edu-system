# School Management System

---

A MERN Stack School Management System to manage students, classes, and academic data with full CRUD operations and Redux Toolkit for state management.  
Built with React (frontend), Node.js/Express (backend), and MongoDB (database).

---

## Demo Link

- Live Demo: [Add Live URL Here](https://edu-system-a1pf.vercel.app/)

---

## Quick Start

- Clone the repo  
  git clone [Add GitHub Repo URL Here](https://github.com/Sourabhpande532/edu-system)
- Navigate to project  
  cd edu-system
- Install dependencies  
  npm install
- Run the app  
  npm start

---

## Technologies

- React Js
- React Router
- Redux Toolkit
- Node Js
- Express Js
- MongoDB
- REST APIs

---

## Features

### Dashboard

- Overview of students and basic insights

### Student Management

- Add, view, update, and delete students
- Manage data like name, age, grade, and gender

### Student Detail View

- View individual student details
- Edit and delete student using ID

### Class Management

- Organize and manage students by class

### Async Data Handling

- Fetch and manage data using Redux Thunk
- Handle loading and error states

### Notifications

- Toast messages for success and error

### Responsive UI

- Works on mobile, tablet, and desktop

---

## API Reference

### GET /students

- Get all students

### POST /students

- Add new student

### PUT /students/:id

- Update student

### DELETE /students/:id

- Delete student

---

## Environment Setup

**Backend(/server/.env)**

```
# Server
PORT=4001
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/anvaya

# CORS
CLIENT_URL=http://localhost:3000

```

**Frontend**

```
# API Base URL
REACT_APP_BASE_URL=http://localhost:4001/

```

---

## Contact

- Email: sourabhpande43@gmail.com
