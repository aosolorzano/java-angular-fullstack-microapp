package com.hiperium.faker.data.main;

import com.hiperium.faker.data.service.TaskService;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Properties;

/**
 * @author Andres Solorzano
 */
public class MainClass {

    private static final Logger LOGGER = LogManager.getLogger(MainClass.class);
    private static final int MAX_NUM_TASKS_TO_GENERATE = 25;
    private static final String RANGE_SUPPORTED_EXCEPTION_MESSAGE = "The number entered exceed the range supported.";

    public static void main(String[] args) throws IllegalAccessException {
        String awsProfile = "default";
        int requestedTasksNumber = MAX_NUM_TASKS_TO_GENERATE;

        // Assign the required values.
        if (args.length == 2) {
            awsProfile = args[0];
            String number = args[1];
            if (StringUtils.isNumeric(number)) {
                requestedTasksNumber = Integer.parseInt(number);
                validateInputLimit(requestedTasksNumber);
            } else {
                throw new IllegalArgumentException("The number entered to generate the amount of data required, is not numeric.");
            }
        }

        // Assigning the AWS profile to use.
        if (!awsProfile.trim().equalsIgnoreCase("default")) {
            Properties props = System.getProperties();
            props.setProperty("aws.profile", awsProfile.trim());
        }

        // PERSISTING REQUESTED DATA
        LOGGER.info("Persisting the requested amount of data. This can take a while...");
        try {
            createTasksData(requestedTasksNumber);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
        LOGGER.info("All requested amount of data was created successfully.");
    }

    private static void createTasksData(int requestedOpenPositionsNumber) {
        LOGGER.info("Creating Tasks data...");
        TaskService.generateTaskData(requestedOpenPositionsNumber);
    }

    private static void validateInputLimit(int enteredNumber) throws IllegalArgumentException{
        if (enteredNumber <= 0 || enteredNumber > MainClass.MAX_NUM_TASKS_TO_GENERATE) {
            throw new IllegalArgumentException(RANGE_SUPPORTED_EXCEPTION_MESSAGE);
        }
    }
}
