package com.project.backend.config;

import java.security.SecureRandom;
import java.util.Base64;

public class SecretGenerator {
    public static void main(String[] args) {
        generateSecretKey();
    }

    public static void generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[64]; // 32 bytes = 256 bits
        random.nextBytes(bytes);
        String secretKey = Base64.getEncoder().encodeToString(bytes);
        System.out.println("Generated Secret Key: " + secretKey);
    }
}