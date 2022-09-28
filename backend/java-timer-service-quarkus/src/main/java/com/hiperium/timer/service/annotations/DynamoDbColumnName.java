package com.hiperium.timer.service.annotations;

import com.hiperium.timer.service.utils.enums.TaskColumnEnum;

import java.lang.annotation.*;

/**
 * @author Andres Solorzano
 */
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)     // AVAILABLE VIA REFLECTION AT RUNTIME.
public @interface DynamoDbColumnName {
    TaskColumnEnum name();
}

