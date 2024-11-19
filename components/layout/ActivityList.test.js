import { render, screen } from "@testing-library/react";
import ActivityList from "@/components/layout/ActivityList";
import { activities as activityData } from "@/lib/activities";

// Test Case 1: Activities Rendered on Activity Page

describe("1.1 When the page initially loads, verify that all activities are displayed", () => {
  test("ActivityCard rendering", () => {
    render(<ActivityList activities={activityData} />);
    expect(screen.getAllByTestId("activity")).toHaveLength(activityData.length);
  });
});
