DELETE FROM PIMS_PROP_PROP_ACTIVITY;
GO

INSERT INTO PIMS_PROP_PROP_ACTIVITY (PIMS_PROPERTY_ACTIVITY_ID, PROPERTY_ID)
VALUES
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID())),
  ((SELECT TOP 1 PIMS_PROPERTY_ACTIVITY_ID FROM PIMS_PROPERTY_ACTIVITY ORDER BY NEWID()),(SELECT TOP 1 PROPERTY_ID FROM PIMS_PROPERTY ORDER BY NEWID()));
GO