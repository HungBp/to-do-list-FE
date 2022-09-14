import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Error from "./components/Error";
import Header from './components/Header';
import TodoList from './components/TodoList';
import Trash from "./components/Trash";
import ErrorContextProvider from "./context/ErrorContextProvider";

function App() {
  return (
    <BrowserRouter>
      <ErrorContextProvider>
        <div className="App">
          <Header/>
          <Routes>
            <Route path="/" element={<TodoList/>}/>
            <Route path="trash" element={<Trash/>}/>
          </Routes>
          <Error/>
        </div>
      </ErrorContextProvider>
    </BrowserRouter>
  );
}

export default App;
