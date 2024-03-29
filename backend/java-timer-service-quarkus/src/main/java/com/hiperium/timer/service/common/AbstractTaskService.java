package com.hiperium.timer.service.common;

import com.hiperium.timer.service.model.Task;
import com.hiperium.timer.service.utils.TaskBeanUtil;
import com.hiperium.timer.service.utils.TaskDataUtil;
import com.hiperium.timer.service.utils.enums.TaskColumnEnum;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Andres Solorzano
 */
public abstract class AbstractTaskService {

    private static final Logger LOGGER = Logger.getLogger(AbstractTaskService.class.getName());

    private static final HashMap<String, AttributeValue> TASK_ITEM_KEY = new HashMap<>();

    @ConfigProperty(name = "tasks.dynamodb.table.name")
    String dynamodbTableName;

    @ConfigProperty(name = "tasks.time.zone.id")
    String zoneId;

    protected ScanRequest getScanRequest() {
        return ScanRequest.builder()
                .tableName(dynamodbTableName)
                .attributesToGet(TaskDataUtil.COLUM_NAMES)
                .build();
    }

    protected GetItemRequest getItemRequest(String id) {
        LOGGER.debug("getItemRequest() - START: " + id);
        Map<String, AttributeValue> key = new HashMap<>();
        key.put(TaskColumnEnum.TASK_ID_COL.columnName(), AttributeValue.builder().s(id).build());
        return GetItemRequest.builder()
                .tableName(dynamodbTableName)
                .key(key)
                .attributesToGet(TaskDataUtil.COLUM_NAMES)
                .build();
    }

    protected PutItemRequest getPutItemRequest(Task task) {
        LOGGER.debug("getPutItemRequest() - START: " + task);
        Map<String, AttributeValue> item = new HashMap<>();
        task.setCreatedAt(ZonedDateTime.now(ZoneId.of(this.zoneId)));
        task.setUpdatedAt(task.getCreatedAt());
        for (TaskColumnEnum columnNameEnum : TaskColumnEnum.values()) {
            item.put(columnNameEnum.columnName(), TaskDataUtil.getAttributeValueFromTask(columnNameEnum, task));
        }
        LOGGER.debug("getPutItemRequest() - Item values: " + item);
        return PutItemRequest.builder()
                .tableName(dynamodbTableName)
                .item(item)
                .build();
    }

    protected UpdateItemRequest getUpdateItemRequest(Task actualTask, Task updatedTask) {
        LOGGER.debug("getUpdateItemRequest() - START: " + updatedTask);
        Map<String, AttributeValueUpdate> updatedValues = new HashMap<>();
        try {
            // ASSIGN ONLY UPDATED COLUMNS
            updatedTask.setUpdatedAt(ZonedDateTime.now(ZoneId.of(this.zoneId)));
            List<TaskColumnEnum> updatedColumnsEnum = TaskBeanUtil.getModifiedFields(actualTask, updatedTask);
            if (updatedColumnsEnum.isEmpty()) {
                throw new IllegalArgumentException("No modified fields were found in the requested task.");
            }
            for (TaskColumnEnum columnNameEnum : updatedColumnsEnum) {
                if (columnNameEnum.equals(TaskColumnEnum.TASK_ID_COL)
                        || columnNameEnum.equals(TaskColumnEnum.TASK_CREATED_AT_COL)) {
                    continue;
                }
                updatedValues.put(columnNameEnum.columnName(), AttributeValueUpdate.builder()
                        .value(TaskDataUtil.getAttributeValueFromTask(columnNameEnum, updatedTask))
                        .action(AttributeAction.PUT)
                        .build());
            }
        } catch (ReflectiveOperationException e) {
            LOGGER.error("Cannot obtain updated fields using reflection: " + e.getMessage());
            throw new UnsupportedOperationException(
                    "Cannot verify updated fields against actual object in database.");
        }
        LOGGER.debug("getUpdateItemRequest() - Updated values: " + updatedValues);
        return UpdateItemRequest.builder()
                .tableName(dynamodbTableName)
                .key(this.getTaskIdItemKey(updatedTask))
                .attributeUpdates(updatedValues)
                .build();
    }

    protected DeleteItemRequest getDeleteItemRequest(Task task) {
        LOGGER.debug("getDeleteItemRequest() - START: " + task.getId());
        return DeleteItemRequest.builder()
                .tableName(dynamodbTableName)
                .key(this.getTaskIdItemKey(task))
                .build();
    }

    private HashMap<String, AttributeValue> getTaskIdItemKey(Task task) {
        TASK_ITEM_KEY.put(TaskColumnEnum.TASK_ID_COL.columnName(),
                AttributeValue.builder().s(task.getId()).build());
        return TASK_ITEM_KEY;
    }
}
