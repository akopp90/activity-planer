import { uid } from "uid";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { categories as categoryData } from "@/lib/categories";

export default function ActivityForm({
  handleToggleEdit,
  handleAddActivity,
  handleEditActivity,
  activity,
}) {
  const [categories, setCategories] = useState(activity.categories);
  function handleActivity(newActivity) {
    if (activity.id) {
      handleEditActivity(newActivity);
      return;
    }
    handleAddActivity(newActivity);
    handleToggleEdit();
  }
  function handleSubmit(event) {
    event.preventDefault();

    const id = activity.id;
    const formResponse = new FormData(event.target);
    const formData = Object.fromEntries(formResponse);
    const newActivity = {
      ...formData,
      id: id || uid(),
      categories: categories,
      imageUrl: "",
    };

    handleActivity(newActivity);
    handleToggleEdit();
  }

  function handleSelectCategory(event) {
    if (!event.target.value) return;

    setCategories([...categories, event.target.value]);
  }

  function handleDeleteCategory(categoryToDelete) {
    setCategories(
      categories.filter((category) => category !== categoryToDelete)
    );
  }

  function handleCancel() {
    handleToggleEdit();
    setCategories([]);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Add new activity</h2>
      <Input name="Title" defaultValue={activity.title} isRequired>
        Activity title *
      </Input>
      <StyledSelectDiv>
        <StyledLabel htmlFor="Categories">Activity category *</StyledLabel>
        <StyledSelect
          id="Categories"
          onChange={handleSelectCategory}
          required={categories.length === 0}
        >
          <option value="">Please select a category</option>
          {categoryData.map((category) => (
            <option
              key={category}
              value={category}
              disabled={categories.includes(category)}
            >
              {category}
            </option>
          ))}
        </StyledSelect>
      </StyledSelectDiv>
      {categories.length !== 0 && (
        <StyledList>
          {categories.map((category) => (
            <li key={category}>
              <Button onClick={() => handleDeleteCategory(category)}>
                {category}
                <Image
                  src="/images/delete.svg"
                  width={16}
                  height={16}
                  alt="Delete category"
                />
              </Button>
            </li>
          ))}
        </StyledList>
      )}
      <Input name="Area" defaultValue={activity.area}>
        Activity area
      </Input>
      <Input name="Country" defaultValue={activity.country}>
        Activity country
      </Input>
      <Textarea name="Description" defaultValue={activity.description}>
        Activity description
      </Textarea>
      <StyledBottomDiv>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="submit" isPrimary>
          {activity.id != "" ? "Save" : "Create"}
        </Button>
      </StyledBottomDiv>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  gap: 16px;
  padding: 24px;
  display: flex;
  border-radius: 8px;
  margin-inline: auto;
  flex-direction: column;
  background-color: #f1f1f1;
  width: min(640px, 100% - 48px);
`;
const StyledList = styled.ul`
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;
const StyledSelectDiv = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
`;
const StyledLabel = styled.label`
  font-weight: bold;
  font-size: 0.75rem;
`;
const StyledSelect = styled.select`
  padding: 8px;
  font: inherit;
  color: inherit;
  appearance: none;
  border-radius: 4px;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  background: #fff url("/images/arrow-down.svg") center right 8px no-repeat;
`;
const StyledBottomDiv = styled.div`
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
`;
