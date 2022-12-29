import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TodosPage } from "./TodosPage";
import { taskContext } from "../../contexts/taskContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Todo } from "../../@types/todo";
import { PomodoroPage } from "../PomodoroPage/PomodoroPage";

describe("TodosPage", () => {
	let todoList: Todo[];
	let task: Todo;
	let setTask: React.Dispatch<Todo>;
	let setTodoList: React.Dispatch<Todo[]>;

	beforeEach(() => {
		todoList = [
			{
				title: "Task 1",
				description: "Description for task 1",
				time: "30",
				breakTime: "5",
				complete: false,
			},
			{
				title: "Task 2",
				description: "Description for task 2",
				time: "25",
				breakTime: "10",
				complete: true,
			},
		];
	});
	setTask = jest.fn();
	setTodoList = jest.fn();

	const renderElement = () => {
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

	it("should render the main section with the todo list", () => {
		renderElement();

		const mainSection = screen.getByTestId("todos-page");
		expect(mainSection).toBeInTheDocument();

		const todoListItems = screen.getAllByTestId("todos-list");
		expect(todoListItems).toHaveLength(2);
	});

	it("should open the modal when the add button is clicked", async () => {
		renderElement();

		const addButton = screen.getByText("+");
		fireEvent.click(addButton);

		const modal = screen.getByTestId("todos-modal");
		expect(modal).toBeInTheDocument();
	});

	it("should edit a todo when the edit button is clicked", async () => {
		renderElement();

		const editButtons = screen.getAllByTestId("edit-button");
		fireEvent.click(editButtons[0]);

		const modal = screen.getByTestId("todos-modal");
		expect(modal).toBeInTheDocument();
		const titleInput = screen.getByTestId("title-input") as HTMLInputElement;
		expect(titleInput.value).toBe("Task 1");
	});

	it("should delete a todo when the delete button is clicked", async () => {
		renderElement();

		const deleteButtons = screen.getAllByTestId("delete-button");
		fireEvent.click(deleteButtons[0]);

		expect(setTodoList).toHaveBeenCalledWith([
			{
				title: "Task 2",
				description: "Description for task 2",
				time: "25",
				breakTime: "10",
				complete: true,
			},
		]);
	});

	it("should navigate to the pomodoro page and set the task in the context when the start button is clicked", () => {
		task = todoList[0];

		renderElement();

		const startButtons = screen.getAllByTestId("start-button");
		fireEvent.click(startButtons[0]);

		expect(window.location.pathname).toBe("/pomodoro");
		expect(setTask).toHaveBeenCalledWith(todoList[0]);
	});
});
