import HomePage from "@/pages/activity/index";
import { categories } from "@/lib/categories";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { activities as activityData } from "@/lib/activities";

// Test Case 2: Filter Widget Visibility

describe("2.1 The widget should be hidden by default on page load", () => {
  test("Filter hidden", () => {
    render(<HomePage activities={activityData} filter={categories} />);
    expect(screen.queryByText("Filter activities")).not.toBeInTheDocument();
  });
});

describe("2.2 Clicking the toggle button opens/hides the filter widget", () => {
  test("Filter toggle", async () => {
    const user = userEvent.setup();
    render(<HomePage activities={activityData} filter={categories} />);

    const button = screen.getByRole("button", { name: /Filter/i });
    expect(button).toBeInTheDocument();

    await user.click(button); // Show filter widget
    expect(screen.getByTestId("filter")).toBeInTheDocument();

    await user.click(button); // Hide filter widget
    expect(screen.queryByTestId("filter")).not.toBeInTheDocument();
  });
});

describe("2.3 The widget remains open if filters are applied", () => {
  test("Filter remains open", async () => {
    const user = userEvent.setup();
    render(
      <HomePage
        activities={activityData}
        filter={categories}
        handleFilter={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: /Filter/i });
    expect(button).toBeInTheDocument();

    await user.click(button); // Show filter widget

    const checkbox = screen.getByLabelText("Outdoor");
    expect(checkbox).toBeInTheDocument();

    await user.click(checkbox);
    expect(screen.getByTestId("filter")).toBeInTheDocument();
  });
});
