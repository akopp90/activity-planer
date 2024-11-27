import Header from "@/components/layout/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function TravelTipsPage({ travelTipsCategories }) {
  const router = useRouter();
  const { id } = router.query;
  
  const category = travelTipsCategories.find((cat) => cat.id === id);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Header>
        Travel Tips {category?.emoji}
      </Header>

      <GoBackButton onClick={handleGoBack}>
        <FaArrowCircleLeft />
      </GoBackButton>

<StyledArticle>
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
      </StyledArticle>
    </>
  );
}

const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #555;
  border: none;
  padding: 10px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 14px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
`;

const StyledArticle = styled.article`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
  background-color: white;
  margin: 24px;
`;

const HeaderRow = styled.div`
  grid-column: 1;
  border-radius: 8px;
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Column = styled.div`
  border-radius: 8px;
`;

const ImageColumn = styled.div`
  position: relative;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
`;

const ListElement = styled.li`
  margin-bottom: 1rem;
`;
