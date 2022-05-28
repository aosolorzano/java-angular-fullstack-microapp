package com.hiperium.java.faker.data.service;

import com.hiperium.java.faker.data.generic.ServiceGeneric;
import com.hiperium.java.faker.data.model.OpenPosition;
import com.hiperium.java.faker.data.util.DataUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Andres Solorzano
 */
public final class OpenPositionService extends ServiceGeneric {

    private static final Logger LOGGER = LogManager.getLogger(OpenPositionService.class);
    private static final List<String> INSERTED_OPEN_POSITION_LIST = new ArrayList<>();

    private OpenPositionService() {
        super();
    }

    public static void generateOpenPositionsData(String companyId, int requiredNumber) throws DynamoDbException, IllegalArgumentException {
        LOGGER.debug("generateOpenPositionsData() - START");
        INSERTED_OPEN_POSITION_LIST.clear();
        for (int i = 0; i < requiredNumber; i++) {
            insertRequestedData(companyId);
        }
        LOGGER.debug("generateOpenPositionsData() - END");
    }

    private static void insertRequestedData(String companyId) throws DynamoDbException, IllegalArgumentException {
        String jobTitle = DataUtil.FAKER.job().title();
        while (INSERTED_OPEN_POSITION_LIST.contains(jobTitle)) {
            jobTitle = DataUtil.FAKER.job().title();
        }
        OpenPosition register = new OpenPosition(DataUtil.generateUUID(10),
                companyId,
                jobTitle,
                DataUtil.FAKER.job().seniority(),
                DataUtil.FAKER.job().field(),
                DataUtil.FAKER.job().keySkills());
        register.setCreatedAt(DataUtil.getActualDateTime());

        LOGGER.debug("Inserting \"{}\"...", register.getTitle());
        positionsTable.putItem(register);
        INSERTED_OPEN_POSITION_LIST.add(jobTitle);
        LOGGER.debug("DONE!");
    }

    public static void deleteAllItems() {
        LOGGER.debug("deleteAllItems() - START");
        for (OpenPosition openPosition : positionsTable.scan().items()) {
            positionsTable.deleteItem(openPosition);
        }
        LOGGER.debug("deleteAllItems() - END");
    }
}
