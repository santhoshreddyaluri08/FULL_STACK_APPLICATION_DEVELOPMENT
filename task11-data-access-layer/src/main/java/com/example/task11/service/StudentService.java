package com.example.task11.service;

import com.example.task11.model.Student;
import com.example.task11.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    // ✅ Save Student
    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    // ✅ Get All Students
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // ✅ Filter by Department
    public List<Student> getByDepartment(String department) {
        return repository.findByDepartment(department);
    }

    // ✅ Filter by Age
    public List<Student> getByAge(int age) {
        return repository.findByAgeGreaterThan(age);
    }

    // ✅ Pagination + Sorting
    public Page<Student> getStudentsWithPagination(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return repository.findAll(pageable);
    }

    // ✅ Pagination + Filter
    public Page<Student> getByDepartmentWithPagination(String department, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findByDepartment(department, pageable);
    }
}