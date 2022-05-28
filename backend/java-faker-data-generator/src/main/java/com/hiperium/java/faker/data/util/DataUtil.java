package com.hiperium.java.faker.data.util;

import com.github.javafaker.Faker;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

/**
 * @author Andres Solorzano
 */
public final class DataUtil {

    private static final char[] hexArray = "JavaFakerDynamoDB".toCharArray();

    public static final Faker FAKER = new Faker();

    private DataUtil() {
        // Nothing to implement.
    }

    public static Instant getActualDateTime() {
        LocalDateTime localDateTime = LocalDateTime.now();
        return localDateTime.toInstant(ZoneOffset.UTC);
    }

    public static String generateUUID(int maxLength) {
        MessageDigest salt = null;
        try {
            salt = MessageDigest.getInstance("SHA-256");
            salt.update(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException e) {
            throw new UnsupportedOperationException(e.getMessage());
        }
        String uuid = bytesToHex(salt.digest());
        return maxLength > 0 ? uuid.substring(0, maxLength) : uuid;
    }

    private static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }
}
