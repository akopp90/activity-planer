import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from 'prop-types';

const Container = styled.section`
  padding: 24px;
  margin: 0rem 0;
  max-width: 100%;
  width: 100%;
  box-shadow: 0 2px 2px ${({ theme }) => theme.background === '#121212' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border: 0px solid ${({ theme }) => theme.border};
  position: relative;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ActivityItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  min-width: 200px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease forwards;

  &:hover {
    transform: translateY(-5px);
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

const ActivityName = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
  text-align: center;
`;

const Location = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ direction }) => direction === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
  transform: translateY(-50%);
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${({ $visible }) => $visible ? '1' : '0'};
  pointer-events: ${({ $visible }) => $visible ? 'auto' : 'none'};
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.border};
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export default function RecommendedActivities({ activities }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <Container>
        <Title>No Activities Available</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Recommended for you</Title>
      <ScrollButton
        direction="left"
        $visible={canScrollLeft}
        onClick={() => scroll('left')}
      >
        <FaChevronLeft />
      </ScrollButton>
      <ScrollContainer ref={scrollContainerRef}>
        {activities.map((activity) => (
          <Link href={`/activity/${activity._id}`} key={activity._id}>
            <ActivityItem>
              <ImageContainer>
                <Image
                  src={activity.imageUrl[0] || '/placeholder-activity.jpg'}
                  alt={activity.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="200px"
                />
              </ImageContainer>
              <ActivityName>{activity.name}</ActivityName>
              <Location>{activity.location?.address || 'Location not specified'}</Location>
            </ActivityItem>
          </Link>
        ))}
      </ScrollContainer>
      <ScrollButton
        direction="right"
        $visible={canScrollRight}
        onClick={() => scroll('right')}
      >
        <FaChevronRight />
      </ScrollButton>
    </Container>
  );
}

RecommendedActivities.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imageUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.shape({
        address: PropTypes.string
      })
    })
  ).isRequired,
};