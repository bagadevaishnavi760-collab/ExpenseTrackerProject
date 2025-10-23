package com.example.expensetracker.config;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
@Component
public class FirebaseInitializer {
    @PostConstruct
    public void init() {
        try {
            FileInputStream serviceAccount =
                new FileInputStream("src/main/resources/firebase.json");

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

            System.out.println("Firebase Initialized Successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}