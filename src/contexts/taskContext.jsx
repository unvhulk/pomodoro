import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const taskContext = createContext();

const TaskProvider = ({ children }) => {
	const [task, setTask] = useState({});
	const [todoList, setTodoList] = useState(
		JSON.parse(localStorage.getItem("todoList")) ?? []
	);

	console.log(JSON.parse(localStorage.getItem("todoList")));
	return (
		<taskContext.Provider value={{ task, setTask, todoList, setTodoList }}>
			{children}
		</taskContext.Provider>
	);
};

const useTask = () => useContext(taskContext);
export { useTask, TaskProvider };
