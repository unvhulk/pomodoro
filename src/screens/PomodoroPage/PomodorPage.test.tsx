import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PomodoroPage } from "./PomodoroPage";
import { taskContext } from "../../contexts/taskContext";
import { Todo } from "../../@types/todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodosPage } from "../TodosPage/TodosPage";
import { act } from "react-test-renderer";

describe("PomodoroPage", () => {
	let task: Todo;
	let todoList: Todo[];
	let setTodoList: React.Dispatch<Todo[]>;
	let setTask: React.Dispatch<Todo>;

	todoList = [
		{
			title: "Task 1",
			description: "Description for task 1",
			time: "25",
			breakTime: "15",
			complete: false,
		},
		{
			title: "Task 2",
			description: "Description for task 2",
			time: "60",
			breakTime: "15",
			complete: false,
		},
	];

	setTodoList = jest.fn();
	setTask = jest.fn();

	const renderPomodoroPage = () => {
		return render(
			<taskContext.Provider value={{ task, setTask, todoList, setTodoList }}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<TodosPage />} />
						<Route path='/pomodoro' element={<PomodoroPage />} />
					</Routes>
				</BrowserRouter>
			</taskContext.Provider>
		);
	};

	jest.useFakeTimers();

	it("should render the Pomodoro timer with the correct initial values", () => {
		task = todoList[0];
		renderPomodoroPage();
		fireEvent.click(screen.getByText("Task 1"));

		// The timer should be in work mode
		expect(screen.getByText("Mode : WORK")).toBeInTheDocument();

		// The timer should show the correct time remaining in the session
		expect(screen.getByText("25:00")).toBeInTheDocument();
	});

	it("should switch to break mode when the work session is complete", async () => {
		task = todoList[0];
		renderPomodoroPage();
		fireEvent.click(screen.getByText("Task 1"));

		fireEvent.click(screen.getByTestId("Play"));

		// Fast-forward the timer to the end of the work session
		act(() => {
			jest.advanceTimersByTime(25 * 60 * 1000 + 1000);
		});

		// Wait for the timer to switch to break mode
		await waitFor(() => {
			expect(screen.getByText("Mode : BREAK")).toBeInTheDocument();
		});
	});

	it("should update the task as complete when the break session is complete", async () => {
		task = todoList[0];
		renderPomodoroPage();
		fireEvent.click(screen.getByText("Task 1"));

		fireEvent.click(screen.getByTestId("Play"));

		// Fast-forward the timer to the end of the break session
		act(() => {
			jest.advanceTimersByTime(30 * 60 * 1000 + 1000);
		});

		// Wait for the timer to stop
		expect(screen.getByText("Mode : BREAK")).toBeInTheDocument();
		// The todo list should have been updated to mark the task as complete
		expect(setTodoList).toHaveBeenCalledWith([
			{
				title: "Task 1",
				description: "Description for task 1",
				time: "25",
				breakTime: "15",
				complete: true,
			},
			{
				title: "Task 2",
				description: "Description for task 2",
				time: "60",
				breakTime: "15",
				complete: false,
			},
		]);
	});

	it("should pause and resume the timer when the pause button is clicked", () => {
		task = todoList[0];
		renderPomodoroPage();
		fireEvent.click(screen.getByText("Task 1"));

		// Click the resume button
		fireEvent.click(screen.getByTestId("Play"));

		// The timer should be resumed
		expect(screen.getByTestId("Pause")).toBeInTheDocument();

		// Click the pause button
		fireEvent.click(screen.getByTestId("Pause"));

		// The timer should be paused
		expect(screen.getByTestId("Play")).toBeInTheDocument();

		// Click the resume button
		fireEvent.click(screen.getByTestId("Play"));

		// The timer should be resumed
		expect(screen.getByTestId("Pause")).toBeInTheDocument();
	});

	it("should reset the timer to its initial state when the stop button is clicked", () => {
		task = todoList[0];
		renderPomodoroPage();
		fireEvent.click(screen.getByText("Task 1"));

		// Fast-forward the timer to the end of the work session
		act(() => {
			jest.advanceTimersByTime(25 * 60 * 1000);
		});
		// Click the stop button
		fireEvent.click(screen.getByTestId("Stop"));

		// The timer should be reset to its initial state
		expect(screen.getByText("Mode : WORK")).toBeInTheDocument();
		expect(screen.getByText("25:00")).toBeInTheDocument();
	});
});
