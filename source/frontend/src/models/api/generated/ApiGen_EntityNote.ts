/**
 * File autogenerated by TsGenerator.
 * Do not manually modify, changes made to this file will be lost when this file is regenerated.
 * Generated on 27/11/2023 10:19
 */
import { ApiGen_BaseAudit } from './ApiGen_BaseAudit';
import { ApiGen_Note } from './ApiGen_Note';
import { ApiGen_NoteParent } from './ApiGen_NoteParent';

// LINK: @backend/apimodels/Models/Concepts/Note/EntityNoteModel.cs
export interface ApiGen_EntityNote extends ApiGen_BaseAudit {
  id: number;
  parent: ApiGen_NoteParent | null;
  note: ApiGen_Note | null;
}