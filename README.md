# StudentHub

StudentHub is a simple student management app built with React and Spring Boot. I made it to practise building a frontend, connecting it to a REST API, and saving data in a database.

## Features

- Add, view, edit and delete student records
- Search students by name or email
- Validate student details and prevent duplicate email addresses (case-insensitive)
- Show a small summary calculated by the database

## Tech used

- Java 21
- Spring Boot
- React and Vite
- Spring Data JPA
- PostgreSQL
- Docker Compose

## Run the project

You need Git and Docker installed.

```bash
git clone https://github.com/codewithsayan7/studenthub-springboot-react.git
cd studenthub-springboot-react
docker compose up --build
```

Then open:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Students API: http://localhost:8080/api/students

To stop the containers:

```bash
docker compose down
```

## Notes

Student names and departments are trimmed before saving, and email addresses are stored in lowercase. The summary endpoint uses database aggregate queries instead of loading every student record into the application. Docker Compose waits for PostgreSQL to become healthy before starting the backend.

## Project folders

- `backend/` – Spring Boot API and tests
- `frontend/` – React application
- `screenshots/` – screenshots

## Screenshot

![StudentHub dashboard](screenshots/dashboard.jpeg)

This is a learning project. It does not currently include login, user roles or production deployment.

## Author

Sayan Banerjee – https://github.com/codewithsayan7
