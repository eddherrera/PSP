/* -----------------------------------------------------------------------------
Drop the ACQPAY_COMP_REQ_PAYEE_TCC check constraint on PIMS_ACQUISITION_PAYEE.
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
Author        Date         Comment
------------  -----------  -----------------------------------------------------
Doug Filteau  2023-Jun-23  Initial version
----------------------------------------------------------------------------- */

SET XACT_ABORT ON
GO
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
GO
BEGIN TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO

-- Drop check constraint ACQPAY_COMP_REQ_PAYEE_TCC
PRINT N'Drop check constraint ACQPAY_COMP_REQ_PAYEE_TCC'
GO
ALTER TABLE [dbo].[PIMS_ACQUISITION_PAYEE]
	DROP CONSTRAINT IF EXISTS [ACQPAY_COMP_REQ_PAYEE_TCC]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO

-- Create check constraint ACQPAY_COMP_REQ_PAYEE_TCC
--PRINT N'Create check constraint ACQPAY_COMP_REQ_PAYEE_TCC'
--ALTER TABLE [dbo].[PIMS_ACQUISITION_PAYEE] ADD CONSTRAINT [ACQPAY_COMP_REQ_PAYEE_TCC] 
--    CHECK ([[ACQUISITION_OWNER_ID] IS NOT NULL AND [INTEREST_HOLDER_ID] IS NULL AND [OWNER_REPRESENTATIVE_ID] IS NULL AND [OWNER_SOLICITOR_ID] IS NULL AND [ACQUISITION_FILE_PERSON_ID] IS NULL] OR [[ACQUISITION_OWNER_ID] IS NULL AND [INTEREST_HOLDER_ID] IS NOT NULL AND [OWNER_REPRESENTATIVE_ID] IS NULL AND [OWNER_SOLICITOR_ID] IS NULL AND [ACQUISITION_FILE_PERSON_ID] IS NULL] OR [[ACQUISITION_OWNER_ID] IS NULL AND [INTEREST_HOLDER_ID] IS NULL AND [OWNER_REPRESENTATIVE_ID] IS NOT NULL AND [OWNER_SOLICITOR_ID] IS NULL AND [ACQUISITION_FILE_PERSON_ID] IS NULL] OR [[ACQUISITION_OWNER_ID] IS NULL AND [INTEREST_HOLDER_ID] IS NULL AND [OWNER_REPRESENTATIVE_ID] IS NULL AND [OWNER_SOLICITOR_ID] IS NOT NULL AND [ACQUISITION_FILE_PERSON_ID] IS NULL] OR [[ACQUISITION_OWNER_ID] IS NULL AND [INTEREST_HOLDER_ID] IS NULL AND [OWNER_REPRESENTATIVE_ID] IS NULL AND [OWNER_SOLICITOR_ID] IS NULL AND [ACQUISITION_FILE_PERSON_ID] IS NOT NULL] OR [[ACQUISITION_OWNER_ID] IS NULL AND [INTEREST_HOLDER_ID] IS NULL AND [OWNER_REPRESENTATIVE_ID] IS NULL AND [OWNER_SOLICITOR_ID] IS NULL AND [ACQUISITION_FILE_PERSON_ID] IS NULL])
--GO
--IF @@ERROR <> 0 SET NOEXEC ON
--GO

COMMIT TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
DECLARE @Success AS BIT
SET @Success = 1
SET NOEXEC OFF
IF (@Success = 1) PRINT 'The database update succeeded'
ELSE BEGIN
   IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION
   PRINT 'The database update failed'
END
GO