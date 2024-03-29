package com.hiperium.timer.service.utils;

import com.hiperium.timer.service.annotations.DynamoDbColumnName;
import com.hiperium.timer.service.model.Task;
import com.hiperium.timer.service.utils.enums.TaskColumnEnum;
import org.jboss.logging.Logger;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @author Andres Solorzano
 */
public final class TaskBeanUtil {

    private static final Logger LOGGER = Logger.getLogger(TaskBeanUtil.class.getName());

    private TaskBeanUtil() {
    }

    public static List<TaskColumnEnum> getModifiedFields(Task actualTask, Task updatedTask)
            throws ReflectiveOperationException {
        LOGGER.debug("getModifiedFields() - START");
        List<TaskColumnEnum> changedProperties = new ArrayList<>();
        for (Method method : actualTask.getClass().getDeclaredMethods()) {
            if (method.getName().startsWith("get") && method.isAnnotationPresent(DynamoDbColumnName.class)) {
                Object actualObjectValue;
                Object updatedObjectValue;
                try {
                    actualObjectValue = method.invoke(actualTask);
                    updatedObjectValue = method.invoke(updatedTask);
                } catch (IllegalAccessException | InvocationTargetException e) {
                    throw new ReflectiveOperationException(e.getMessage());
                }
                if (!Objects.equals(actualObjectValue, updatedObjectValue)) {
                    DynamoDbColumnName taskFieldDynamoDbColumnName = method.getAnnotation(DynamoDbColumnName.class);
                    changedProperties.add(taskFieldDynamoDbColumnName.name());
                }
            }
        }
        LOGGER.debug("getModifiedFields() - Changed columns Enum: " + changedProperties);
        return changedProperties;
    }
}
