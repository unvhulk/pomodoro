import React from "react";
import { render } from "@testing-library/react";
import { TaskProvider } from "./contexts/taskContext";
import App from "./App";

describe("App", () => {
	it("should render the App component inside a TaskProvider component", () => {
		const { container } = render(
			<TaskProvider>
				<App />
			</TaskProvider>
		);

		expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="App"
  >
    <div
      class="Landing-container"
      data-testid="landing-page"
    >
      <div
        class="Landing-left"
      >
        <div
          class="Landing-left-container"
        >
          <div
            class="Landing-heading-container"
          >
            <h1
              data-testid="heading"
            >
              <span>
                Discipline
              </span>
               equals 
              <span>
                Freedom
              </span>
            </h1>
          </div>
          <div
            class="Landing-middle-container"
          >
            <div
              class="L-h2-container"
            >
              <h2>
                Meet your modern
              </h2>
              <h2
                style="color: rgb(83, 72, 199);"
              >
                Pomodoro App
              </h2>
            </div>
            <p>
              The pomodoro technique is a time management method, which uses fix-timed intervals of work and breaks (similar to your time as a child at school). The work period is completely focused on one particular task. No distractions (food, chats, email) are allowed during that time. After a successful work period, you can take a short break and relax your brain.
            </p>
          </div>
          <div
            class="Landing-btn-container"
          >
            <div
              class="Landing-btn"
            >
              Get Started
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
	});
});
