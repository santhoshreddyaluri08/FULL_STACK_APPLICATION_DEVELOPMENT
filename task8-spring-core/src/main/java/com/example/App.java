package com.example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

    public static void main(String[] args) {

        ApplicationContext context =
                new AnnotationConfigApplicationContext("com.example");

        EmployeeService service = context.getBean(EmployeeService.class);

        service.getEmployee1().display();
        service.getEmployee2().display();
    }
}