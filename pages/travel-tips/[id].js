import Header from "@/components/layout/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function TravelTipsPage({
  travelTipsCategories,
  listedActivities,
}) {
  const router = useRouter();
  const { id } = router.query;
  const category = travelTipsCategories.find((cat) => cat.id === id);

  const matchingActivities = listedActivities
    .filter((activity) =>
      activity.categories.some((activityCat) =>
        category?.title
          .split(" ")
          .some((tipCat) =>
            activityCat.toLowerCase().includes(tipCat.toLowerCase())
          )
      )
    )
    .slice(0, 5);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Header>Travel Tips {category?.emoji}</Header>

      <GoBackButton onClick={handleGoBack}>
        <FaArrowCircleLeft />
      </GoBackButton>

      <StyledArticle>
        <Container>
          <HeaderRow>
            <h1>{category?.title}</h1>
            <div>{category?.description}</div>
          </HeaderRow>

          <ContentRow>
            <Column>
              <ul>
                {category?.tips.map((tip) => (
                  <ListElement key={tip}>{tip}</ListElement>
                ))}
              </ul>

              {matchingActivities.length > 0 && (
                <RelatedActivities>
                  <h2>Related Activities</h2>
                  <ActivityList>
                    {matchingActivities.map((activity) => (
                      <ActivityItem
                        key={activity._id}
                        onClick={() => router.push(`/activity/${activity._id}`)}
                      >
                        <ImageWrapper>
                          <Image
                            src={activity.imageUrl[0]}
                            alt={activity.title}
                            fill
                            sizes="100px"
                            style={{
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                            placeholder="blur"
                            blurDataURL={activity.imageUrl[0]}
                          />
                        </ImageWrapper>
                        <ActivityTitle>{activity.title}</ActivityTitle>
                      </ActivityItem>
                    ))}
                  </ActivityList>
                </RelatedActivities>
              )}
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
const ActivityItem = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

const ActivityTitle = styled.span`
  position: absolute;
  inset: 0;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  border-radius: 8px;
`;

const ImageColumn = styled.div`
  flex: 1;
  position: relative;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;
const RelatedActivities = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

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

const StyledArticle = styled.article`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
  background-color: white;
  margin: 24px;
`;
const ListElement = styled.li`
  margin-bottom: 1rem;
`;
