package com.hiperium.java.faker.data.main;

import com.hiperium.java.faker.data.service.CompanyService;
import com.hiperium.java.faker.data.service.LocationService;
import com.hiperium.java.faker.data.service.OpenPositionService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * @author Andres Solorzano
 */
public class MainClass {

    private static final Logger LOGGER = LogManager.getLogger(MainClass.class);
    private static final int MAX_NUM_LOCATIONS_TO_GENERATE = 25;
    private static final int MAX_NUM_COMPANIES_PER_LOCATION = 15;
    private static final int MAX_NUM_OPEN_POSITIONS_PER_COMPANY = 5;
    private static final String RANGE_SUPPORTED_EXCEPTION_MESSAGE = "The number entered exceed the range supported.";

    public static void main(String[] args) throws IllegalAccessException {
        Console console = System.console();
        if (null == console) {
            throw new IllegalAccessException("Java Console is not available...");
        }
        String awsProfile = console.readLine("Enter your aws profile name: [default] ");
        if (!awsProfile.isBlank() && !awsProfile.equalsIgnoreCase("default")) {
            Properties props = System.getProperties();
            props.setProperty("aws.profile", awsProfile.trim());
        }
        // READING USER INPUT
        int requestedLocationsNumber = getRequestedUserInput(console,
                "Enter the number of locations to generate [1-" + MAX_NUM_LOCATIONS_TO_GENERATE + "]: ",
                MAX_NUM_LOCATIONS_TO_GENERATE);
        int requestedCompaniesNumber = getRequestedUserInput(console,
                "Enter the number of companies per location [1-" + MAX_NUM_COMPANIES_PER_LOCATION + "]: ",
                MAX_NUM_COMPANIES_PER_LOCATION);
        int requestedOpenPositionsNumber = getRequestedUserInput(console,
                "Enter the number of open positions per company [1-" + MAX_NUM_OPEN_POSITIONS_PER_COMPANY + "]: ",
                MAX_NUM_OPEN_POSITIONS_PER_COMPANY);

        //DELETING PREVIOUS DATA
        LOGGER.info("Deleting previous data...");
        LocationService.deleteAllItems();
        CompanyService.deleteAllItems();
        OpenPositionService.deleteAllItems();

        // PERSISTING REQUESTED DATA
        LOGGER.info("Persisting the requested amount of data. This can take a while...");
        try {
            List<String> createdLocationIds = createLocationsData(console, requestedLocationsNumber);
            createCompaniesData(console, createdLocationIds, requestedCompaniesNumber);
            createOpenPositionsData(console, requestedOpenPositionsNumber);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
        LOGGER.info("All requested amount of data was created successfully.");
    }

    private static List<String> createLocationsData(Console console, int requestedLocationsNumber) {
        LOGGER.info("Creating Locations data...");
        List<String> createdLocationIds = new ArrayList<>();
        createdLocationIds.addAll(LocationService.generateLocationData(requestedLocationsNumber));
        LOGGER.info("Done!");
        return createdLocationIds;
    }

    private static void createCompaniesData(Console console, List<String> createdLocationIds, int requestedCompaniesNumber) {
        LOGGER.info("Creating Companies data...");
        for (int i = 0; i < createdLocationIds.size(); i++) {
            CompanyService.generateLocationData(createdLocationIds.get(i), requestedCompaniesNumber);
        }
        LOGGER.info("Done!");
    }

    private static void createOpenPositionsData(Console console, int requestedOpenPositionsNumber) {
        LOGGER.info("Creating Open Positions data...");
        for (String companyId : CompanyService.getCreatedCompaniesIds()) {
            OpenPositionService.generateOpenPositionsData(companyId, requestedOpenPositionsNumber);
        }
        LOGGER.info("Done!");
    }
    private static int getRequestedUserInput(Console console, String message, int maxLimitAllowed) throws NumberFormatException{
        String inputNumberStr = console.readLine(message);
        int inputNumber = Integer.parseInt(inputNumberStr);
        validateInputLimit(inputNumber, maxLimitAllowed);
        return inputNumber;
    }

    private static void validateInputLimit(int enteredNumber, int limit) throws IllegalArgumentException{
        if (enteredNumber <= 0 || enteredNumber > limit) {
            throw new IllegalArgumentException(RANGE_SUPPORTED_EXCEPTION_MESSAGE);
        }
    }
}
