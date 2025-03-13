export interface Client {
    id: string;
    voornaam: string;
    achternaam: string;
    aanhef: string;
    referentienummer: string;
    email: string;
    adres: string;
    postcode: string;
    woonplaats: string;
    werkgever: {
      naam: string;
      contactpersoon: {
        voornaam: string;
        achternaam: string;
        aanhef: string;
        email: string;
      };
      adres: string;
      postcode: string;
      plaats: string;
    };
    created_at: string;
  }
  
  export interface ClientFormData {
    voornaam: string;
    achternaam: string;
    aanhef: string;
    referentienummer: string;
    email: string;
    adres: string;
    postcode: string;
    woonplaats: string;
    werkgever_naam: string;
    werkgever_contactpersoon_voornaam: string;
    werkgever_contactpersoon_achternaam: string;
    werkgever_contactpersoon_aanhef: string;
    werkgever_contactpersoon_email: string;
    werkgever_adres: string;
    werkgever_postcode: string;
    werkgever_plaats: string;
  }