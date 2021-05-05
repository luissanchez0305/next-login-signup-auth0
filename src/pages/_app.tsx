import React, { ReactElement } from 'react';
import App from 'next/app';
import { AuthProvider } from '../components/providers/Auth';

class MyApp extends App {
  render(): ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}

export default MyApp;
