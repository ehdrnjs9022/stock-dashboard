import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 25px 20px;
  font-family: "Pretendard", sans-serif;
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 25px;
`;

export const EmptyBox = styled.div`
  background: #f8f9fa;
  padding: 40px 30px;
  border-radius: 12px;
  text-align: center;
  color: #868e96;
  font-size: 1rem;
`;

export const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/* 참신한 카드 스타일 */
export const CommentCard = styled.div`
  background: #fefefe;
  border-radius: 20px; /* 완전 둥글게 */
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const CommentContent = styled.p`
  font-size: 1rem;
  color: #495057;
  line-height: 1.5;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #868e96;
  align-self: flex-end;
`;
