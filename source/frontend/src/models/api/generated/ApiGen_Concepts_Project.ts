/**
 * File autogenerated by TsGenerator.
 * Do not manually modify, changes made to this file will be lost when this file is regenerated.
 */
import { ApiGen_Base_BaseAudit } from './ApiGen_Base_BaseAudit';
import { ApiGen_Base_CodeType } from './ApiGen_Base_CodeType';
import { ApiGen_Concepts_FinancialCode } from './ApiGen_Concepts_FinancialCode';
import { ApiGen_Concepts_ProjectProduct } from './ApiGen_Concepts_ProjectProduct';

// LINK: @backend/apimodels/Models/Concepts/Project/ProjectModel.cs
export interface ApiGen_Concepts_Project extends ApiGen_Base_BaseAudit {
  id: number | null;
  projectStatusTypeCode: ApiGen_Base_CodeType<string> | null;
  businessFunctionCode: ApiGen_Concepts_FinancialCode | null;
  costTypeCode: ApiGen_Concepts_FinancialCode | null;
  workActivityCode: ApiGen_Concepts_FinancialCode | null;
  regionCode: ApiGen_Base_CodeType<number> | null;
  code: string | null;
  description: string | null;
  note: string | null;
  projectProducts: ApiGen_Concepts_ProjectProduct[] | null;
}