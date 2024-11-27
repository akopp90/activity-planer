import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { categories as categoryData } from "@/lib/categories";
import Upload from "../ui/Upload";
import { showToast } from "../ui/ToastMessage";
import { useSession } from "next-auth/react";

export default function ActivityForm({
  handleToggleEdit,
  handleAddActivity,
  handleEditActivity,
  activity,
}) {
  const [categories, setCategories] = useState(activity.categories);
  const [error, setError] = useState(false);
  const [urls, setUrls] = useState(activity.imageUrl);
  const session = useSession();
  const { status, data } = useSession({
    required: true,
  });
  async function handleSubmit(event) {
    event.preventDefault();

    const id = activity._id;
    const formResponse = new FormData(event.target);
    const formData = Object.fromEntries(formResponse);
    const { image, ...activityData } = formData;
    const includes = formData.includes.split(",");
    const notSuitableFor = formData.notsuitablefor.split(",");
    const importantInformation = formData.importantinformation.split(",");
    const whatToBring = formData.whattobring;
    const numberOfPeople = formData.numberofpeople;
    const fullDescription = formData.fulldescription;

    const createdBy = session.data.user.id;
    const newActivity = {
      ...activityData,
      _id: activity._id ? activity._id : null,
      categories: categories,
      imageUrl: urls,
      includes: includes[0] !== "" ? includes : ["no information"],
      notSuitableFor:
        notSuitableFor[0] !== "" ? notSuitableFor : ["no information"],
      fullDescription: fullDescription,
      numberOfPeople: numberOfPeople,
      importantInformation:
        importantInformation[0] !== ""
          ? importantInformation
          : ["no information"],
      whatToBring: whatToBring[0] !== "" ? whatToBring : ["no information"],
      createdBy: createdBy,
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
        _id: activity._id ? activity._id : null,
        categories: categories,
        imageUrl: urls,
        includes: includes[0] !== "" ? includes : ["no information"],
        notSuitableFor:
          notSuitableFor[0] !== "" ? notSuitableFor : ["no information"],
        fullDescription: fullDescription, // Add this
        numberOfPeople: numberOfPeople,
        importantInformation:
          importantInformation[0] !== ""
            ? importantInformation
            : ["no information"],
        whatToBring: whatToBring[0] !== "" ? whatToBring : ["no information"],
        createdBy: createdBy,
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
      if (urls.length >= 5) {
        showToast("You can only upload up to 5 images", "error");
        return;
      }

      const images = event.target.files;
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      const uploadedUrls = [];

      for (const image of images) {
        if (image.size > maxSize) {
          showToast("File size must be less than 5MB", "error");
          return;
        }

        if (urls.length + images.length > 5) {
          showToast("You can only upload up to 5 images", "error");
          return;
        }

        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        uploadedUrls.push(result[0].secure_url);
      }

      setUrls((prev) => [...prev, ...uploadedUrls]);
      showToast("Images uploaded successfully", "success");
      return;
    } catch (error) {
      console.error(error);
      showToast("Please select a file!", "info");
      return;
    }
  }

  async function handleDeleteImage(imageUrl) {
    await fetch("/api/upload/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUrls(urls.filter((image) => image !== imageUrl));
      })
      .catch((error) => {
        console.error(error);
      });
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
        Title *
      </Input>
      <Input
        name="Location"
        defaultValue={activity.location.address}
        isRequired
      >
        Location *
      </Input>
      {error && (
        <StyledParagraph>
          Please enter a valid address (e.g. Berlin)
        </StyledParagraph>
      )}
      <StyledSelectDiv>
        <StyledLabel htmlFor="Categories">Category *</StyledLabel>
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
        Area
      </Input>
      <Input name="Country" defaultValue={activity.country}>
        Country
      </Input>

      {urls.length < 5 ? (
        <Upload name="Image" multiple onChange={handleUpload}>
          Activity Image
        </Upload>
      ) : (
        <StyledParagraph>Only 5 images can be uploaded</StyledParagraph>
      )}

      <StyledList>
        {urls &&
          urls.map((url) => (
            <StyledImageList key={url}>
              <StyledDeleteImage>
                <StyledImage
                  src="/images/delete.svg"
                  width={16}
                  height={16}
                  alt="Delete image"
                  onClick={() => handleDeleteImage(url)}
                />
              </StyledDeleteImage>
              <Image src={url} alt="Uploaded image" width={150} height={100} />
            </StyledImageList>
          ))}
      </StyledList>

      <Textarea name="Description" defaultValue={activity.description}>
        Description
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
  margin-top: 24px;
  margin-inline: auto;
  flex-direction: column;
  background-color: #fff;
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
const StyledImageList = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const StyledDeleteImage = styled.div`
  width: 150px;
`;
const StyledImage = styled(Image)`
  border-radius: 4px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
  top: 30px;
  right: -130px;
  position: relative;
  z-index: 10;
  cursor: pointer;
`;
