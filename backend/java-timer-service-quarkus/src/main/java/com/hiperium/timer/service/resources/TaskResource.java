package com.hiperium.timer.service.resources;

import com.hiperium.timer.service.model.Task;
import com.hiperium.timer.service.services.TaskService;
import com.hiperium.timer.service.utils.enums.TaskDayEnum;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import org.jboss.logging.Logger;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;
import static javax.ws.rs.core.Response.Status.CREATED;

/**
 * @author Andres Solorzano
 */
@Path("/api/task")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TaskResource {

    private static final Logger LOGGER = Logger.getLogger(TaskResource.class.getName());

    @Inject
    TaskService taskService;

    @POST
    public Uni<Response> create(Task task) {
        LOGGER.debug("create() - START: " + task);
        if (Objects.isNull(task) || Objects.nonNull(task.getId())) {
            throw new WebApplicationException(
                    "Resource was not set properly for this request.", BAD_REQUEST);
        }
        return this.taskService.create(task)
                .map(createdTask -> Response.ok(createdTask).status(CREATED).build());
    }

    @PUT
    @Path("{id}")
    public Uni<Response> update(@PathParam("id") String id, Task task) {
        LOGGER.debug("update() - START: " + task);
        if (Objects.isNull(id) || id.isEmpty() || Objects.isNull(task)) {
            throw new WebApplicationException(
                    "Resource attributes was not set properly on the request.", BAD_REQUEST);
        }
        return this.taskService.find(id)
                .flatMap(actualTask -> this.taskService.update(actualTask, task))
                .map(updatedTask -> Response.ok(updatedTask).build());
    }

    @DELETE
    @Path("{id}")
    public Uni<Response> delete(@PathParam("id") String id) {
        LOGGER.debug("delete() - START: " + id);
        if (Objects.isNull(id) || id.isEmpty()) {
            throw new WebApplicationException(
                    "Resource ID was not set properly on the request.", BAD_REQUEST);
        }
        return this.taskService.find(id)
                .flatMap(actualTask -> this.taskService.delete(actualTask))
                .map(task -> Response.ok().build());
    }

    @GET
    @Path("{id}")
    public Uni<Response> find(@PathParam("id") String id) {
        LOGGER.debug("find() - START: " + id);
        return taskService.find(id)
                .map(entity -> Response.ok(entity).build());
    }

    @GET
    @Path("jsonTemplate")
    public Response jsonTemplate() {
        LOGGER.debug("jsonTemplate() - START");
        ZonedDateTime executeUntil = ZonedDateTime.now()
                .plusYears(2).withMonth(12).withDayOfMonth(31)
                .withHour(23).withMinute(59).withSecond(59).withNano(0);
        Task task = new Task("Task name", 10, 10,
                List.of(TaskDayEnum.TUE.name(), TaskDayEnum.THU.name(), TaskDayEnum.SAT.name()),
                "Activate garbage collector robot.",
                executeUntil,
                "Execute command to start the Task.");
        return Response.ok(task).build();
    }
}
