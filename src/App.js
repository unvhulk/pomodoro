import { Routes, Route } from "react-router-dom";
import { LandingPage, TodosPage, PomodoroPage } from "./screens";
import "./App.css";
function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/todos' element={<TodosPage />} />
				<Route path='/pomodoro' element={<PomodoroPage />} />
			</Routes>
		</div>
	);
}

export default App;
