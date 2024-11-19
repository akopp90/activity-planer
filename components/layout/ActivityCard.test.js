import { render, screen } from "@testing-library/react";
import ActivityCard from "@/components/layout/ActivityCard";

// Test Case 1: Activities Rendered on Activity Page

describe("1.1 Ensure each activity displays the correct title, image, and tags", () => {
  const activity = {
    title: "Test title",
    imageUrl: "https://images.unsplash.com/photo-1486890598084-3673ba1808c1",
    categories: ["Outdoor", "Sport", "Water"],
  };

  test("Title Rendering", () => {
    render(<ActivityCard {...activity} />);
    const renderedTitle = screen.getByText(activity.title);
    expect(renderedTitle).toBeInTheDocument();
  });

  test("Image Rendering", () => {
    render(<ActivityCard {...activity} />);
    const renderedImage = screen.getByAltText(activity.title);
    expect(renderedImage).toBeInTheDocument();
  });

  test("Empty Image Rendering", () => {
    render(<ActivityCard {...activity} imageUrl="" />);
    const renderedEmptyImage = screen.getByAltText("Image is missing");
    expect(renderedEmptyImage).toBeInTheDocument();
  });

  test("Categories Rendering", () => {
    render(<ActivityCard {...activity} />);
    const renderedCategories = screen.getAllByTestId("category");
    expect(renderedCategories).toHaveLength(activity.categories.length);
  });
});
