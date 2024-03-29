package com.hiperium.timer.service.utils.enums;

public enum TaskColumnEnum {
    TASK_ID_COL("id"),
    TASK_NAME_COL("name"),
    TASK_HOUR_COL("hour"),
    TASK_MINUTE_COL("minute"),
    TASK_EXECUTION_DAYS_COL("executionDays"),
    TASK_EXEC_COMMAND_COL("executionCommand"),
    TASK_EXEC_UNTIL_COL("executeUntil"),
    TASK_DESCRIPTION_COL("description"),
    TASK_CREATED_AT_COL("createdAt"),
    TASK_UPDATED_AT_COL("updatedAt");

    private final String columnName;
    private TaskColumnEnum(String columnName) {
        this.columnName = columnName;
    }

    public String columnName() {
        return columnName;
    }
}
