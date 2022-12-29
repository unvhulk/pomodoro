import React, { useState, useEffect } from "react";
import Close from "@mui/icons-material/CloseOutlined";
import "./Modal.css";
import { Todo } from "../../@types/todo";

type props = {
	onClose: () => void;
	edit: { toggle: boolean; index: Number };
	todoList: Array<Object>;
	setTodoList: React.Dispatch<Array<any>>;
	todo: Todo | null;
	setTodo: React.Dispatch<Todo | null>;
};

export const Modal: React.FC<props> = ({
	onClose,
	setTodoList,
	todoList,
	todo,
	setTodo,
	edit,
}) => {
	const emptyTodo: Todo = {
		title: "",
		description: "",
		time: "",
		breakTime: "",
		complete: false,
	};
	const [errors, setErrors] = useState<Todo | null>(null);

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		let vali = validate(todo);
		setErrors(vali);
		if (Object.keys(vali).length === 0) {
			if (!edit.toggle) {
				setTodoList([...todoList, todo]);
				localStorage.setItem("todoList", JSON.stringify([...todoList, todo]));
			} else {
				const updatedTodo = todoList.map((item: Object, index: number) => {
					if (index === edit.index) {
						return { ...todo };
					}
					return item;
				});
				setTodoList(updatedTodo);
				localStorage.setItem("todoList", JSON.stringify(updatedTodo));
			}
			setTodo(null);
			onClose();
		}
	};

	const validate = (values: Todo | null) => {
		let errors = {} as Todo;
		if (!values?.title) {
			errors.title = "Title is required";
		}
		if (!values?.description) {
			errors.description = "Description is required";
		}
		if (!values?.time) {
			errors.time = "Timer for task is requied";
		}
		if (!values?.breakTime) {
			errors.breakTime = "BreakTime is necessary";
		}
		return errors;
	};

	const handleChange = (e: React.FormEvent) => {
		const { name, value } = e.target as HTMLInputElement;
		setTodo({ ...todo, [name]: value });
	};

	return (
		<>
			<div className='Overlay' />
			<form
				className='Modal'
				onSubmit={(e) => handleSubmit(e)}
				data-testid='todos-modal'>
				<div className='Modal-form-container'>
					<div onClick={onClose}>
						<Close />
					</div>
					<div>
						<input
							name='title'
							type='text'
							placeholder='Add Title'
							data-testid='title-input'
							value={todo?.title}
							onChange={handleChange}
						/>
						{errors?.title && (
							<p className='error-msg'>{(errors as Todo)?.title}</p>
						)}
					</div>
					<div>
						<textarea
							name='description'
							placeholder='Add Description'
							value={todo?.description}
							onChange={handleChange}
						/>
						<p className='error-msg'>{(errors as Todo)?.description}</p>
					</div>
					<div>
						<input
							name='time'
							type='number'
							placeholder='Add Time (Minutes)'
							value={todo?.time}
							onChange={handleChange}
						/>
						<p className='error-msg'>{(errors as Todo)?.time}</p>
					</div>
					<div>
						<input
							name='breakTime'
							type='number'
							placeholder='Add Break Time (Minutes)'
							value={todo?.breakTime}
							onChange={handleChange}
						/>
						<p className='error-msg'>{(errors as Todo)?.breakTime}</p>
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
