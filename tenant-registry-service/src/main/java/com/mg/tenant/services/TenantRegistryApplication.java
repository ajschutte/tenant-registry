package com.mg.tenant.services;

import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

/**
 * Entry class for the tenant registry service...
 */
@SpringBootApplication
public class TenantRegistryApplication {

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(TenantRegistryApplication.class);

    /**
     * Main method for starting the spring boot application.
     *
     * @param args command line arguments
     */
    public static void main(String[] args) {

        logger.debug("Starting up from main(..)..");

        new SpringApplicationBuilder(TenantRegistryApplication.class)
                .logStartupInfo(true)
                .run(args);
    }

}
