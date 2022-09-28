package com.hiperium.timer.service.model;

import com.hiperium.timer.service.annotations.DynamoDbColumnName;
import com.hiperium.timer.service.utils.enums.TaskColumnEnum;
import io.quarkus.runtime.annotations.RegisterForReflection;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

/**
 * @author Andres Solorzano
 */
@RegisterForReflection
public class Task {

    private String id;
    private String name;
    private Integer hour;
    private Integer minute;
    private List<String> executionDays;
    private String executionCommand;
    private ZonedDateTime executeUntil;
    private String description;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    public Task() {
        // Nothing to implement
    }

    public Task(String name, Integer hour, Integer minute, List<String> executionDays,
                String executionCommand, ZonedDateTime executeUntil, String description) {
        this.name = name;
        this.hour = hour;
        this.minute = minute;
        this.executionDays = executionDays;
        this.executionCommand = executionCommand;
        this.executeUntil = executeUntil;
        this.description = description;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_ID_COL)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_NAME_COL)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_EXEC_COMMAND_COL)
    public String getExecutionCommand() {
        return executionCommand;
    }

    public void setExecutionCommand(String executionCommand) {
        this.executionCommand = executionCommand;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_EXEC_UNTIL_COL)
    public ZonedDateTime getExecuteUntil() {
        return executeUntil;
    }

    public void setExecuteUntil(ZonedDateTime executeUntil) {
        this.executeUntil = executeUntil;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_HOUR_COL)
    public Integer getHour() {
        return hour;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_MINUTE_COL)
    public Integer getMinute() {
        return minute;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_EXECUTION_DAYS_COL)
    public List<String> getExecutionDays() {
        return executionDays;
    }

    public void setExecutionDays(List<String> executionDays) {
        this.executionDays = executionDays;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_DESCRIPTION_COL)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // @DynamoDbColumnName not applied here because 'createdAt' field is set manually in DynamoDB.
    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @DynamoDbColumnName(name = TaskColumnEnum.TASK_UPDATED_AT_COL)
    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
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
                ", executionDays=" + executionDays +
                ", executionCommand='" + executionCommand + '\'' +
                ", executeUntil=" + executeUntil +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
