import Header from "@/components/layout/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function TravelTipsPage({ travelTipsCategories }) {
  const router = useRouter();
  const { id } = router.query;

 
  const category = travelTipsCategories.find((cat) => cat.id === id);

  return (
    <>
      <Header>Travel Tips {category?.emoji}</Header>

      
      <Container>
       
        <HeaderRow>
          <h1>{category?.title}</h1>
          <p>{category?.description}</p>
        </HeaderRow>

       
        <ContentRow>
          <Column>
            <ul>
              {category?.tips.map((tip) => (
                <ListElement key={tip}>{tip}</ListElement>
              ))}
            </ul>
          </Column>
          <ImageColumn>
            <Image
              alt="Travel Tip Image"
              src={category?.imageUrl}
              layout="fill" 
              objectFit="cover" 
              objectPosition="center" 
            />
          </ImageColumn>
        </ContentRow>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* First row auto-sized, second row takes up the remaining space */
  grid-template-columns: 1fr; /* Only one column in the first row */
  gap: 20px;
  padding: 20px;
`;

const HeaderRow = styled.div`
  grid-column: 1; /* First row spans the full width */
  border-radius: 8px;
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Second row has 2 equal-width columns */
  gap: 20px; /* Optional: gap between columns */
`;

const Column = styled.div`
  border-radius: 8px;
`;

const ImageColumn = styled.div`
  position: relative; /* Required for Next.js Image to fill the container */
  height: 300px; /* You can adjust the height based on your layout needs */
  border-radius: 8px;
  overflow: hidden; /* Ensures the image is clipped if it exceeds the column size */
`;

const ListElement = styled.li`
  margin-bottom: 1rem;
`;
