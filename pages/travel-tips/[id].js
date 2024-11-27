import Header from "@/components/layout/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function TravelTipsPage({ travelTipsCategories, listedActivities }) {
  const router = useRouter();
  const { id } = router.query;
  const category = travelTipsCategories.find((cat) => cat.id === id);

  
  const formatTip = (tip) => {
    const parts = tip.split("**");
    return {
      emoji: parts[0].trim(),
      mainPoint: parts[1] ? parts[1] : '',
      subPoint: parts[2] ? parts[2] : ''
    };
  };

  
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
                {category?.tips.map((tip, index) => {
                  const { emoji, mainPoint, subPoint } = formatTip(tip);
                  return (
                    <ListElement key={index}>
                      <TipHeader>
                        <span>{emoji}</span>
                        <strong>{mainPoint}</strong>
                      </TipHeader>
                      {subPoint && <TipSubtext>{subPoint}</TipSubtext>}
                    </ListElement>
                  );
                })}
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

const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #555;
  border: none;
  padding: 10px;
  border-radius: 50%;
  font-size: 20px;  
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
  h1 {
    font-size: 24px;  
  }
  p {
    font-size: 14px;  
    color: #777;
  }
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
  font-size: 14px;  
  line-height: 1.5;
`;

const TipHeader = styled.div`
  font-size: 14px;  
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
`;

const TipSubtext = styled.div`
  font-size: 10px;  
  color: #666;
  font-weight: 400;
  margin-left: 10px;
  margin-top: 5px;
`;

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

