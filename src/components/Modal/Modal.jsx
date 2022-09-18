import React from "react";
import { useState } from "react";
import Close from "@mui/icons-material/CloseOutlined";
import "./Modal.css";

export const Modal = ({
	onClose,
	setTodoList,
	todoList,
	todo,
	setTodo,
	edit,
	setEdit,
}) => {
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		let vali = validate(todo);
		setErrors(vali);
		if (Object.keys(vali).length === 0) {
			if (!edit.toggle) {
				setTodoList([...todoList, todo]);
				localStorage.setItem("todoList", JSON.stringify([...todoList, todo]));
			} else {
				const updatedTodo = todoList.map((item, index) => {
					if (index === edit.index) {
						return { ...todo };
					}
					return item;
				});
				setTodoList(updatedTodo);
				localStorage.setItem("todoList", JSON.stringify(updatedTodo));
			}
			setTodo({});
			onClose();
		}
	};

	const validate = (values) => {
		let errors = {};
		if (!values.title) {
			errors.title = "Title is required";
		}
		if (!values.description) {
			errors.description = "Description is required";
		}
		if (!values.time) {
			errors.time = "Timer for task is requied";
		}
		if (!values.breakTime) {
			errors.breakTime = "BreakTime is necessary";
		}
		return errors;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTodo({ ...todo, [name]: value });
	};

	return (
		<>
			<div className='Overlay' />
			<form className='Modal' onSubmit={(e) => handleSubmit(e)}>
				<div className='Modal-form-container'>
					<div onClick={onClose}>
						<Close />
					</div>
					<div>
						<input
							name='title'
							type='text'
							placeholder='Add Title'
							value={todo.title}
							onChange={handleChange}
						/>
						<p className='error-msg'>{errors?.title}</p>
					</div>
					<div>
						<textarea
							name='description'
							type='text'
							placeholder='Add Description'
							value={todo.description}
							onChange={handleChange}
						/>
						<p className='error-msg'>{errors?.description}</p>
					</div>
					<div>
						<input
							name='time'
							type='number'
							placeholder='Add Time (Minutes)'
							value={todo.time}
							onChange={handleChange}
						/>
						<p className='error-msg'>{errors?.time}</p>
					</div>
					<div>
						<input
							name='breakTime'
							type='number'
							placeholder='Add Break Time (Minutes)'
							value={todo.breakTime}
							onChange={handleChange}
						/>
						<p className='error-msg'>{errors?.breakTime}</p>
					</div>
					<div>
						<button type='button' onClick={onClose}>
							Cancel
						</button>
						<button type='submit'>{edit.toggle ? "Update" : "Add"}</button>
					</div>
				</div>
			</form>
		</>
	);
};
