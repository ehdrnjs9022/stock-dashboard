// Search.styles.js
import styled from 'styled-components';

export const SearchWrap = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NewsCard = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const NewsContent = styled.div`
  flex: 1;
`;

export const NewsTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const MetaInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

export const LinkButton = styled.a`
  color: #5b77f2;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyBox = styled.div`
  margin-top: 40px;
  padding: 40px;
  text-align: center;
  border: 1px dashed #ccc;
  border-radius: 12px;
  color: #777;
  font-size: 16px;
`;
// Search.styles.js

// ... 기존 코드 위에 그대로 두고 밑에 추가👇

export const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 40px 0 20px;
`;

export const PageButton = styled.button`
  border: 1px solid #ccc;
  background: #fff;
  color: #333;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #5b77f2;
    color: #5b77f2;
  }

  &.active {
    background: #5b77f2;
    color: #fff;
    border-color: #5b77f2;
    font-weight: bold;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
