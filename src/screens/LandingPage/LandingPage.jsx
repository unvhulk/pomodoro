import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
	let navigate = useNavigate();
	return (
		<div className='Landing-container'>
			<div className='Landing-left'>
				<div className='Landing-left-container'>
					<div className='Landing-heading-container'>
						<h1>
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
			{/* <div className='Landing-right'>
				<div className='Landing-img-container	'>
					{/* <img src={logo} alt=''></img> */}
			{/* </div>
			</div> */}
		</div>
	);
};
