/**
 * File autogenerated by TsGenerator.
 * Do not manually modify, changes made to this file will be lost when this file is regenerated.
 */
import { ApiGen_Base_BaseAudit } from './ApiGen_Base_BaseAudit';
import { ApiGen_Base_CodeType } from './ApiGen_Base_CodeType';
import { ApiGen_Concepts_User } from './ApiGen_Concepts_User';

// LINK: @backend/apimodels/Models/Concepts/User/RegionUserModel.cs
export interface ApiGen_Concepts_RegionUser extends ApiGen_Base_BaseAudit {
  id: number;
  user: ApiGen_Concepts_User | null;
  userId: number;
  region: ApiGen_Base_CodeType<number> | null;
  regionCode: number;
}
