import React, { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { TaskContextType, Todo } from "../@types/todo";

const taskContext = createContext<TaskContextType | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
	const [task, setTask] = useState<Todo>({
		title: "",
		description: "",
		time: "",
		breakTime: "",
		complete: false,
	});

	const [todoList, setTodoList] = useState<Todo[]>(
		JSON.parse(localStorage.getItem("todoList") ?? "[]")
	);

	return (
		<taskContext.Provider value={{ task, setTask, todoList, setTodoList }}>
			{children}
		</taskContext.Provider>
	);
};

const useTask = () => useContext(taskContext);
export { useTask, TaskProvider, taskContext };
