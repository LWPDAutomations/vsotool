export type DocumentType = 
  | 'VSO' // Keeping the original name for backward compatibility
  | 'Vaststellingsovereenkomst'
  | 'Begeleidend schrijven wg bij vso'
  | 'Aangeleverde info van werknemer'
  | 'Arbeidsovereenkomst'
  | 'Loonstrook'
  | 'CAO'
  | 'Personeelshandboek'
  | 'Telefoonnotitie n.a.v. intake'
  | 'Rapport bedrijfsarts'
  | 'WIA-beschikking'
  | 'Bonusregeling'
  | 'Autoregeling'
  | 'Sociaal plan'
  | 'Correspondentie tussen wg-wn'
  | 'Beoordelings/functioneringsverslag'
  | 'Overig'; // Keep the "Overig" option for any other document types

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
  mimeType: string; // MIME type field
  fileContent: string; // base64
}