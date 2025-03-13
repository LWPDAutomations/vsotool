export type DocumentType = 
  | 'VSO' 
  | 'Arbeidsovereenkomst' 
  | 'Loonstrook' 
  | 'Identiteitsbewijs' 
  | 'Overig';

export interface DocumentUpload {
  type: DocumentType;
  files: File[];
}

export interface DocumentSubmission {
  clientId: string;
  documents: DocumentUpload[];
}

export interface ProcessedDocument {
  name: string;
  originalName: string;
  type: DocumentType;
  fileContent: string; // base64
}