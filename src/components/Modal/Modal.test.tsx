import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal component", () => {
	const todoList = [
		{
			title: "Todo 1",
			description: "Description 1",
			time: "60",
			breakTime: "15",
			complete: true,
		},
		{
			title: "Todo 2",
			description: "Description 2",
			time: "30",
			breakTime: "5",
			complete: false,
		},
	];
	const setTodoList = jest.fn();
	const onClose = jest.fn();
	const setTodo = jest.fn();
	const todo = {
		title: "Todo 1",
		description: "Description 1",
		time: "60",
		breakTime: "15",
		complete: true,
	};
	const edit = { index: -1, toggle: false };

	it("renders the modal form", () => {
		render(
			<Modal
				onClose={onClose}
				setTodoList={setTodoList}
				todoList={todoList}
				edit={edit}
				setTodo={setTodo}
				todo={todo}
			/>
		);

		const titleInput = screen.getByPlaceholderText("Add Title");
		const descriptionInput = screen.getByPlaceholderText("Add Description");
		const timeInput = screen.getByPlaceholderText("Add Time (Minutes)");
		const breakTimeInput = screen.getByPlaceholderText(
			"Add Break Time (Minutes)"
		);
		const submitButton = screen.getByText("Add");
		expect(titleInput).toBeInTheDocument();
		expect(descriptionInput).toBeInTheDocument();
		expect(timeInput).toBeInTheDocument();
		expect(breakTimeInput).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	it("displays an error message if the title is not provided", async () => {
		const todo = {
			title: "",
			description: "Description 3",
			time: "60",
			breakTime: "15",
			complete: true,
		};

		render(
			<Modal
				onClose={onClose}
				setTodoList={setTodoList}
				todoList={todoList}
				edit={edit}
				setTodo={setTodo}
				todo={todo}
			/>
		);
		const titleInput = screen.getByPlaceholderText("Add Title");
		const descriptionInput = screen.getByPlaceholderText("Add Description");
		const timeInput = screen.getByPlaceholderText("Add Time (Minutes)");
		const breakTimeInput = screen.getByPlaceholderText(
			"Add Break Time (Minutes)"
		);
		const submitButton = screen.getByText("Add");

		fireEvent.change(titleInput, { target: { value: "" } });
		fireEvent.change(descriptionInput, { target: { value: "Description 3" } });
		fireEvent.change(timeInput, { target: { value: 60 } });
		fireEvent.change(breakTimeInput, { target: { value: 15 } });
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(screen.getByText("Title is required")).toBeInTheDocument();
		});
	});

	it("displays an error message if the description is not provided", async () => {
		const todo = {
			title: "Todo 2",
			description: "",
			time: "60",
			breakTime: "15",
			complete: true,
		};
		render(
			<Modal
				onClose={onClose}
				setTodoList={setTodoList}
				todoList={todoList}
				edit={edit}
				setTodo={setTodo}
				todo={todo}
			/>
		);
		const titleInput = screen.getByPlaceholderText("Add Title");
		const descriptionInput = screen.getByPlaceholderText("Add Description");
		const timeInput = screen.getByPlaceholderText("Add Time (Minutes)");
		const breakTimeInput = screen.getByPlaceholderText(
			"Add Break Time (Minutes)"
		);
		const submitButton = screen.getByText("Add");
		fireEvent.change(titleInput, { target: { value: "Todo 2" } });
		fireEvent.change(descriptionInput, { target: { value: "" } });
		fireEvent.change(timeInput, { target: { value: 60 } });
		fireEvent.change(breakTimeInput, { target: { value: 15 } });
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(screen.getByText("Description is required")).toBeInTheDocument();
		});
	});

	it("displays an error message if the time is not provided", async () => {
		const todo = {
			title: "",
			description: "Description 1",
			time: "",
			breakTime: "15",
			complete: true,
		};
		render(
			<Modal
				onClose={onClose}
				setTodoList={setTodoList}
				todoList={todoList}
				edit={edit}
				setTodo={setTodo}
				todo={todo}
			/>
		);
		const titleInput = screen.getByPlaceholderText("Add Title");
		const descriptionInput = screen.getByPlaceholderText("Add Description");

		const breakTimeInput = screen.getByPlaceholderText(
			"Add Break Time (Minutes)"
		);
		const submitButton = screen.getByText("Add");
		fireEvent.change(titleInput, { target: { value: "Todo 3" } });
		fireEvent.change(descriptionInput, { target: { value: "Description 3" } });
		fireEvent.change(breakTimeInput, { target: { value: 15 } });
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(screen.getByText("Timer for task is requied")).toBeInTheDocument();
		});
	});

	it("displays an error message if the break time is not provided", async () => {
		const todo = {
			title: "",
			description: "Description 1",
			time: "60",
			breakTime: "",
			complete: true,
		};

		render(
			<Modal
				onClose={onClose}
				setTodoList={setTodoList}
				todoList={todoList}
				edit={edit}
				setTodo={setTodo}
				todo={todo}
			/>
		);
		const titleInput = screen.getByPlaceholderText("Add Title");
		const descriptionInput = screen.getByPlaceholderText("Add Description");
		const timeInput = screen.getByPlaceholderText("Add Time (Minutes)");

		const submitButton = screen.getByText("Add");
		fireEvent.change(titleInput, { target: { value: "Todo 3" } });
		fireEvent.change(descriptionInput, { target: { value: "Description 3" } });
		fireEvent.change(timeInput, { target: { value: 60 } });
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(screen.getByText("BreakTime is necessary")).toBeInTheDocument();
		});
	});

	it("adds a new todo item to the todo list when the form is valid", async () => {
		const todo = {
			title: "Todo 3",
			description: "Description 3",
			time: "60",
			breakTime: "15",
			complete: false,
		};
		render(
			<Modal
				onClose={onClose}
				setTodoList={setTodoList}
				todoList={todoList}
				edit={edit}
				setTodo={setTodo}
				todo={todo}
			/>
		);
		const titleInput = screen.getByPlaceholderText("Add Title");
		const descriptionInput = screen.getByPlaceholderText("Add Description");
		const timeInput = screen.getByPlaceholderText("Add Time (Minutes)");
		const breakTimeInput = screen.getByPlaceholderText(
			"Add Break Time (Minutes)"
		);
		const submitButton = screen.getByText("Add");
		fireEvent.change(titleInput, { target: { value: "Todo 3" } });
		fireEvent.change(descriptionInput, { target: { value: "Description 3" } });
		fireEvent.change(timeInput, { target: { value: 60 } });
		fireEvent.change(breakTimeInput, { target: { value: 15 } });
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(setTodoList).toHaveBeenCalledWith([
				...todoList,
				{
					title: "Todo 3",
					description: "Description 3",
					time: "60",
					breakTime: "15",
					complete: false,
				},
			]);
		});
	});

	it("updates an existing todo item in the todo list when the form is valid and in edit mode", async () => {
		const todo = {
			title: "Todo 1 Updated",
			description: "Description 1 Updated",
			time: "90",
			breakTime: "20",
			complete: false,
		};
		const edit = { toggle: true, index: 0 };
		render(
			<Modal
				onClose={onClose}
				setTodoList={setTodoList}
				todoList={todoList}
				edit={edit}
				setTodo={setTodo}
				todo={todo}
			/>
		);
		const titleInput = screen.getByPlaceholderText("Add Title");
		const descriptionInput = screen.getByPlaceholderText("Add Description");
		const timeInput = screen.getByPlaceholderText("Add Time (Minutes)");
		const breakTimeInput = screen.getByPlaceholderText(
			"Add Break Time (Minutes)"
		);
		const submitButton = screen.getByText("Update");
		fireEvent.change(titleInput, { target: { value: "Todo 1 Updated" } });
		fireEvent.change(descriptionInput, {
			target: { value: "Description 1 Updated" },
		});
		fireEvent.change(timeInput, { target: { value: "90" } });
		fireEvent.change(breakTimeInput, { target: { value: "20" } });
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(setTodoList).toHaveBeenCalledWith([
				{
					title: "Todo 1 Updated",
					description: "Description 1 Updated",
					time: "90",
					breakTime: "20",
					complete: false,
				},
				{
					title: "Todo 2",
					description: "Description 2",
					time: "30",
					breakTime: "5",
					complete: false,
				},
			]);
		});
	});

	it("closes the modal when the close button is clicked", () => {
		render(
			<Modal
				onClose={onClose}
				setTodoList={setTodoList}
				todoList={todoList}
				edit={edit}
				setTodo={setTodo}
				todo={todo}
			/>
		);
		const closeButton = screen.getByText("Cancel");
		fireEvent.click(closeButton);
		expect(onClose).toHaveBeenCalled();
	});
});
