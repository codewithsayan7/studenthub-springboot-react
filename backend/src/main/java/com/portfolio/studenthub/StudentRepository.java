package com.portfolio.studenthub;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String name,
            String email
    );

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);
}
