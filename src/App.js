import {createContext, useState} from 'react'

import "./App.css";
import MyAxios from "./components/MyAxios";
import MyContext from './components/MyContext';
import { MyForm } from "./components/MyForm";


export const CountContext = createContext()

function App() {
  const [count, setCount] = useState(0)

  return (
    <CountContext.Provider value={{count, setCount}}>
      <MyForm />
      <MyAxios />
      <MyContext />
    </CountContext.Provider>
  );
}

export default App;
