import { createClient } from '@supabase/supabase-js';
import { Client, ClientFormData } from '../types/client.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL en Anon Key moeten worden geconfigureerd in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client functies
export const getClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }

  return data || [];
};

export const getClientById = async (id: string): Promise<Client | null> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching client:', error);
    throw error;
  }

  return data;
};

export const createClient = async (client: ClientFormData): Promise<Client> => {
  // Transformeer het ClientFormData object naar het juiste formaat voor de database
  const clientData = {
    voornaam: client.voornaam,
    achternaam: client.achternaam,
    aanhef: client.aanhef,
    referentienummer: client.referentienummer,
    email: client.email,
    adres: client.adres,
    postcode: client.postcode,
    woonplaats: client.woonplaats,
    werkgever: {
      naam: client.werkgever_naam,
      contactpersoon: {
        voornaam: client.werkgever_contactpersoon_voornaam,
        achternaam: client.werkgever_contactpersoon_achternaam,
        aanhef: client.werkgever_contactpersoon_aanhef,
        email: client.werkgever_contactpersoon_email,
      },
      adres: client.werkgever_adres,
      postcode: client.werkgever_postcode,
      plaats: client.werkgever_plaats,
    }
  };

  const { data, error } = await supabase
    .from('clients')
    .insert([clientData])
    .select();

  if (error) {
    console.error('Error creating client:', error);
    throw error;
  }

  return data[0];
};

// SQL voor het aanmaken van de clients tabel
export const createClientsTable = `
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voornaam TEXT NOT NULL,
  achternaam TEXT NOT NULL,
  aanhef TEXT NOT NULL,
  referentienummer TEXT NOT NULL,
  email TEXT NOT NULL,
  adres TEXT NOT NULL,
  postcode TEXT NOT NULL,
  woonplaats TEXT NOT NULL,
  werkgever JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;