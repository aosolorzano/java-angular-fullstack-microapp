package com.hiperium.timer.service.resources;

import com.hiperium.timer.service.services.TaskService;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import org.jboss.logging.Logger;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Andres Solorzano
 */
@Path("/api/tasks")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
public class TasksResource {

    private static final Logger LOGGER = Logger.getLogger(TasksResource.class.getName());

    @Inject
    TaskService taskService;

    @GET
    public Uni<Response> findAll() {
        LOGGER.debug("findAll() - START");
        return taskService.findAll()
                .map(entityList -> Response.ok(entityList).build());
    }
}
