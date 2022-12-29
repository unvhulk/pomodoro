import React from "react";
import "./LandingPage.css";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const LandingPage: React.FC = () => {
	let navigate = useNavigate() as NavigateFunction;
	return (
		<div className='Landing-container' data-testid='landing-page'>
			<div className='Landing-left'>
				<div className='Landing-left-container'>
					<div className='Landing-heading-container'>
						<h1 data-testid='heading'>
							<span>Discipline</span> equals <span>Freedom</span>
						</h1>
					</div>
					<div className='Landing-middle-container'>
						<div className='L-h2-container'>
							<h2>Meet your modern</h2>
							<h2 style={{ color: "#5348c7" }}>Pomodoro App</h2>
						</div>
						<p>
							The pomodoro technique is a time management method, which uses
							fix-timed intervals of work and breaks (similar to your time as a
							child at school). The work period is completely focused on one
							particular task. No distractions (food, chats, email) are allowed
							during that time. After a successful work period, you can take a
							short break and relax your brain.
						</p>
					</div>
					<div className='Landing-btn-container'>
						<div className='Landing-btn' onClick={() => navigate("/todos")}>
							Get Started
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
