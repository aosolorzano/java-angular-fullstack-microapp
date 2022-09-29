package com.hiperium.faker.data.service;

import com.hiperium.faker.data.generic.ServiceGeneric;
import com.hiperium.faker.data.model.Tasks;
import com.hiperium.faker.data.util.DataUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * @author Andres Solorzano
 */
public final class TaskService extends ServiceGeneric {

    private static final Logger LOGGER = LogManager.getLogger(TaskService.class);

    private TaskService() {
        super();
    }

    public static void generateTaskData(int requiredNumber) throws DynamoDbException, IllegalArgumentException {
        LOGGER.debug("generateTaskData() - START");
        for (int i = 0; i < requiredNumber; i++) {
            insertRequestedData(i + 1);
        }
        LOGGER.debug("generateTaskData() - END");
    }

    private static void insertRequestedData(int iterator) throws DynamoDbException, IllegalArgumentException {
        Date executeUntil = DataUtil.FAKER.date()
                .future(DataUtil.FAKER.random().nextInt(90, 180), TimeUnit.DAYS);
        Tasks register = new Tasks(
                DataUtil.generateUUID(15),
                "Faker data for Tasks " + iterator,
                DataUtil.FAKER.number().numberBetween(0, 23),
                DataUtil.FAKER.number().numberBetween(0, 59),
                DataUtil.getDaysOfWeek(DataUtil.FAKER.number().numberBetween(1, 8)),
                DataUtil.getZonedDateTimeFromDate(executeUntil)
                        .withHour(23)
                        .withMinute(59)
                        .withSecond(59)
                        .withNano(0),
                DataUtil.FAKER.lorem().sentence(5)
        );
        register.setCreatedAt(DataUtil.getActualZonedDateTime());
        LOGGER.info("Inserting TASK: {}", register);
        taskTable.putItem(register);
    }
}
