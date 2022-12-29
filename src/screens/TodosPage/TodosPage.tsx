import { useState } from "react";
import { TaskContextType, Todo } from "../../@types/todo";
import { Modal } from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/taskContext";
import Edit from "@mui/icons-material/EditOutlined";
import Delete from "@mui/icons-material/DeleteOutlineOutlined";
import "./TodosPage.css";

export const TodosPage: React.FC = () => {
	const { setTask, todoList, setTodoList } = useTask() as TaskContextType;

	const navigate = useNavigate();

	const [open, setOpen] = useState<boolean>(false);

	const [edit, setEdit] = useState<{ toggle: boolean; index: Number }>({
		toggle: false,
		index: -1,
	});

	const [todo, setTodo] = useState<Todo | null>({
		title: "",
		description: "",
		time: "",
		breakTime: "",
		complete: false,
	});

	const editTodo = (todoIndex: number) => {
		const selectedTodo: Todo | null =
			todoList.find((item: Todo, index: number) => index === todoIndex) ?? null;

		setEdit({ toggle: true, index: todoIndex });
		setTodo(selectedTodo);
		setOpen(true);
	};

	const deleteTodo = (todoIndex: number) => {
		const updateList: Todo[] = todoList.filter(
			(item: Todo, index: number) => todoIndex !== index
		);
		setTodoList(updateList);
		localStorage.setItem("todoList", JSON.stringify(updateList));
	};

	const launchPomodoro = (task: Object, index: number) => {
		setTask(task);
		navigate("/pomodoro", { state: { taskIndex: index } });
	};

	return (
		<div className='Todos-container' data-testid='todos-page'>
			<div className='Todos-nav'>
				<div className='Todos-heading'>Welcome back, Adarsh Balak</div>
				<div className='Todos-subheading'>
					You have {todoList?.length} tasks for today. All the best!!
				</div>
			</div>
			<div className='Todos-main'>
				<div className='Todos-main-heading'>
					<div>To - Do List</div>
					<button onClick={() => setOpen(!open)}>+</button>
				</div>
				{open && (
					<Modal
						onClose={() => {
							setOpen(false);
							setEdit((edit) => ({ ...edit, toggle: false }));
							setTodo(null);
						}}
						setTodoList={setTodoList}
						todoList={todoList}
						todo={todo}
						setTodo={setTodo}
						edit={edit}
					/>
				)}
				<div className='Todos-content'>
					{todoList?.map((item: Todo) => {
						return (
							<div
								data-testid='todos-list'
								className='Todos-list'
								key={todoList.indexOf(item)}>
								<div
									data-testid='start-button'
									onClick={() => launchPomodoro(item, todoList.indexOf(item))}
									style={{
										textDecoration: `${
											item.complete === true ? "line-through" : "none"
										}`,
									}}>
									{item.title}
								</div>
								<div
									data-testid='edit-button'
									onClick={() => editTodo(todoList.indexOf(item))}>
									<Edit />
								</div>
								<div
									data-testid='delete-button'
									onClick={() => deleteTodo(todoList.indexOf(item))}>
									<Delete />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
