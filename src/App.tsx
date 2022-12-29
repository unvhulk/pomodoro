import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { LandingPage, TodosPage, PomodoroPage } from "./screens";
import "./App.css";
const App: React.FC = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/todos' element={<TodosPage />} />
					<Route path='/pomodoro' element={<PomodoroPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
