import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import Main from "./components/main/main";
import ModalOverlay from "./components/modal/modal-overlay/modal-overlay";

function App() {

    return (
        <div className="App">
            <AppHeader/>
            <Main/>
        </div>
    );
}

export default App;
