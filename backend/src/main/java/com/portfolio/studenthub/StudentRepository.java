package com.portfolio.studenthub;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface StudentRepository extends JpaRepository<Student,Long> {
 List<Student> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name,String email);
 boolean existsByEmail(String email);
}
