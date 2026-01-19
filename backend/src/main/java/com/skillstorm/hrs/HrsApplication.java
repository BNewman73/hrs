package com.skillstorm.hrs;

import java.util.TimeZone;

import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class HrsApplication {

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		new SpringApplicationBuilder(HrsApplication.class)
				.web(WebApplicationType.SERVLET)
				.run(args);
	}
}