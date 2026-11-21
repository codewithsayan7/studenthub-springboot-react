package com.sayan.studenthub;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository repository;

    @InjectMocks
    private StudentService service;

    @Test
    void createTrimsFieldsAndNormalisesEmailBeforeCheckingDuplicates() {
        Student student = new Student(
                "  Maya Sen  ",
                "  MAYA.SEN@example.com  ",
                "  Computer Science  ",
                3,
                8.2
        );
        when(repository.existsByEmail("maya.sen@example.com")).thenReturn(false);
        when(repository.save(student)).thenReturn(student);

        Student saved = service.create(student);

        assertEquals("Maya Sen", saved.getName());
        assertEquals("maya.sen@example.com", saved.getEmail());
        assertEquals("Computer Science", saved.getDepartment());
        verify(repository).existsByEmail("maya.sen@example.com");
        verify(repository).save(student);
    }

    @Test
    void createRejectsAnExistingEmailRegardlessOfInputCase() {
        Student student = new Student(
                "Rohan Das",
                "rohan.das@example.com",
                "Computer Science",
                3,
                8.2
        );
        when(repository.existsByEmail("rohan.das@example.com")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> service.create(student));
        verify(repository, never()).save(any());
    }
}