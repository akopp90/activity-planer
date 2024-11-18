import { render, screen } from "@testing-library/react";
import ActivityList from "@/components/layout/ActivityList";
import { activities as activityData } from "@/lib/activities";

// Test Case 1: Activities Rendered on Activity Page

describe("When the page initially loads, verify that all activities are displayed", () => {
  render(<ActivityList activities={activityData} />);
  const renderedActivities = screen.getAllByTestId("activity");

  test("ActivityCard Rendering", () => {
    expect(renderedActivities.length).toEqual(activityData.length);
  });
});

// 1.2 Ensure each activity displays the correct title, image, and tags
