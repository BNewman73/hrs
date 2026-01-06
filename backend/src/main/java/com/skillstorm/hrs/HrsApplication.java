package com.skillstorm.hrs;

import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class HrsApplication {

	public static void main(String[] args) {
		new SpringApplicationBuilder(HrsApplication.class)
				.web(WebApplicationType.SERVLET)
				.run(args);
	}
}
