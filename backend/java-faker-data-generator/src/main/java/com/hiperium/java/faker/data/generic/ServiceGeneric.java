package com.hiperium.java.faker.data.generic;

import com.hiperium.java.faker.data.model.Company;
import com.hiperium.java.faker.data.model.Location;
import com.hiperium.java.faker.data.model.OpenPosition;
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

    protected static DynamoDbTable<Location> locationTable = DYNAMO_DB_ENHANCED_CLIENT
            .table("Location", TableSchema.fromBean(Location.class));

    protected static DynamoDbTable<Company> companyTable = DYNAMO_DB_ENHANCED_CLIENT
            .table("Company", TableSchema.fromBean(Company.class));

    protected static DynamoDbTable<OpenPosition> positionsTable = DYNAMO_DB_ENHANCED_CLIENT
            .table("OpenPosition", TableSchema.fromBean(OpenPosition.class));

    protected ServiceGeneric() {}

}
