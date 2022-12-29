import React from "react";
import { render, screen } from "@testing-library/react";
import { TodosPage } from "../screens/TodosPage/TodosPage";
import { TaskProvider } from "./taskContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe("TodosPage", () => {
	it("renders the correct elements", () => {
		render(
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<TaskProvider>
								<TodosPage />
							</TaskProvider>
						}
					/>
				</Routes>
			</BrowserRouter>
		);

		expect(screen.getByTestId("todos-page")).toBeInTheDocument();
		expect(screen.getByText("To - Do List")).toBeInTheDocument();
		expect(screen.getByText("Welcome back, Adarsh Balak")).toBeInTheDocument();
		expect(
			screen.getByText("You have 0 tasks for today. All the best!!")
		).toBeInTheDocument();
	});
});
