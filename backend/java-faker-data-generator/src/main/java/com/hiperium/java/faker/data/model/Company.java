package com.hiperium.java.faker.data.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

import java.time.Instant;
import java.util.Objects;

/**
 * @author Andres Solorzano
 */
@DynamoDbBean
public class Company {

    private String id;
    private String locationId;
    private String name;
    private String city;
    private String industry;
    private String url;
    private Instant createdAt;
    private Instant updatedAt;

    public Company() {
    }

    public Company(String id, String locationId, String name, String city, String industry, String url) {
        this.id = id;
        this.locationId = locationId;
        this.name = name;
        this.city = city;
        this.industry = industry;
        this.url = url;
    }

    @DynamoDbPartitionKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbSortKey
    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
        Company company = (Company) o;
        return id.equals(company.id) && locationId.equals(company.locationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, locationId);
    }

    @Override
    public String toString() {
        return "Company{" +
                "id='" + id + '\'' +
                ", locationId='" + locationId + '\'' +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", industry='" + industry + '\'' +
                ", url='" + url + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
