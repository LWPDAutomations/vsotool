import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClientFormData } from '../../types/client.types';
import { createClient } from '../../services/supabase';
import { useNotification } from '../../context/NotificationContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const aanhefOptions = [
  { value: 'Dhr.', label: 'Dhr.' },
  { value: 'Mevr.', label: 'Mevr.' },
  { value: 'Anders', label: 'Anders' },
];

interface ClientFormProps {
  onClientCreated: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onClientCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotification();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClientFormData>();

  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true);
    
    try {
      await createClient(data);
      addNotification('success', 'Cliënt succesvol aangemaakt');
      reset();
      onClientCreated();
    } catch (error) {
      console.error('Error creating client:', error);
      addNotification('error', 'Er is een fout opgetreden bij het aanmaken van de cliënt');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title="Nieuwe Cliënt">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className="col-span-1 md:col-span-2 mt-2 mb-1">Cliëntgegevens</h3>

          <Input
            label="Voornaam"
            {...register('voornaam', { required: 'Voornaam is verplicht' })}
            error={errors.voornaam?.message}
            required
          />

          <Input
            label="Achternaam"
            {...register('achternaam', { required: 'Achternaam is verplicht' })}
            error={errors.achternaam?.message}
            required
          />

          <Select
            label="Aanhef"
            options={aanhefOptions}
            {...register('aanhef', { required: 'Aanhef is verplicht' })}
            error={errors.aanhef?.message}
            required
          />

          <Input
            label="Referentienummer"
            {...register('referentienummer', { required: 'Referentienummer is verplicht' })}
            error={errors.referentienummer?.message}
            required
          />

          <Input
            label="E-mailadres"
            type="email"
            {...register('email', { 
              required: 'E-mailadres is verplicht',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ongeldig e-mailadres'
              }
            })}
            error={errors.email?.message}
            required
          />

          <Input
            label="Straatnaam en huisnummer"
            {...register('adres', { required: 'Adres is verplicht' })}
            error={errors.adres?.message}
            required
          />

          <Input
            label="Postcode"
            {...register('postcode', { 
              required: 'Postcode is verplicht',
              pattern: {
                value: /^[1-9][0-9]{3} ?(?!SA|SD|SS)[A-Z]{2}$/i,
                message: 'Ongeldige postcode'
              }
            })}
            error={errors.postcode?.message}
            required
          />

          <Input
            label="Woonplaats"
            {...register('woonplaats', { required: 'Woonplaats is verplicht' })}
            error={errors.woonplaats?.message}
            required
          />

          <h3 className="col-span-1 md:col-span-2 mt-4 mb-1">Werkgevergegevens</h3>

          <Input
            label="Naam van de werkgever"
            {...register('werkgever_naam', { required: 'Naam werkgever is verplicht' })}
            error={errors.werkgever_naam?.message}
            required
          />

          <h3 className="col-span-1 md:col-span-2 mt-4 mb-1">Contactpersoon werkgever</h3>

          <Input
            label="Voornaam contactpersoon"
            {...register('werkgever_contactpersoon_voornaam', { required: 'Voornaam contactpersoon is verplicht' })}
            error={errors.werkgever_contactpersoon_voornaam?.message}
            required
          />

          <Input
            label="Achternaam contactpersoon"
            {...register('werkgever_contactpersoon_achternaam', { required: 'Achternaam contactpersoon is verplicht' })}
            error={errors.werkgever_contactpersoon_achternaam?.message}
            required
          />

          <Select
            label="Aanhef contactpersoon"
            options={aanhefOptions}
            {...register('werkgever_contactpersoon_aanhef', { required: 'Aanhef contactpersoon is verplicht' })}
            error={errors.werkgever_contactpersoon_aanhef?.message}
            required
          />

          <Input
            label="E-mailadres contactpersoon"
            type="email"
            {...register('werkgever_contactpersoon_email', { 
              required: 'E-mailadres contactpersoon is verplicht',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ongeldig e-mailadres'
              }
            })}
            error={errors.werkgever_contactpersoon_email?.message}
            required
          />

          <Input
            label="Straatnaam en huisnummer werkgever"
            {...register('werkgever_adres', { required: 'Adres werkgever is verplicht' })}
            error={errors.werkgever_adres?.message}
            required
          />

          <Input
            label="Postcode werkgever"
            {...register('werkgever_postcode', { 
              required: 'Postcode werkgever is verplicht',
              pattern: {
                value: /^[1-9][0-9]{3} ?(?!SA|SD|SS)[A-Z]{2}$/i,
                message: 'Ongeldige postcode'
              }
            })}
            error={errors.werkgever_postcode?.message}
            required
          />

          <Input
            label="Plaats werkgever"
            {...register('werkgever_plaats', { required: 'Plaats werkgever is verplicht' })}
            error={errors.werkgever_plaats?.message}
            required
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="secondary"
            className="mr-2"
            onClick={() => reset()}
          >
            Annuleren
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            Cliënt opslaan
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ClientForm;