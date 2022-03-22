import React from 'react';
//import logo from './logo.svg';
const logo = require("./logo.svg") as string;

import './App.css';
import { EditorApp } from 'react-draftjs-editor';

function App() {
  return (
    <div className="App">
      <EditorApp />
    </div>
  );
}

export default App;
