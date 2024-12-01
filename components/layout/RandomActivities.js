import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const Container = styled.section`
  padding: 1rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  margin: 0rem 0;
  max-width: 100%;
  width: 100%;
  box-shadow: 0 2px 2px ${({ theme }) => theme.background === '#121212' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border: 0px solid ${({ theme }) => theme.border};
  position: relative;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: left;
`;

const ScrollWrapper = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: -15px;
  transform: translateY(-50%);
  ${props => props.$left ? 'left: 0;' : 'right: 0;'}
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.border};
  }

  svg {
    font-size: 1rem;
  }
`;

const ActivityItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  min-width: 120px;
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid ${({ theme }) => theme.primary};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ActivityName = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Location = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem;
  opacity: 0.7;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
`;

export default function RandomActivities({ activities }) {
  const [randomActivities, setRandomActivities] = useState([]);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const getRandomActivities = () => {
    if (!activities || activities.length === 0) return [];
    const shuffled = [...activities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 16);
  };

  useEffect(() => {
    setRandomActivities(getRandomActivities());
  }, [activities]);

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
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [randomActivities]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 240; // Scroll 2 items at a time
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <Container>
        <Title>Random Activities</Title>
        <EmptyState>No activities available at the moment.</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Discover Activities</Title>
      <ScrollWrapper>
        <ScrollButton 
          $left 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </ScrollButton>
        <ScrollContainer ref={scrollContainerRef}>
          {randomActivities.map((activity) => (
            <Link href={`/activity/${activity._id}`} passHref key={activity._id}>
              <CardContent>
                <ImageContainer>
                  <Image
                    src={activity.imageUrl[0] || '/placeholder-activity.jpg'}
                    alt={activity.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </ImageContainer>
                <ActivityName>{activity.name}</ActivityName>
                <Location>{activity.location?.address || 'Location not specified'}</Location>
              </CardContent>
            </Link>
          ))}
        </ScrollContainer>
        <ScrollButton 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </ScrollButton>
      </ScrollWrapper>
    </Container>
  );
}
