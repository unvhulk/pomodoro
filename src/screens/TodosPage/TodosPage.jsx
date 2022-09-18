import React, { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/taskContext";
import Edit from "@mui/icons-material/EditOutlined";
import Delete from "@mui/icons-material/DeleteOutlineOutlined";
import "./TodosPage.css";

export const TodosPage = () => {
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState({ toggle: false, index: -1 });
	const [todo, setTodo] = useState({
		title: "",
		description: "",
		time: "",
		complete: false,
	});

	const { setTask, todoList, setTodoList } = useTask();

	const editTodo = (todoIndex) => {
		const selectedTodo = todoList.find((item, index) => index === todoIndex);
		setEdit({ toggle: true, index: todoIndex });
		setTodo(selectedTodo);
		setOpen(true);
	};

	const deleteTodo = (todoIndex) => {
		const updateList = todoList.filter((item, index) => todoIndex !== index);
		setTodoList(updateList);
		localStorage.setItem("todoList", JSON.stringify(updateList));
	};

	const launchPomodoro = (task, index) => {
		setTask({ ...task, index });
		navigate("/pomodoro");
	};

	return (
		<div className='Todos-container'>
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
							setEdit(false);
							setTodo({});
						}}
						setTodoList={setTodoList}
						todoList={todoList}
						todo={todo}
						setTodo={setTodo}
						edit={edit}
						setEdit={setEdit}
					/>
				)}
				<div className='Todos-content'>
					{todoList?.map((item) => {
						return (
							<div className='Todos-list' key={todoList.indexOf(item)}>
								<div
									onClick={() => launchPomodoro(item, todoList.indexOf(item))}
									style={{
										textDecoration: `${
											item.complete === true ? "line-through" : "none"
										}`,
									}}>
									{item.title}
								</div>
								<div onClick={() => editTodo(todoList.indexOf(item))}>
									<Edit />
								</div>
								<div onClick={() => deleteTodo(todoList.indexOf(item))}>
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
