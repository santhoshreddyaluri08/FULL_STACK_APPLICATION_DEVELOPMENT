package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EmployeeController {

    @GetMapping("/employee")
    @ResponseBody
    public String getEmployee() {
        return "Employee Details: ID=1, Name=Alice";
    }
}