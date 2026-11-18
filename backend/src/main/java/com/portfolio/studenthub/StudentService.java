package com.portfolio.studenthub;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> all(String query) {
        if (query == null || query.isBlank()) {
            return repository.findAll();
        }

        return repository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                query.trim(),
                query.trim()
        );
    }

    public Student get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Student not found: " + id));
    }

    public Student create(Student student) {
        String email = student.getEmail().trim();

        if (repository.existsByEmail(email)) {
            throw new IllegalArgumentException("A student with this email already exists.");
        }

        student.setName(student.getName().trim());
        student.setEmail(email.toLowerCase());
        student.setDepartment(student.getDepartment().trim());

        return repository.save(student);
    }

    public Student update(Long id, Student updatedStudent) {
        Student existingStudent = get(id);
        String email = updatedStudent.getEmail().trim();

        if (repository.existsByEmailAndIdNot(email, id)) {
            throw new IllegalArgumentException("A student with this email already exists.");
        }

        existingStudent.setName(updatedStudent.getName().trim());
        existingStudent.setEmail(email.toLowerCase());
        existingStudent.setDepartment(updatedStudent.getDepartment().trim());
        existingStudent.setSemester(updatedStudent.getSemester());
        existingStudent.setCgpa(updatedStudent.getCgpa());

        return repository.save(existingStudent);
    }

    public void delete(Long id) {
        repository.delete(get(id));
    }
}
