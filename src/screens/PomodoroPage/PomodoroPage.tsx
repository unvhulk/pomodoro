import "./PomodoroPage.css";
import Pause from "@mui/icons-material/PauseCircleOutlineOutlined";
import Stop from "@mui/icons-material/StopCircleOutlined";
import Play from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useTask } from "../../contexts/taskContext";
import { TaskContextType } from "../../@types/todo";
import { useLocation } from "react-router-dom";

export const PomodoroPage: React.FC = () => {
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [secondsLeft, setSecondsLeft] = useState<number>(0);
	const [mode, setMode] = useState<string>("work");

	const { task, todoList, setTodoList } = useTask() as TaskContextType;

	const location = useLocation();
	const { taskIndex } = location.state;

	const secondsLeftRef = useRef(secondsLeft);
	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);

	const titleUpdate = () => {
		document.title =
			`${minutes < 10 ? "0" + minutes : minutes}` +
			":" +
			`${seconds < 10 ? "0" + seconds : seconds}`;
	};

	const tick = () => {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	};

	const switchMode = () => {
		const nextMode: string = modeRef.current === "work" ? "break" : "work";
		const nextSeconds: number =
			nextMode === "work"
				? Number(task.time) * 60
				: Number(task.breakTime) * 60;

		setMode(nextMode);
		modeRef.current = nextMode;

		setSecondsLeft(nextSeconds);
		secondsLeftRef.current = nextSeconds;
	};

	const stopTimer = () => {
		setIsPaused(true);
		isPausedRef.current = true;

		setMode("work");
		modeRef.current = "work";

		setSecondsLeft(Number(task.time) * 60);
		secondsLeftRef.current = Number(task.time) * 60;

		return;
	};

	useEffect(() => {
		secondsLeftRef.current = Number(task.time) * 60;
		setSecondsLeft(secondsLeftRef.current);

		const interval: ReturnType<typeof setInterval> = setInterval(() => {
			if (isPausedRef.current) {
				return;
			}
			if (secondsLeftRef.current === 0) {
				if (modeRef.current !== "break") return switchMode();
				else {
					const updateList = todoList.map((item: object, index: number) => {
						return taskIndex === index ? { ...item, complete: true } : item;
					});
					setTodoList(updateList);
					localStorage.setItem("todoList", JSON.stringify(updateList));
					return;
				}
			}

			tick();
		}, 1000);
		return () => clearInterval(interval);
	}, [task]);

	const totalSeconds: number =
		mode === "work" ? Number(task.time) * 60 : Number(task.breakTime) * 60;

	const percentage: number = Math.round((secondsLeft / totalSeconds) * 100);

	let minutes: number = Math.floor(secondsLeft / 60);

	let seconds: number = secondsLeft % 60;

	useEffect(() => {
		titleUpdate();
	}, [minutes, seconds]);

	return (
		<div className='Pomodoro-container' data-testid='pomodoro-page'>
			<div className='Pomodoro-main'>
				<div className='Timer' data-testid='timer'>
					<div className='Stopwatch'>
						<CircularProgressbar
							value={percentage}
							text={
								`${minutes < 10 ? "0" + minutes : minutes}` +
								":" +
								`${seconds < 10 ? "0" + seconds : seconds}`
							}
							styles={buildStyles({
								textColor: "#544dac",
								pathColor: mode === "work" ? "#544dac" : "#7975a7",
							})}
						/>
					</div>
					<div className='Mode'>Mode : {mode.toUpperCase()}</div>
					<div className='Buttons'>
						{isPaused ? (
							<div
								className='Play'
								data-testid='Play'
								onClick={() => {
									setIsPaused(false);
									isPausedRef.current = false;
								}}>
								<Play />
							</div>
						) : (
							<div
								className='Pause'
								data-testid='Pause'
								onClick={() => {
									setIsPaused(true);
									isPausedRef.current = true;
								}}>
								<Pause />
							</div>
						)}

						<div className='Stop' onClick={stopTimer} data-testid='Stop'>
							<Stop />
						</div>
					</div>
				</div>

				<div className='Task'>
					<div className='Title' data-testid='task'>
						{task.title}
					</div>

					<div className='Description'>{task.description}</div>

					<div className='Time'>Focus time : {task.time} Minutes</div>

					<div className='BreakTime'>Break time : {task.breakTime} Minutes</div>
				</div>
			</div>
		</div>
	);
};
