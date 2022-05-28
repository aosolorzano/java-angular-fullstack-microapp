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
public class OpenPosition {
    private String id;
    private String companyId;
    private String title;
    private String seniority;
    private String field;
    private String skills;
    private Instant createdAt;
    private Instant updatedAt;

    public OpenPosition() {
    }

    public OpenPosition(String id, String companyId, String title, String seniority, String field, String skills) {
        this.id = id;
        this.companyId = companyId;
        this.title = title;
        this.seniority = seniority;
        this.field = field;
        this.skills = skills;
    }

    @DynamoDbPartitionKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbSortKey
    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeniority() {
        return seniority;
    }

    public void setSeniority(String seniority) {
        this.seniority = seniority;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
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
        OpenPosition that = (OpenPosition) o;
        return id.equals(that.id) && companyId.equals(that.companyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, companyId);
    }

    @Override
    public String toString() {
        return "OpenPosition{" +
                "id='" + id + '\'' +
                ", companyId='" + companyId + '\'' +
                ", title='" + title + '\'' +
                ", seniority='" + seniority + '\'' +
                ", field='" + field + '\'' +
                ", skills='" + skills + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
