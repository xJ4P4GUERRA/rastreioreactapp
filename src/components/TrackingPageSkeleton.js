import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonCard = styled(motion.div)`
  background: #1F2937; /* Cor base do esqueleto */
  border-radius: 16px;
  padding: 30px 40px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  border: 1px solid #374151;
`;

const SkeletonElement = styled.div`
  background: linear-gradient(90deg, #374151 25%, #4B5563 50%, #374151 75%);
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
  border-radius: 8px;
`;

const HeaderSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #374151;
`;

const TitleSkeleton = styled(SkeletonElement)`
  width: 250px;
  height: 60px;
`;

const ButtonSkeleton = styled(SkeletonElement)`
  width: 120px;
  height: 44px;
`;

const SummarySkeleton = styled(SkeletonElement)`
  width: 100%;
  height: 90px;
  margin-bottom: 2rem;
`;

const StepperSkeleton = styled(SkeletonElement)`
  width: 100%;
  height: 80px;
  margin: 40px 0;
`;

const HistoryItemSkeleton = styled(SkeletonElement)`
  width: 100%;
  height: 70px;
  margin-bottom: 1rem;
`;

const TrackingPageSkeleton = () => {
  return (
    <SkeletonCard
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeaderSkeleton>
        <TitleSkeleton />
        <ButtonSkeleton />
      </HeaderSkeleton>
      <SummarySkeleton />
      <StepperSkeleton />
      <div>
        <HistoryItemSkeleton />
        <HistoryItemSkeleton />
        <HistoryItemSkeleton />
      </div>
    </SkeletonCard>
  );
};

export default TrackingPageSkeleton;