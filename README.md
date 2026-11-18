# StudentHub — Student Management System

A full-stack student management application built with **React**, **Spring Boot**, and **PostgreSQL**. The project demonstrates a REST API-backed workflow for managing student records through a web interface.

## Features

- Create, view, update, and delete student records
- Search students by name or email
- Track semester and CGPA information
- Validate student data
- Prevent duplicate email addresses
- Retrieve a student summary through the backend API

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Java 21, Spring Boot 3.4.5 |
| API | Spring Boot REST |
| Database | PostgreSQL |
| Containerization | Docker, Docker Compose |

## Architecture

The React frontend communicates with the Spring Boot REST API. The backend handles application logic and validation, and persists student records in PostgreSQL.

```text
React + Vite
     |
     | HTTP / REST
     v
Spring Boot REST API
     |
     | JPA
     v
 PostgreSQL
```

## Run Locally with Docker

### Prerequisites

- Docker Desktop
- Git

### Start the application

```bash
git clone https://github.com/codewithsayan7/studenthub-springboot-react.git
cd studenthub-springboot-react
docker compose up --build
```

### Access the application

| Service | URL |
|---|---|
| React frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| Students API | http://localhost:8080/api/students |

To stop the services:

```bash
docker compose down
```

This keeps the database volume. Use `docker compose down -v` only if you intentionally want to remove persisted database data.

## Project Structure

```text
studenthub-springboot-react/
├── backend/          # Spring Boot application and REST API
├── frontend/         # React + Vite user interface
├── docker-compose.yml
├── .gitignore
└── README.md
```

## What This Project Demonstrates

- Building and consuming REST APIs
- Implementing CRUD operations
- Connecting Spring Boot to PostgreSQL
- Applying server-side validation
- Developing a React frontend
- Running a multi-service application with Docker Compose

## Future Improvements

- Authentication and role-based authorization
- Pagination and advanced filtering
- Automated backend and frontend tests
- Production deployment and CI/CD

## Author

**Sayan Banerjee**

GitHub: [@codewithsayan7](https://github.com/codewithsayan7)
