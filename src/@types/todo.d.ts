import React from "react";

export type TaskContextType = {
	task: Todo;
	setTask: React.Dispatch<Todo>;
	todoList: Todo[];
	setTodoList: React.Dispatch<Todo[]>;
};

export interface Todo {
	title?: string;
	description?: string;
	time?: string;
	breakTime?: string;
	complete?: boolean;
}
