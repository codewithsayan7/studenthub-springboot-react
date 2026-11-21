package com.sayan.studenthub;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> all(@RequestParam(required = false) String q) {
        return service.all(q);
    }

    @GetMapping("/{id}")
    public Student get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    public Student create(@Valid @RequestBody Student student) {
        return service.create(student);
    }

    @PutMapping("/{id}")
    public Student update(
            @PathVariable Long id,
            @Valid @RequestBody Student student
    ) {
        return service.update(id, student);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return Map.of(
                "total", service.totalStudents(),
                "averageCgpa", service.averageCgpa()
        );
    }
}