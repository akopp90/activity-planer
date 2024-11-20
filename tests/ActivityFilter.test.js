import HomePage from "@/pages/activity/index";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

// Test Case 2: Filter Widget Visibility

describe("2.1 The widget should be hidden by default on page load", () => {
  test("Filter hidden", () => {
    const activities = [
      {
        title: "Test title",
        categories: ["Winter"],
      },
    ];

    render(<HomePage activities={activities} filter={[]} />);
    expect(screen.queryByText("Filter activities")).not.toBeInTheDocument();
  });
});

describe("2.2 Clicking the toggle button opens/hides the filter widget", () => {
  test("Filter toggle", async () => {
    const activities = [
      {
        title: "Test title",
        categories: ["Winter"],
      },
    ];
    const user = userEvent.setup();

    render(<HomePage activities={activities} filter={[]} />);

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
    const activities = [
      {
        title: "Test title",
        categories: ["Winter"],
      },
    ];
    const user = userEvent.setup();
    const handleFilter = jest.fn();

    render(
      <HomePage
        activities={activities}
        filter={[]}
        handleFilter={handleFilter}
      />
    );

    const button = screen.getByRole("button", { name: /Filter/i });
    expect(button).toBeInTheDocument();

    await user.click(button); // Show filter widget

    const checkbox = screen.getByLabelText("Outdoor");
    expect(checkbox).toBeInTheDocument();

    await user.click(checkbox); // Select filter

    expect(handleFilter).toHaveBeenCalled();
    expect(screen.getByTestId("filter")).toBeInTheDocument();
  });
});

// Test Case 3: Filter Function

describe("3.1 Selecting a single filter displays only activities with that category", () => {
  test("Display only activities with specific category", () => {
    const activities = [
      {
        title: "Test title",
        categories: ["Winter"],
      },
    ];

    render(<HomePage activities={activities} filter={["Winter"]} />);

    expect(screen.getAllByTestId("activity")).toHaveLength(activities.length);
  });
});

describe("3.2 Selecting multiple filters displays activities that match any of the selected categories", () => {
  test("Display only activities that match specific categories", () => {
    const activities = [
      {
        title: "Test title",
        categories: ["Winter"],
      },
      {
        title: "Test title",
        categories: ["Outdoor"],
      },
    ];

    render(<HomePage activities={activities} filter={["Winter", "Outdoor"]} />);

    expect(screen.getAllByTestId("activity")).toHaveLength(activities.length);
  });
});
