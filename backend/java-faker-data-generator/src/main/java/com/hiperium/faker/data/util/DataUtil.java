package com.hiperium.faker.data.util;

import com.github.javafaker.Faker;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.*;
import java.util.*;

/**
 * @author Andres Solorzano
 */
public final class DataUtil {

    private static final List<String> DAYS_OF_WEEK = List.of("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN");
    private static final char[] hexArray = "JavaFakerDynamoDB".toCharArray();

    public static final Faker FAKER = new Faker();

    private DataUtil() {
        // Nothing to implement.
    }

    public static ZonedDateTime getActualZonedDateTime() {
        ZoneId zoneId = ZoneId.of("-05:00");
        return ZonedDateTime.now(zoneId);
    }

    public static ZonedDateTime getZonedDateTimeFromDate(Date date) {
        ZoneId zoneId = ZoneId.of("-05:00");
        return ZonedDateTime.ofInstant(date.toInstant(), zoneId);
    }

    public static Set<String> getDaysOfWeek(int numberOfDays) {
        if (numberOfDays < 1 || numberOfDays > 7) {
            throw new IllegalArgumentException("The number of days must between 1 and 7");
        }
        Set<String> daysOfWeek = new HashSet<>();
        switch (numberOfDays) {
            case 1 -> daysOfWeek.add(DAYS_OF_WEEK.get(FAKER.number().numberBetween(0, 7)));
            case 2 -> {
                int i = FAKER.number().numberBetween(0, 6);
                daysOfWeek.addAll(DAYS_OF_WEEK.subList(i, i + numberOfDays));
            }
            case 3 -> {
                int i = FAKER.number().numberBetween(0, 5);
                daysOfWeek.addAll(DAYS_OF_WEEK.subList(i, i + numberOfDays));
            }
            case 4 -> {
                int i = FAKER.number().numberBetween(0, 4);
                daysOfWeek.addAll(DAYS_OF_WEEK.subList(i, i + numberOfDays));
            }
            case 5 -> {
                int i = FAKER.number().numberBetween(0, 3);
                daysOfWeek.addAll(DAYS_OF_WEEK.subList(i, i + numberOfDays));
            }
            case 6 -> {
                int i = FAKER.number().numberBetween(0, 2);
                daysOfWeek.addAll(DAYS_OF_WEEK.subList(i, i + numberOfDays));
            }
            case 7 -> daysOfWeek.addAll(DAYS_OF_WEEK);
            default -> throw new IllegalArgumentException("The number of days must between 1 and 7");
        }
        return daysOfWeek;
    }

    public static String generateUUID(int maxLength) {
        MessageDigest salt;
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
