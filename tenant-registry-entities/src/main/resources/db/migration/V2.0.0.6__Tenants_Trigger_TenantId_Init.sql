--liquibase formatted sql
--changeset andries:7

--This makes sure a tenant ID doesn't match an existing alias ID - I can't think of another way to check this

CREATE OR REPLACE TRIGGER NO_TENANT_ID_MATCHES_ALIAS
    BEFORE INSERT OR UPDATE OF TENANT_ID ON TENANT
    FOR EACH ROW
DECLARE
    count_existing_ids NUMBER;
BEGIN
    SELECT COUNT(*) INTO count_existing_ids FROM TENANT_ALIASES WHERE TENANT_ALIAS_ID = :NEW.TENANT_ID;
    IF count_existing_ids != 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Tenant ID matches existing Alias ID..');
    END IF;
END;
/
