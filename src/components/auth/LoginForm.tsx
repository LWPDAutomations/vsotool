import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null); // Clear previous error

    try {
      const success = login(username, password);
      
      if (success) {
        addNotification('success', 'Succesvol ingelogd');
        navigate('/clients');
      } else {
        setLoginError('Ongeldige gebruikersnaam of wachtwoord');
        addNotification('error', 'Ongeldige inloggegevens');
      }
    } catch (error) {
      setLoginError('Er is een fout opgetreden bij het inloggen');
      addNotification('error', 'Er is een fout opgetreden bij het inloggen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <img 
          src="/assets/logo.png" 
          alt="De Nationale Adviesbalie" 
          className="h-16"
        />
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">
      Welkom bij het VSO-beoordelings platform van De Nationale Adviesbalie
      </h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Gebruikersnaam"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          label="Wachtwoord"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {loginError && (
          <div className="mt-2 mb-4 text-sm text-red-500">
            {loginError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-4"
          isLoading={isLoading}
        >
          Inloggen
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;