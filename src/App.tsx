import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import Main from "./components/main/main";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ModalOverlay from "./components/modal/modal-overlay/modal-overlay";


function App() {

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <AppHeader/>
                <Main/>
            </DndProvider>
        </div>
    );
}

export default App;
