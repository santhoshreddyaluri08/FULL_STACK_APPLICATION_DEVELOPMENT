package com.example.task11.repository;

import com.example.task11.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // 🔍 Find by Department
    List<Student> findByDepartment(String department);

    // 🔍 Find by Age greater than
    List<Student> findByAgeGreaterThan(int age);

    // 🔍 Pagination + Department
    Page<Student> findByDepartment(String department, Pageable pageable);

}