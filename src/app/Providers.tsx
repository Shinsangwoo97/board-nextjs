'use client';
import { ThemeProvider } from 'next-themes';
import { jwtDecode } from 'jwt-decode';

const axios = require('axios');

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      {children}
    </ThemeProvider>
  );
};

export default Providers;
