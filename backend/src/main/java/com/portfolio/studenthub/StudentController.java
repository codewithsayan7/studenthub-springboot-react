package com.portfolio.studenthub;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.*;
@RestController @RequestMapping("/api/students")
public class StudentController {
 private final StudentService service;
 public StudentController(StudentService service){this.service=service;}
 @GetMapping public List<Student> all(@RequestParam(required=false) String q){return service.all(q);}
 @GetMapping("/{id}") public Student get(@PathVariable Long id){return service.get(id);}
 @PostMapping public Student create(@Valid @RequestBody Student s){return service.create(s);}
 @PutMapping("/{id}") public Student update(@PathVariable Long id,@Valid @RequestBody Student s){return service.update(id,s);}
 @DeleteMapping("/{id}") public void delete(@PathVariable Long id){service.delete(id);}
 @GetMapping("/stats") public Map<String,Object> stats(){return Map.of("total",service.all(null).size(),"averageCgpa",service.all(null).stream().mapToDouble(Student::getCgpa).average().orElse(0));}
}
