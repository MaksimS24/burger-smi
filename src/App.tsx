import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import Main from "./components/main/main";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Routes, Route} from "react-router-dom";

function App() {

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<Main/>}/>
                    </Routes>
                </main>
            </DndProvider>
        </div>
    );
}

export default App;
