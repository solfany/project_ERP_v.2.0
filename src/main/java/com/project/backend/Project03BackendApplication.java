package com.project.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.project.backend.entity")
public class Project03BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(Project03BackendApplication.class, args);
    }

}
