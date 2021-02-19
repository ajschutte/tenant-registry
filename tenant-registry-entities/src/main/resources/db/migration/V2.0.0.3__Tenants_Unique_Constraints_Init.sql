--liquibase formatted sql
--changeset andries:4

--Tenant Alias IDs should be globally unique
ALTER TABLE TENANT_ALIASES
    ADD CONSTRAINT UK_TENANT_ALIAS_ID UNIQUE (TENANT_ALIAS_ID);

-- Tenant Alias ID should not be equal to Tenant ID
ALTER TABLE TENANT_ALIASES
    ADD CONSTRAINT CHECK_ALIAS_ID_TENANT_ID CHECK (TENANT_ALIAS_ID <> TENANT_ENTITY_ID);

-- Tenant should only have one Application Account per Application ID
ALTER TABLE APP_ACCOUNT
    ADD CONSTRAINT UK_TENANT_APP_ID UNIQUE (APP_ID, TENANT_ID);

-- Application Account of a Tenant should only have one Application Account Deployment per Environment ID
ALTER TABLE APP_ACCOUNT_DEPLOY
    ADD CONSTRAINT UK_DEPLOY_ENV_ID UNIQUE (ENV_ID, APP_ACCOUNT_ID);

-- Application Account Deployment of a Tenant should only have one Account Deployment Target Scope per Scope ID
ALTER TABLE ACCOUNT_DEPLOY_TARGET_SCOPE
    ADD CONSTRAINT UK_DEPLOY_SCOPE_ID UNIQUE (SCOPE_ID, APP_ACCOUNT_DEPLOY_ID);

