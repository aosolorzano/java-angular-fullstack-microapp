package com.hiperium.timer.service.services;

import com.hiperium.timer.service.common.AbstractTaskService;
import com.hiperium.timer.service.model.Task;
import com.hiperium.timer.service.utils.TaskDataUtil;
import io.smallrye.mutiny.Uni;
import org.jboss.logging.Logger;
import software.amazon.awssdk.services.dynamodb.DynamoDbAsyncClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

/**
 * @author Andres Solorzano
 */
@ApplicationScoped
public class TaskService extends AbstractTaskService {

    private static final Logger LOGGER = Logger.getLogger(TaskService.class.getName());

    @Inject
    DynamoDbAsyncClient dynamoAsyncClient;

    @Inject
    JobService jobService;

    public Uni<Task> create(Task task) {
        LOGGER.debug("create() - START: " + task.getName());
        task.setId(TaskDataUtil.generateUUID(12));
        return this.jobService.create(task)
                .onItem()
                .invoke(() -> this.dynamoAsyncClient.putItem(super.getPutItemRequest(task)))
                .onFailure().call(throwable -> {
                    LOGGER.error("create() - ERROR: " + throwable.getMessage());
                    return Uni.createFrom().nullItem();
                });
    }

    public Uni<Task> update(Task actualTask, Task updatedTask) {
        LOGGER.debug("update() - START: " + actualTask.getName());
        return this.jobService.update(updatedTask)
                .onItem()
                .invoke(() -> this.dynamoAsyncClient.updateItem(super.getUpdateItemRequest(actualTask, updatedTask)))
                .onFailure().call(throwable -> {
                    LOGGER.error("update() - ERROR: " + throwable.getMessage());
                    return Uni.createFrom().nullItem();
                });
    }

    public Uni<Task> delete(Task task) {
        LOGGER.debug("delete() - START: " + task.getName());
        return this.jobService.delete(task)
                .onItem()
                .invoke(() -> this.dynamoAsyncClient.deleteItem(super.getDeleteItemRequest(task)))
                .onFailure().call(throwable -> {
                    LOGGER.error("delete() - ERROR: " + throwable.getMessage());
                    return Uni.createFrom().nullItem();
                });
    }

    public Uni<Task> find(String id) {
        LOGGER.debug("find() - START");
        return Uni.createFrom()
                .completionStage(() -> this.dynamoAsyncClient.getItem(super.getItemRequest(id)))
                .map(itemResponse -> TaskDataUtil.getTaskFromAttributeValues(itemResponse.item()));
    }

    public Uni<List<Task>> findAll() {
        LOGGER.debug("findAll() - START");
        return Uni.createFrom()
                .completionStage(() -> this.dynamoAsyncClient.scan(super.getScanRequest()))
                .map(response -> response.items()
                        .stream()
                        .map(TaskDataUtil::getTaskFromAttributeValues)
                        .toList());
    }

    public void executeTask(String taskId) {
        LOGGER.info("executeTask() - START: " + taskId);
        this.find(taskId).subscribe().with(
                taskResult -> LOGGER.info("Command to execute: " + taskResult.getExecutionCommand()),
                failureResult -> LOGGER.error("Error to find the task ID => " + failureResult.getMessage()));
    }
}
