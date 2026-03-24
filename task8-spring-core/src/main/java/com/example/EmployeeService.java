package com.example;

import org.springframework.stereotype.Component;

@Component
public class EmployeeService {

    public Employee getEmployee1() {
        return new Employee(1, "Alice");
    }

    public Employee getEmployee2() {
        return new Employee(2, "Bob");
    }
}