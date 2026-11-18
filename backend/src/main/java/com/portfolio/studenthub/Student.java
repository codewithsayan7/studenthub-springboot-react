package com.portfolio.studenthub;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
@Entity @Table(name="students")
public class Student {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Column(nullable=false) private String name;
 @Email @NotBlank @Column(nullable=false, unique=true) private String email;
 @NotBlank private String department;
 @Min(1) @Max(8) private int semester;
 @DecimalMin("0.0") @DecimalMax("10.0") private double cgpa;
 public Student() {}
 public Student(String name,String email,String department,int semester,double cgpa){this.name=name;this.email=email;this.department=department;this.semester=semester;this.cgpa=cgpa;}
 public Long getId(){return id;} public String getName(){return name;} public void setName(String v){name=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getDepartment(){return department;} public void setDepartment(String v){department=v;}
 public int getSemester(){return semester;} public void setSemester(int v){semester=v;}
 public double getCgpa(){return cgpa;} public void setCgpa(double v){cgpa=v;}
}
