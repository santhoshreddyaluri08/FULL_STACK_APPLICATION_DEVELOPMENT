package com.example.task11.controller;

import com.example.task11.model.Student;
import com.example.task11.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    // ✅ Create Student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }

    // ✅ Get All Students
    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    // ✅ Filter by Department
    @GetMapping("/department/{dept}")
    public List<Student> getByDepartment(@PathVariable String dept) {
        return service.getByDepartment(dept);
    }

    // ✅ Filter by Age
    @GetMapping("/age/{age}")
    public List<Student> getByAge(@PathVariable int age) {
        return service.getByAge(age);
    }

    // ✅ Pagination + Sorting
    @GetMapping("/page")
    public Page<Student> getStudentsWithPagination(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String sortBy) {

        return service.getStudentsWithPagination(page, size, sortBy);
    }

    // ✅ Pagination + Filter
    @GetMapping("/department")
    public Page<Student> getByDepartmentWithPagination(
            @RequestParam String dept,
            @RequestParam int page,
            @RequestParam int size) {

        return service.getByDepartmentWithPagination(dept, page, size);
    }
}