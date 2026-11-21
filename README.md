# StudentHub

StudentHub is a student-record manager built with a Spring Boot REST API and a React interface. It supports the everyday tasks of maintaining a small academic directory.

## Main workflows

- Create and update student records
- Search by student name or email
- Remove records from the directory
- Validate submitted details and prevent duplicate email addresses
- View the total student count and average CGPA

## Architecture

The backend separates HTTP endpoints, business rules, and persistence through a controller-service-repository structure. Student names and departments are trimmed before saving, and email addresses are normalised to lowercase.

The statistics endpoint uses database-side aggregate queries for the record count and average CGPA. It returns the summary without loading the full student table into the application.

## Tools and libraries

- Java 21
- Spring Boot, Spring Data JPA, and Bean Validation
- PostgreSQL
- React and Vite
- Docker Compose
- H2 for automated tests

## Start the application

Install Git and Docker, then run:

```bash
git clone https://github.com/codewithsayan7/studenthub-springboot-react.git
cd studenthub-springboot-react
docker compose up --build
```

Open the interface and API at:

- Web app: http://localhost:5173
- REST API: http://localhost:8080
- Student records: http://localhost:8080/api/students

To stop the services, run `docker compose down`.

## Source layout

```text
backend/     Spring Boot API, persistence layer, and tests
frontend/    React application
screenshots/ Dashboard image
```

![StudentHub dashboard](screenshots/dashboard.jpeg)

## Maintainer

Sayan Banerjee - [GitHub](https://github.com/codewithsayan7)
