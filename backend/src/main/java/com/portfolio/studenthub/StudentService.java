package com.portfolio.studenthub;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
public class StudentService {
 private final StudentRepository repo;
 public StudentService(StudentRepository repo){this.repo=repo;}
 public List<Student> all(String q){return q==null||q.isBlank()?repo.findAll():repo.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(q,q);}
 public Student get(Long id){return repo.findById(id).orElseThrow(()->new NoSuchElementException("Student not found: "+id));}
 public Student create(Student s){if(repo.existsByEmail(s.getEmail()))throw new IllegalArgumentException("Email already exists");return repo.save(s);}
 public Student update(Long id,Student s){Student old=get(id);old.setName(s.getName());old.setEmail(s.getEmail());old.setDepartment(s.getDepartment());old.setSemester(s.getSemester());old.setCgpa(s.getCgpa());return repo.save(old);}
 public void delete(Long id){repo.delete(get(id));}
}
