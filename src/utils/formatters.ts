/**
 * Formatteert een postcode naar het Nederlandse format (1234 AB)
 */
export const formatPostcode = (postcode: string): string => {
    // Verwijder eerst alle spaties en maak hoofdletters
    const cleanedPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    
    // Check of het een geldige postcode is
    const isValidPostcode = /^[1-9][0-9]{3}[A-Z]{2}$/.test(cleanedPostcode);
    
    if (!isValidPostcode) {
      return postcode; // Return original if not valid
    }
    
    // Voeg een spatie toe tussen cijfers en letters
    return `${cleanedPostcode.slice(0, 4)} ${cleanedPostcode.slice(4)}`;
  };
  
  /**
   * Formatteert een datum naar dag-maand-jaar formaat
   */
  export const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  
  /**
   * Truncteer een lange tekst en voeg "..." toe indien nodig
   */
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.slice(0, maxLength) + '...';
  };
  
  /**
   * Genereert een bestandsnaam op basis van documenttype en index
   */
  export const formatDocumentName = (documentType: string, index: number): string => {
    if (index === 0) {
      return documentType;
    }
    
    return `${documentType} (${index})`;
  };
  
  /**
   * Formatteert een bestandsgrootte naar een leesbaar formaat (KB, MB, etc.)
   */
  export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };