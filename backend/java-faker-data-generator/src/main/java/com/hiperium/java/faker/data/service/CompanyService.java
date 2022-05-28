package com.hiperium.java.faker.data.service;

import com.hiperium.java.faker.data.generic.ServiceGeneric;
import com.hiperium.java.faker.data.model.Company;
import com.hiperium.java.faker.data.util.DataUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Andres Solorzano
 */
public final class CompanyService extends ServiceGeneric {

    private static final Logger LOGGER = LogManager.getLogger(CompanyService.class);
    private static final List<String> INSERTED_GLOBAL_COMPANY_ID_LIST = new ArrayList<>();
    private static final List<String> INSERTED_COMPANY_NAME_LIST = new ArrayList<>();

    private CompanyService() {
        super();
    }

    public static void generateLocationData(String locationId, int requiredNumber) throws DynamoDbException, IllegalArgumentException {
        LOGGER.debug("generateLocationData() - START");
        INSERTED_COMPANY_NAME_LIST.clear();
        for (int i = 0; i < requiredNumber; i++) {
            insertRequestedData(locationId);
        }
        LOGGER.debug("generateLocationData() - END");
    }

    private static void insertRequestedData(String locationId) throws DynamoDbException, IllegalArgumentException {
        String companyName = DataUtil.FAKER.company().name();
        while (INSERTED_COMPANY_NAME_LIST.contains(companyName)) {
            companyName = DataUtil.FAKER.company().name();
        }
        Company register = new Company(DataUtil.generateUUID(10),
                locationId,
                companyName,
                DataUtil.FAKER.address().cityName(),
                DataUtil.FAKER.company().industry(),
                DataUtil.FAKER.company().url());
        register.setCreatedAt(DataUtil.getActualDateTime());

        LOGGER.debug("Inserting \"{}\"...", register.getName());
        companyTable.putItem(register);
        INSERTED_COMPANY_NAME_LIST.add(companyName);
        INSERTED_GLOBAL_COMPANY_ID_LIST.add(register.getId());
        LOGGER.debug("DONE!");
    }

    public static void deleteAllItems() {
        LOGGER.debug("deleteAllItems() - START");
        for (Company company : companyTable.scan().items()) {
            companyTable.deleteItem(company);
        }
        LOGGER.debug("deleteAllItems() - END");
    }

    public static List<String> getCreatedCompaniesIds() {
        return INSERTED_GLOBAL_COMPANY_ID_LIST.stream().toList();
    }
}
