package com.hiperium.faker.data.main;

import com.hiperium.faker.data.service.TaskService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.Console;
import java.util.Properties;

/**
 * @author Andres Solorzano
 */
public class MainClass {

    private static final Logger LOGGER = LogManager.getLogger(MainClass.class);
    private static final int MAX_NUM_TASKS_TO_GENERATE = 25;
    private static final String RANGE_SUPPORTED_EXCEPTION_MESSAGE = "The number entered exceed the range supported.";

    public static void main(String[] args) throws IllegalAccessException {
        Console console = System.console();
        if (null == console) {
            throw new IllegalAccessException("Java Console is not available...");
        }
        String awsProfile = console.readLine("Enter your configured AWS profile name: [default] ");
        if (!awsProfile.isBlank() && !awsProfile.trim().equalsIgnoreCase("default")) {
            Properties props = System.getProperties();
            props.setProperty("aws.profile", awsProfile.trim());
        } else {
            awsProfile = "default";
        }
        LOGGER.info("You are using the AWS profile: {}", awsProfile);

        // READING USER INPUT
        int requestedTasksNumber = getRequestedUserInput(console);
        LOGGER.info("You have requested to generate {} Tasks.", requestedTasksNumber);

        //DELETING PREVIOUS DATA
        LOGGER.info("Deleting previous data...");
        TaskService.deleteAllItems();

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
        LOGGER.info("Done!");
    }
    private static int getRequestedUserInput(Console console) throws NumberFormatException{
        String inputNumberStr = console.readLine("Enter the number of Tasks to generate [1-25]: ");
        int inputNumber = Integer.parseInt(inputNumberStr);
        validateInputLimit(inputNumber);
        return inputNumber;
    }

    private static void validateInputLimit(int enteredNumber) throws IllegalArgumentException{
        if (enteredNumber <= 0 || enteredNumber > MainClass.MAX_NUM_TASKS_TO_GENERATE) {
            throw new IllegalArgumentException(RANGE_SUPPORTED_EXCEPTION_MESSAGE);
        }
    }
}
