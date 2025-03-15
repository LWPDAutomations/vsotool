import React from 'react';
import Card from '../components/ui/Card';

const HelpPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Gebruiksaanwijzing VSO Beoordelings Systeem</h1>
      <p className="text-gray-700">
        Welkom bij het VSO Beoordelings Systeem van De Nationale Adviesbalie. 
        Deze handleiding helpt u stap voor stap bij het gebruik van het platform.
      </p>

      {/* Inhoudsopgave */}
      <Card title="Inhoudsopgave">
        <ul className="list-decimal pl-5 space-y-2">
          <li><a href="#inloggen" className="text-nab-orange hover:underline">Inloggen op het platform</a></li>
          <li><a href="#client-toevoegen" className="text-nab-orange hover:underline">Een nieuwe cliënt toevoegen</a></li>
          <li><a href="#client-database" className="text-nab-orange hover:underline">De cliëntendatabase gebruiken</a></li>
          <li><a href="#vso-beoordeling" className="text-nab-orange hover:underline">Een VSO beoordeling aanvragen</a></li>
          <li><a href="#documenten-uploaden" className="text-nab-orange hover:underline">Documenten uploaden</a></li>
        </ul>
      </Card>

      {/* Inloggen */}
      <Card id="inloggen" title="1. Inloggen op het platform">
        <div className="space-y-4">
          <p>
            Om toegang te krijgen tot het VSO Document Systeem, moet u eerst inloggen met uw gebruikersnaam en wachtwoord.
          </p>
          
          <div className="steps-container">
            <h3 className="font-medium text-lg mb-2">Stappen:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <p>Ga naar de inlogpagina.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/inlogscherm.png" 
                    alt="Inlogpagina van het VSO Document Systeem" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                  <p className="text-center text-sm text-gray-500 mt-2">
                    [url van de pagina]
                  </p>
                </div>
              </li>
              <li>
                <p>Voer uw gebruikersnaam in het veld "Gebruikersnaam" in.</p>
              </li>
              <li>
                <p>Voer uw wachtwoord in het veld "Wachtwoord" in.</p>
              </li>
              <li>
                <p>Klik op de knop "Inloggen".</p>
              </li>
              <li>
                <p>Na succesvol inloggen wordt u doorgestuurd naar de hoofdpagina van het systeem.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/homepagina.png" 
                    alt="Hoofdpagina na inloggen" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-800">Tip:</h4>
            <p className="text-blue-700">
              Als u uw wachtwoord bent vergeten of problemen ondervindt bij het inloggen, neem dan contact op met de beheerder van het systeem.
            </p>
          </div>
        </div>
      </Card>

      {/* Cliënt toevoegen */}
      <Card id="client-toevoegen" title="2. Een nieuwe cliënt toevoegen">
        <div className="space-y-4">
          <p>
            Voordat u een VSO beoordeling kunt aanvragen, moet u eerst de cliëntgegevens invoeren in het systeem.
          </p>
          
          <div className="steps-container">
            <h3 className="font-medium text-lg mb-2">Stappen:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <p>Navigeer naar "Cliënt toevoegen" via het hoofdmenu bovenaan de pagina.</p>
              </li>
              <li>
                <p>U ziet nu een formulier om een nieuwe cliënt toe te voegen.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/homepagina.png" 
                    alt="Formulier voor toevoegen cliënt" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Vul alle verplichte velden in (aangegeven met een *). Deze omvatten:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cliëntgegevens (voornaam, achternaam, aanhef, etc.)</li>
                  <li>Werkgevergegevens</li>
                  <li>Contactpersoon werkgever</li>
                </ul>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/ingevuld formulier.png" 
                    alt="Ingevuld cliëntformulier" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Klik op de knop "Cliënt opslaan" onderaan het formulier.</p>
              </li>
              <li>
                <p>Na succesvol toevoegen verschijnt er een bevestigingsbericht en wordt de cliënt toegevoegd aan de database.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/client aangemaakt.png" 
                    alt="Bevestiging van cliënt toevoegen" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-800">Tip:</h4>
            <p className="text-blue-700">
              Zorg ervoor dat u alle gegevens correct invoert. De e-mailadressen en postcodes worden gecontroleerd op een geldig formaat.
            </p>
          </div>
        </div>
      </Card>

      {/* Cliëntendatabase */}
      <Card id="client-database" title="3. De cliëntendatabase gebruiken">
        <div className="space-y-4">
          <p>
            In de cliëntendatabase kunt u alle toegevoegde cliënten bekijken, zoeken en beheren.
          </p>
          
          <div className="steps-container">
            <h3 className="font-medium text-lg mb-2">Stappen:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <p>Klik op "Cliëntendatabase" in het hoofdmenu.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/3.1.png" 
                    alt="Menu met Cliëntendatabase optie" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>U ziet nu een overzicht van alle cliënten in het systeem.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/3.2.png" 
                    alt="Cliëntendatabase overzicht" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p><strong>Zoeken naar een cliënt:</strong> Gebruik het zoekveld bovenaan om te zoeken op naam, referentie, e-mail of werkgever.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/3.3.png" 
                    alt="Zoekfunctie voor cliënten" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
      
                </div>
              </li>
              <li>
                <p><strong>Sorteren:</strong> Klik op een kolomkop om de lijst te sorteren op die eigenschap.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/3.4.png" 
                    alt="Sorteren van cliëntenlijst" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
              
                </div>
              </li>
              <li>
                <p><strong>Documenten bekijken:</strong> Klik op de knop "Documenten" naast een cliënt om naar de documentenpagina te gaan.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/3.5.png" 
                    alt="Documenten knop bij cliënt" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p><strong>Cliënt verwijderen:</strong> Klik op de knop "Verwijderen" naast een cliënt en bevestig in het dialoogvenster.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/3.6.png" 
                    alt="Bevestigingsdialoog voor verwijderen" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-md">
            <h4 className="font-medium text-yellow-800">Let op:</h4>
            <p className="text-yellow-700">
              Het verwijderen van een cliënt is permanent en kan niet ongedaan worden gemaakt. Alle gegevens en documenten van deze cliënt worden definitief verwijderd.
            </p>
          </div>
        </div>
      </Card>

      {/* VSO Beoordeling */}
      <Card id="vso-beoordeling" title="4. Een VSO beoordeling aanvragen">
        <div className="space-y-4">
          <p>
            In deze sectie leert u hoe u een VSO beoordeling kunt aanvragen voor een cliënt.
          </p>
          
          <div className="steps-container">
            <h3 className="font-medium text-lg mb-2">Stappen:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <p>Klik op "VSO Beoordelen" in het hoofdmenu.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/4.1.png" 
                    alt="Menu met VSO Beoordelen optie" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Selecteer een cliënt uit de lijst of zoek een cliënt met behulp van het zoekveld.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/4.2.png" 
                    alt="Cliëntselectie pagina" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Na het selecteren van een cliënt verschijnen de cliëntgegevens op het scherm.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/4.3.png" 
                    alt="Geselecteerde cliëntgegevens" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Als u een andere cliënt wilt kiezen, klik dan op de knop "Andere cliënt kiezen" rechts bovenaan.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/4.4.png" 
                    alt="Andere cliënt kiezen knop" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Nu kunt u documenten toevoegen voor beoordeling (zie volgende sectie).</p>
              </li>
              <li>
                <p>Nadat u alle benodigde documenten heeft toegevoegd, klikt u op de knop "Beoordeling aanvragen".</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/4.6.png" 
                    alt="Beoordeling aanvragen knop" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>U ontvangt een bevestiging dat de beoordeling is aangevraagd. De resultaten worden binnen 5 minuten naar uw e-mail gestuurd.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/4.7.png" 
                    alt="Bevestiging van beoordeling aanvraag" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-800">Tip:</h4>
            <p className="text-blue-700">
              Voor een goede beoordeling is het belangrijk om alle relevante documenten toe te voegen. Zorg ervoor dat de documenten duidelijk leesbaar zijn.
            </p>
          </div>
        </div>
      </Card>

      {/* Documenten uploaden */}
      <Card id="documenten-uploaden" title="5. Documenten uploaden">
        <div className="space-y-4">
          <p>
            Om een VSO te laten beoordelen, moet u de relevante documenten uploaden.
          </p>
          
          <div className="steps-container">
            <h3 className="font-medium text-lg mb-2">Stappen:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <p>In het formulier voor VSO beoordeling, selecteer eerst het type document dat u wilt uploaden.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/5.1.png" 
                    alt="Documenttype selectie" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Klik op "Bestand kiezen" om een bestand van uw computer te selecteren.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/5.2.png" 
                    alt="Bestand kiezen knop" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">Ondersteunde bestandsformaten: .jpg, .jpeg, .png, .pdf, .doc, .docx</p>
              </li>
              <li>
                <p>U kunt meerdere bestanden toevoegen door nogmaals op "Bestand kiezen" te klikken.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/5.3.png" 
                    alt="Meerdere bestanden geselecteerd" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Als u een bestand wilt verwijderen uit de selectie, klik dan op het kruisje naast het bestand.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/5.4.png" 
                    alt="Bestand verwijderen uit selectie" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Klik op "Document toevoegen" om de geselecteerde bestanden toe te voegen.</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/5.5.png" 
                    alt="Document toevoegen knop" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>U ziet nu de toegevoegde documenten in de lijst "Toegevoegde documenten".</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/5.6.png" 
                    alt="Lijst met toegevoegde documenten" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
              <li>
                <p>Herhaal dit proces voor alle documenten die u wilt toevoegen.</p>
              </li>
              <li>
                <p>Als u een document uit de lijst wilt verwijderen, klik dan op het kruisje naast het document in de lijst "Toegevoegde documenten".</p>
                <div className="bg-gray-100 p-4 my-2 rounded-md">
                  <img 
                    src="/assets/help/5.7.png" 
                    alt="Document verwijderen uit lijst" 
                    className="mx-auto border border-gray-300 rounded-md max-w-full"
                  />
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-medium text-green-800">Belangrijke documenten voor VSO beoordeling:</h4>
            <ul className="list-disc pl-5 space-y-1 text-green-700">
              <li>Vaststellingsovereenkomst (VSO)</li>
              <li>Arbeidsovereenkomst</li>
              <li>Loonstroken</li>
              <li>Andere relevante documenten</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-md mt-4">
            <h4 className="font-medium text-yellow-800">Let op:</h4>
            <p className="text-yellow-700">
              Zorg ervoor dat alle bestanden duidelijk leesbaar zijn. Onvolledige of onleesbare documenten kunnen leiden tot vertraging en beperkte kwaliteit in de beoordeling.
            </p>
          </div>
        </div>
      </Card>

      {/* Extra informatie */}
      <Card title="Hulp en ondersteuning">
        <p className="mb-4">
          Heeft u vragen of loopt u tegen problemen aan bij het gebruik van het VSO Beoordelings Systeem? Neem dan contact op met onze helpdesk:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>E-mail:</strong> <a href="mailto:lars.duinhouwer@promptgorillas.com" className="text-nab-orange hover:underline">lars.duinhouwer@promptgorillas.com</a></li>
          <li><strong>Telefoon:</strong> 06-10 54 10 60 (bereikbaar op werkdagen van 9:00 tot 17:00 uur)</li>
        </ul>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500 italic">
            Deze handleiding is laatst bijgewerkt op 14 maart 2025. Het VSO Beoordelings Systeem wordt regelmatig bijgewerkt, dus sommige schermafbeeldingen kunnen afwijken van de huidige versie.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default HelpPage;