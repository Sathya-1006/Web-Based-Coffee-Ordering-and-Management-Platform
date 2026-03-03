package com.coffeecafe.coffee.dto;

public class ApiResponse {
    private String message;
    private boolean success;

    // This constructor handles one argument
    public ApiResponse(String message) {
        this.message = message;
        this.success = true;
    }

    // This constructor handles two arguments (Fixes the red error!)
    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}