package com.skillstorm.hrs.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/")
public class SecurityTestController {

    public SecurityTestController() {}
    
    @GetMapping()
    public String get() {
        return "Oauth login successful";
    }
    
}
