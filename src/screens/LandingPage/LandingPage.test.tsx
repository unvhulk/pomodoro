import { render, fireEvent, screen } from "@testing-library/react";
import { LandingPage } from "./LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe("LandingPage", () => {
	it("should render the title and description correctly", () => {
		render(
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />} />
				</Routes>
			</BrowserRouter>
		);
		const title = screen.getByTestId("heading");
		const description = screen.getByText(
			"The pomodoro technique is a time management method, which uses fix-timed intervals of work and breaks (similar to your time as a child at school). The work period is completely focused on one particular task. No distractions (food, chats, email) are allowed during that time. After a successful work period, you can take a short break and relax your brain."
		);
		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
	});

	it('should navigate to the todos page when the "Get Started" button is clicked', () => {
		render(
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />} />
				</Routes>
			</BrowserRouter>
		);
		const button = screen.getByText("Get Started");
		fireEvent.click(button);
		expect(window.location.href).toBe("http://localhost/todos");
	});
});
