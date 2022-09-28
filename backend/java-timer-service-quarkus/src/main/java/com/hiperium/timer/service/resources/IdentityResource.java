package com.hiperium.timer.service.resources;

import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import org.jboss.logging.Logger;
import org.jboss.resteasy.reactive.NoCache;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Andres Solorzano
 */
@Path("/api/identity")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
public class IdentityResource {

    private static final Logger LOGGER = Logger.getLogger(IdentityResource.class.getName());

    @Inject
    SecurityIdentity identity;

    @GET
    @NoCache
    public User aboutMyUser() {
        LOGGER.debug("aboutMyUser() - START");
        this.identity.getRoles().forEach(role -> LOGGER.debug("Role: " + role));
        return new User(this.identity);
    }

    public static class User {

        private final String userName;

        User(SecurityIdentity identity) {
            this.userName = identity.getPrincipal().getName();
        }

        public String getUserName() {
            return userName;
        }
    }
}
