import { uid } from "uid";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { categories as categoryData } from "@/lib/categories";
import Upload from "../ui/Upload";
import { showToast } from "../ui/ToastMessage";

export default function ActivityForm({
  handleToggleEdit,
  handleAddActivity,
  handleEditActivity,
  activity,
}) {
  const [categories, setCategories] = useState(activity.categories);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(activity.imageUrl);
  async function handleSubmit(event) {
    event.preventDefault();

    const id = activity.id;
    const formResponse = new FormData(event.target);
    const formData = Object.fromEntries(formResponse);
    const { image, ...activityData } = formData;

    const newActivity = {
      ...activityData,
      categories: categories,
      imageUrl: url,
    };

    const coordinatesRessource = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${formData.location}&format=jsonv2&limit=1&accept-language=en-US`
    );

    if (!coordinatesRessource.ok) {
      throw new Error(
        `HTTPS error! status: ${coordinatesRessource.status} for URL: ${coordinatesRessource.url}`
      );
    }
    const coordinatesResponse = await coordinatesRessource.json();

    if (coordinatesResponse[0]) {
      const newActivity = {
        ...formData,
        location: {
          address: formData.location,
          lat: coordinatesResponse[0].lat,
          lon: coordinatesResponse[0].lon,
        },
        categories: categories,
        imageUrl: url,
      };

      if (activity._id) {
        handleEditActivity(newActivity);
      } else {
        handleAddActivity(newActivity);
      }
      handleToggleEdit();
    } else {
      setError(true);
    }
  }

  async function handleUpload(event) {
    try {
      const formData = new FormData();
      const image = event.target.files[0];

      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      formData.append("image", image);
      if (image.size > maxSize) {
        showToast("File size must be less than 5MB", "error");
        return;
      }
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { url } = await response.json();
      setUrl(url);
      showToast("Image uploaded successfully", "success");
      return;
    } catch (error) {
      showToast("Please selevt a file!", "info");
      return;
    }
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
      <Input
        name="Location"
        defaultValue={activity.location.address}
        isRequired
      >
        Activity location *
      </Input>
      {error && (
        <StyledParagraph>
          Please enter a valid address (e.g. Berlin)
        </StyledParagraph>
      )}
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

      <Upload name="Image" onChange={handleUpload}>
        Activity Image
      </Upload>
      {url && (
        <Image
          src={url ? url : "/images/no-image.svg"}
          alt="Uploaded image"
          width={150}
          height={100}
        />
      )}

      <Textarea name="Description" defaultValue={activity.description}>
        Activity description
      </Textarea>
      <Input name="Duration" defaultValue={activity.duration}>
        Duration
      </Input>
      <Input name="NumberOfPeople" defaultValue={activity.numberOfPeople}>
        Number of People
      </Input>
      <Textarea name="FullDescription" defaultValue={activity.fullDescription}>
        Full Description
      </Textarea>
      <Input name="Includes" defaultValue={activity.includes}>
        Includes
      </Input>
      <Input name="NotSuitableFor" defaultValue={activity.notSuitableFor}>
        Not suitable for
      </Input>
      <Textarea
        name="ImportantInformation"
        defaultValue={activity.importantInformation}
      >
        Important Information
      </Textarea>
      <Textarea name="whatToBring" defaultValue={activity.whatToBring}>
        What to bring
      </Textarea>
      <Textarea name="notAllowed" defaultValue={activity.notAllowed}>
        Not allowed
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

const StyledParagraph = styled.p`
  color: red;
`;
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
