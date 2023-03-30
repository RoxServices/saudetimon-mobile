import React from 'react';
import { PatientProvider } from './src/contexts/patientContext';

import Routes from './src/routes';

const App: React.FC = () => (
  <PatientProvider>
    <Routes />
  </PatientProvider>
);

export default App;
