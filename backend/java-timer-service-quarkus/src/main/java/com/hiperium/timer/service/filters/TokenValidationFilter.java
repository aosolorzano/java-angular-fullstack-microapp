package com.hiperium.timer.service.filters;

import org.jboss.logging.Logger;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class TokenValidationFilter implements ContainerRequestFilter {

    private static final Logger LOGGER = Logger.getLogger(TokenValidationFilter.class);

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        LOGGER.info("TokenValidationFilter - filter");
    }
}
