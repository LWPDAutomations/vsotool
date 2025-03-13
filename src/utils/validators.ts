/**
 * Valideert een Nederlands e-mailadres
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  /**
   * Valideert een Nederlands postcode
   */
  export const isValidPostcode = (postcode: string): boolean => {
    // Verwijder alle spaties
    const cleanedPostcode = postcode.replace(/\s+/g, '');
    
    // Controleer formaat: 4 cijfers gevolgd door 2 letters
    // Eerste cijfer mag niet 0 zijn
    // Laatste twee karakters mogen geen SS, SD of SA zijn
    const postcodeRegex = /^[1-9][0-9]{3}(?!SA|SD|SS)[A-Z]{2}$/i;
    
    return postcodeRegex.test(cleanedPostcode);
  };
  
  /**
   * Valideert of alle verplichte velden zijn ingevuld
   */
  export const validateRequiredFields = (data: Record<string, any>, requiredFields: string[]): string[] => {
    const missingFields: string[] = [];
    
    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        missingFields.push(field);
      }
    }
    
    return missingFields;
  };
  
  /**
   * Valideert een bestandstype tegen een lijst van toegestane types
   */
  export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
    const fileType = file.type;
    return allowedTypes.includes(fileType);
  };
  
  /**
   * Valideert een bestandsgrootte tegen een maximum grootte
   */
  export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  };