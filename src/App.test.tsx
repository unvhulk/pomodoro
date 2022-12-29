import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TaskProvider } from "./contexts/taskContext";

import App from "./App";

test("renders the landing page route", () => {
	render(<App />);
	expect(screen.getByTestId("landing-page")).toBeInTheDocument();
});

test("renders the todos page route", () => {
	render(
		<TaskProvider>
			<App />
		</TaskProvider>
	);
	fireEvent.click(screen.getByText("Get Started"));
	expect(screen.getByTestId("todos-page")).toBeInTheDocument();
});

// test("renders the pomodoro page route", () => {
// 	render(<App />);
// 	expect(screen.getByTestId("pomodoro-page")).toBeInTheDocument();
// });
