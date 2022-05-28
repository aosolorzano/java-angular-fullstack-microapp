package com.hiperium.java.faker.data.service;

import com.github.javafaker.Country;
import com.hiperium.java.faker.data.generic.ServiceGeneric;
import com.hiperium.java.faker.data.model.Location;
import com.hiperium.java.faker.data.util.DataUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Andres Solorzano
 */
public final class LocationService extends ServiceGeneric {

    private static final Logger LOGGER = LogManager.getLogger(LocationService.class);
    private static final List<String> INSERTED_CITY_CODE_LIST = new ArrayList<>();

    private LocationService() {
        super();
    }

    public static List<String> generateLocationData(int requiredNumber) throws DynamoDbException, IllegalArgumentException {
        LOGGER.debug("generateLocationData() - START");
        INSERTED_CITY_CODE_LIST.clear();
        for (int i = 0; i < requiredNumber; i++) {
            insertRequestedData();
        }
        LOGGER.debug("generateLocationData() - END");
        return INSERTED_CITY_CODE_LIST;
    }

    private static void insertRequestedData() throws DynamoDbException, IllegalArgumentException {
        Country country = DataUtil.FAKER.country();
        while (INSERTED_CITY_CODE_LIST.contains(country.countryCode3())) {
            country = DataUtil.FAKER.country();
        }
        Location register = new Location(country.countryCode3(), country.countryCode2(), country.name());
        register.setCreatedAt(DataUtil.getActualDateTime());

        LOGGER.debug("Inserting \"{}\"...", register.getId());
        locationTable.putItem(register);
        INSERTED_CITY_CODE_LIST.add(register.getId());
        LOGGER.debug("DONE!");
    }

    public static void deleteAllItems() {
        LOGGER.debug("deleteAllItems() - START");
        for (Location location : locationTable.scan().items()) {
            locationTable.deleteItem(location);
        }
        LOGGER.debug("deleteAllItems() - END");
    }
}
