package com.hiperium.timer.service.main;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hiperium.timer.service.vo.AuroraDBSecretVO;
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.QuarkusApplication;
import io.quarkus.runtime.annotations.QuarkusMain;
import org.jboss.logging.Logger;

import java.text.MessageFormat;
import java.util.Objects;

/**
 * @author Andres Solorzano
 */
@QuarkusMain
public class Main {

    private static final Logger LOGGER = Logger.getLogger(Main.class.getName());
    private static final String SQL_CONNECTION = "jdbc:postgresql://{0}:{1}/{2}";

    public static void main(String[] args) {
        LOGGER.info("main() - START");
        setApplicationProperties();
        setDataBaseProperties();
        LOGGER.info("SETTING PROPERTIES DONE!!");
        Quarkus.run(QuarkusApp.class, args);
        LOGGER.info("main() - END");
    }

    private static class QuarkusApp implements QuarkusApplication {
        private static final Logger LOGGER = Logger.getLogger(QuarkusApp.class.getName());

        @Override
        public int run(String... args) {
            LOGGER.debug("run() - START");
            Quarkus.waitForExit();
            LOGGER.debug("run() - END");
            return 0;
        }
    }

    private static void setApplicationProperties() {
        String dynamoTable = System.getenv("TASKS_DYNAMODB_TABLE_NAME");
        if (Objects.isNull(dynamoTable) || dynamoTable.isBlank()) {
            LOGGER.warn("TASKS_DYNAMODB_TABLE_NAME environment variable not found.");
            LOGGER.info("Loading application property values for DynamoDB table name.");
        } else {
            LOGGER.debug("DYNAMODB TASK TABLE NAME: " + dynamoTable);
            System.setProperty("tasks.dynamodb.table.name", dynamoTable);
        }
        String timeZoneId = System.getenv("TASKS_TIME_ZONE_ID");
        if (Objects.isNull(timeZoneId) || timeZoneId.isBlank()) {
            LOGGER.warn("TASKS_TIME_ZONE_ID environment variable not found.");
            LOGGER.info("Loading application property values for TimeZone ID.");
        } else {
            LOGGER.debug("TASKS TIME ZONE ID: " + timeZoneId);
            System.setProperty("tasks.time.zone.id", timeZoneId);
        }
    }

    private static void setDataBaseProperties() {
        String auroraSecret = System.getenv("TIMER_SERVICE_DB_CLUSTER_SECRET");
        if (Objects.isNull(auroraSecret) || auroraSecret.isBlank()) {
            LOGGER.warn("TIMER_SERVICE_DB_CLUSTER_SECRET environment variable not found.");
            LOGGER.info("Loading application property values for DB connection.");
            return;
        }
        LOGGER.debug("AURORA POSTGRES SECRET JSON: " + auroraSecret);
        ObjectMapper mapper = new ObjectMapper();
        try {
            AuroraDBSecretVO secretVO = mapper.readValue(auroraSecret, AuroraDBSecretVO.class);
            String sqlConnection = MessageFormat.format(SQL_CONNECTION, secretVO.getHost(),
                    secretVO.getPort(), secretVO.getDbname());
            System.setProperty("quarkus.datasource.jdbc.url", sqlConnection);
            System.setProperty("quarkus.datasource.username", secretVO.getUsername());
            System.setProperty("quarkus.datasource.password", secretVO.getPassword());
        } catch (JsonProcessingException e) {
            throw new UnsupportedOperationException("Error to parsing JSON to Java object: " + e.getMessage());
        }
    }
}
