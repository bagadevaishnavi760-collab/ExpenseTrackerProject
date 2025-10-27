
    package com.example.expensetracker;

    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    
    import java.util.HashMap;
    import java.util.Map;
    
    @RestController
    @RequestMapping("/api/auth")
    @CrossOrigin(origins = "*")
    public class AuthController {
    
        // Temporary hardcoded user for testing
        private static final String DEMO_EMAIL = "admin@example.com";
        private static final String DEMO_PASSWORD = "admin123";
    
        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
            String email = credentials.get("email");
            String password = credentials.get("password");
            
            System.out.println("Login attempt - Email: " + email + ", Password: " + password);
            System.out.println("Expected - Email: " + DEMO_EMAIL + ", Password: " + DEMO_PASSWORD);
    
            if (DEMO_EMAIL.equals(email) && DEMO_PASSWORD.equals(password)) {
                System.out.println("Login successful!");
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("token", "mock-jwt-token-12345"); // placeholder token
                return ResponseEntity.ok(response);
            } else {
                System.out.println("Login failed - credentials don't match");
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }
    }
    
