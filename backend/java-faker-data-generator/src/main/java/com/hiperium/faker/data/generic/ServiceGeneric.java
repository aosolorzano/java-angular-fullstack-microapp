package com.hiperium.faker.data.generic;

import com.hiperium.faker.data.model.Task;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

/**
 * @author Andres Solorzano
 */
public class ServiceGeneric {

    private static final DynamoDbEnhancedClient DYNAMO_DB_ENHANCED_CLIENT;

    static {
        DynamoDbClient dynamoDbClient = DynamoDbClient.builder()
                .region(Region.US_EAST_1)
                .build();
        DYNAMO_DB_ENHANCED_CLIENT = DynamoDbEnhancedClient.builder()
                .dynamoDbClient(dynamoDbClient)
                .build();
    }

    protected static DynamoDbTable<Task> taskTable = DYNAMO_DB_ENHANCED_CLIENT
            .table("Task", TableSchema.fromBean(Task.class));

    protected ServiceGeneric() {}

}
