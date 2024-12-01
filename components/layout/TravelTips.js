import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

const TipItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  min-width: 200px;
`;

const TipButton = styled.div`
  width: 200px;
  height: 120px;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
`;

export default function TravelTips({ categories }) {
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
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [categories]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400; // Scroll 2 items at a time
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <Container>
        <Title>Travel Tips</Title>
        <EmptyState>No travel tips available at the moment.</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Travel Tips</Title>
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
          {categories.map((category) => (
            <TipItem
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/travel-tips/${category.id}`} style={{ textDecoration: 'none' }}>
                <TipButton>
                  {category.title} Travel Tips
                </TipButton>
              </Link>
            </TipItem>
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
