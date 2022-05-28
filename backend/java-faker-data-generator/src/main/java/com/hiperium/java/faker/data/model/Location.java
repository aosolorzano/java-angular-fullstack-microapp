package com.hiperium.java.faker.data.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

import java.text.MessageFormat;
import java.time.Instant;
import java.util.Objects;

/**
 * @author Andres Solorzano
 */
@DynamoDbBean
public class Location {

    private static final String FLAG_URL = "https://flagcdn.com/h80/{0}.png";

    private String id;
    private String country;
    private String flagImageUrl;
    private Instant createdAt;
    private Instant updatedAt;

    public Location() {
    }

    public Location(String countryCode3, String countryCode2, String countryName) {
        this.id = countryCode3;
        this.country = countryName;
        this.flagImageUrl = MessageFormat.format(FLAG_URL, countryCode2);
    }

    @DynamoDbPartitionKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbSortKey
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getFlagImageUrl() {
        return flagImageUrl;
    }

    public void setFlagImageUrl(String flagImageUrl) {
        this.flagImageUrl = flagImageUrl;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return id.equals(location.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Location{" +
                "id='" + id + '\'' +
                ", country='" + country + '\'' +
                ", flagImageUrl='" + flagImageUrl + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
