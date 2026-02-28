package com.coffeecafe.coffee.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Method for Forgot Password
    public void sendResetLink(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Bookafé - Password Reset Request");

        // This link takes them to the ResetPassword page
        String resetLink = "http://localhost:5173/reset-password?email=" + toEmail;

        message.setText("We received a request to reset your password. Click below:\n\n" + resetLink);
        mailSender.send(message);
    }

    // Your existing method for first-time login likely looks like this:
    public void sendFirstLoginLink(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Welcome to Bookafé - Set Your Password");
        String link = "http://localhost:5173/set-password?email=" + toEmail;
        message.setText("Your account is approved! Set your password here: " + link);
        mailSender.send(message);
    }
}