--liquibase formatted sql
--changeset andries:8

--This makes sure an alias ID doesn't match an existing tenant ID - I can't think of another way to check this

CREATE OR REPLACE TRIGGER NO_ALIAS_MATCHES_TENANT_ID
    BEFORE INSERT OR UPDATE OF TENANT_ALIAS_ID ON TENANT_ALIASES
    FOR EACH ROW
DECLARE
    count_existing_ids NUMBER;
BEGIN
    SELECT COUNT(*) INTO count_existing_ids FROM TENANT WHERE TENANT_ID = :NEW.TENANT_ALIAS_ID;
    IF count_existing_ids != 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Alias ID matches existing Tenant ID..');
    END IF;
END;
/
