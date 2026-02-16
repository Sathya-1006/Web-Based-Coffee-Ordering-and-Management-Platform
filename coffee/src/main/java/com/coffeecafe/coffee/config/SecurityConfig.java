package com.coffeecafe.coffee.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                // Use the CORS configuration defined in WebConfig
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        // Allow public access to registration, login, admin APIs, and uploaded files
                        .requestMatchers("/users/register", "/users/login", "/api/admin/**", "/uploads/**", "/users/approve/**").permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}