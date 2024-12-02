import { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function Rating({ activityId, averageRating = 0, totalRatings = 0 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const handleRating = async (value) => {
    if (!session) {
      toast.error('Please sign in to rate activities');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch('/api/activities/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          activityId,
          rating: value,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit rating');
      }

      setRating(value);
      setComment('');
      toast.success('Rating submitted successfully!');

    } catch (error) {
      console.error('Rating error:', error);
      toast.error(error.message || 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RatingContainer>
      <StarContainer>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarButton
            key={star}
            disabled={isSubmitting}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <FaStar
              size={20}
              color={(hover || rating) >= star ? "#ffc107" : "#e4e5e9"}
            />
          </StarButton>
        ))}
      </StarContainer>
      
      <RatingStats>
        <AverageRating>{averageRating.toFixed(1)}</AverageRating>
        <TotalRatings>({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})</TotalRatings>
      </RatingStats>

      <CommentInput
        placeholder="Add a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isSubmitting}
      />
    </RatingContainer>
  );
}

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const RatingStats = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AverageRating = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

const TotalRatings = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;
