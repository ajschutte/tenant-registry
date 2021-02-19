package com.mg.tenant.migration;

import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

/**
 * Entry class for the tenant registry service...
 */
@SpringBootApplication
public class TenantRegistryMigrationApplication {

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(TenantRegistryMigrationApplication.class);

    /**
     * Main method for starting the spring boot application.
     *
     * @param args command line arguments
     */
    public static void main(String[] args) {

        logger.debug("Starting up from main(..)..");

        System.exit(SpringApplication
                .exit(new SpringApplicationBuilder(TenantRegistryMigrationApplication.class)
                        .logStartupInfo(true)
                        .run(args)));

    }

}
