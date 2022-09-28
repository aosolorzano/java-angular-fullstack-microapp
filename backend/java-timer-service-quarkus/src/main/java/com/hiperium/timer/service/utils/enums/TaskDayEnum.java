package com.hiperium.timer.service.utils.enums;

public enum TaskDayEnum {
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT,
    SUN;

    public static TaskDayEnum getEnumFromString(String dayOfWeek) {
        TaskDayEnum result = null;
        for (TaskDayEnum daysEnum : TaskDayEnum.values()) {
            if (daysEnum.name().equals(dayOfWeek)) {
                result = daysEnum;
                break;
            }
        }
        return result;
    }
}
