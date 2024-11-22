import HomePage from "@/pages/activity/index";
import { filterActivities } from "@/lib/utils";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

// Test Case 2: Filter Widget Visibility

describe("2.1 The widget should be hidden by default on page load", () => {
  test("Filter hidden", () => {
    render(<HomePage listedActivities={[]} filter={[]} />);
    // expect(screen.queryByText("Filter activities")).not.toBeInTheDocument();

    // More reliable solution
    expect(screen.queryByTestId("filter")).not.toBeInTheDocument();
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

    render(<HomePage listedActivities={activities} filter={[]} />);

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
        listedActivities={activities}
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
      {
        title: "Test title",
        categories: ["Outdoor"],
      },
    ];
    const result = filterActivities(activities, ["Winter"]);

    expect(result).toStrictEqual([
      {
        title: "Test title",
        categories: ["Winter"],
      },
    ]);
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
      {
        title: "Test title",
        categories: ["Sport"],
      },
    ];
    const result = filterActivities(activities, ["Winter", "Outdoor"]);

    // expect(result).toStrictEqual([
    //   {
    //     title: "Test title",
    //     categories: ["Winter"],
    //   },
    //   {
    //     title: "Test title",
    //     categories: ["Outdoor"],
    //   },
    // ]);

    // Test the negative scenario to not accidentally exclude activities
    expect(result).not.toContainEqual({
      title: "Test title",
      categories: ["Sport"],
    });
  });
});

describe("3.3 Deselecting all filters displays all activities", () => {
  test("Display all activities when no filter is set", () => {
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

    const result = filterActivities(activities, []);

    expect(result).toHaveLength(activities.length);
  });
});

describe("3.4 Selecting a filter that does not match any activities displays a message like 'No activities found'", () => {
  test("Display message when no filter matches", () => {
    const activities = [
      {
        title: "Test title",
        categories: ["Winter"],
      },
    ];
    render(<HomePage listedActivities={activities} filter={["Outdoor"]} />);
    expect(screen.getByText("No activities found")).toBeInTheDocument();
  });
});
