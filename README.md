# StudentHub

StudentHub is a small student-record application I built to practise connecting a React interface to a Java REST API and a relational database.

The idea is straightforward: keep the common details for each student in one place, make records easy to find, and allow the user to add, update, or remove them without working directly in the database.

## What you can do

- Add a student with a name, email, department, semester, and CGPA.
- Browse the student directory.
- Search by name or email.
- Edit an existing record or remove it.
- View a summary of the number of students and their average CGPA through the stats endpoint.

The application validates incoming student data and prevents duplicate email addresses when creating records.

## Built with

- **Frontend:** React and Vite
- **Backend:** Java 21 and Spring Boot 3.4.5
- **Persistence:** Spring Data JPA and PostgreSQL
- **Validation:** Jakarta Bean Validation
- **Local environment:** Docker Compose

## How the pieces fit together

The React app sends HTTP requests to the Spring Boot API. The API validates the request, uses Spring Data JPA to read or write student records, and stores those records in PostgreSQL.

```text
React (Vite)
    |
    | HTTP / JSON
    v
Spring Boot REST API
    |
    | Spring Data JPA
    v
PostgreSQL
```

## Run it locally

You only need Git and Docker Desktop for the container-based setup.

```bash
git clone https://github.com/codewithsayan7/studenthub-springboot-react.git
cd studenthub-springboot-react
docker compose up --build
```

When the containers are ready, open:

| Service | Address |
|---|---|
| React app | http://localhost:5173 |
| Backend | http://localhost:8080 |
| Student records | http://localhost:8080/api/students |
| Student summary | http://localhost:8080/api/students/stats |

To stop the containers, run `docker compose down`. This does not remove the database volume. Only use `docker compose down -v` if you intentionally want to delete the persisted local database data.

## A few API examples

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/students` | List students |
| GET | `/api/students?q=maya` | Search by name or email |
| GET | `/api/students/{id}` | Get one student |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/{id}` | Update a student |
| DELETE | `/api/students/{id}` | Remove a student |
| GET | `/api/students/stats` | Get student count and average CGPA |

## Repository layout

```text
backend/       Spring Boot application and tests
frontend/      React application
screenshots/   Application screenshots
docker-compose.yml
```

## Current scope

This is a learning and portfolio project, not a production student information system. It currently focuses on basic student-record management. Authentication, role-based access, audit history, and production deployment hardening are not included.

I built it to get more practice with the full request path—from a form in React, through a Spring Boot controller and service, to a PostgreSQL record—and to have a project I can explain and improve over time.

## Screenshot

![StudentHub dashboard](screenshots/dashboard.jpeg)

## Author

**Sayan Banerjee** · [GitHub](https://github.com/codewithsayan7)
