package com.hiperium.faker.data.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.Set;

/**
 * @author Andres Solorzano
 */
@DynamoDbBean
public class Task {

    public static final String EXECUTION_COMMAND = "python3 /home/pi/faker/faker.py";
    private String id;
    private String name;
    private Integer hour;
    private Integer minute;
    private Set<String> daysOfWeek;
    private String executionCommand;
    private ZonedDateTime executeUntil;
    private String description;
    private ZonedDateTime createdAt;

    public Task() {
    }

    public Task(String id, String name, Integer hour, Integer minute, Set<String> daysOfWeek,
                ZonedDateTime executeUntil, String description) {
        this.id = id;
        this.name = name;
        this.hour = hour;
        this.minute = minute;
        this.daysOfWeek = daysOfWeek;
        this.executionCommand = EXECUTION_COMMAND;
        this.executeUntil = executeUntil;
        this.description = description;
    }

    @DynamoDbPartitionKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getHour() {
        return hour;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }

    public Integer getMinute() {
        return minute;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    public Set<String> getDaysOfWeek() {
        return daysOfWeek;
    }

    public void setDaysOfWeek(Set<String> daysOfWeek) {
        this.daysOfWeek = daysOfWeek;
    }

    public String getExecutionCommand() {
        return executionCommand;
    }

    public void setExecutionCommand(String executionCommand) {
        this.executionCommand = executionCommand;
    }

    public ZonedDateTime getExecuteUntil() {
        return executeUntil;
    }

    public void setExecuteUntil(ZonedDateTime executeUntil) {
        this.executeUntil = executeUntil;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return id.equals(task.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Task{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", hour=" + hour +
                ", minute=" + minute +
                ", daysOfWeek=" + daysOfWeek +
                ", executionCommand='" + executionCommand + '\'' +
                ", executeUntil=" + executeUntil +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
