package com.aurahealth.core.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

        @Bean
        public CommandLineRunner initData() {
                return args -> {
                        System.out.println("Data Initializer disabled for Clerk Migration.");
                };
        }
}
