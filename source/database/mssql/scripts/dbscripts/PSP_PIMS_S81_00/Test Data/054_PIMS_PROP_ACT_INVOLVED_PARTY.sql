DELETE FROM PIMS_PROP_ACT_INVOLVED_PARTY;
GO

INSERT INTO PIMS_PROP_ACT_INVOLVED_PARTY (PIMS_PROPERTY_ACTIVITY_ID, PERSON_ID, ORGANIZATION_ID)
VALUES
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()), (SELECT TOP 1 PERSON_ID FROM PIMS_PERSON ORDER BY NEWID()), (SELECT TOP 1 ORGANIZATION_ID FROM PIMS_ORGANIZATION ORDER BY NEWID()));
GO