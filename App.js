import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    //ja q queremos q todas as StatusBar fiquem brancas, a gente coloca no App.js, invés de só na Main
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
    {/* light-content deixa o conteudo da statusBar branco */}
    <Routes />
    </>
  );
}
