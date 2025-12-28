import styled from 'styled-components';

export const BoardWrap = styled.div`
  max-width: 1080px;
  margin: 50px auto;
  padding: 0 28px;
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 900;
  color: #1a237e;
`;

export const WriteButton = styled.button`
  background: #5b77f2;
  color: #fff;
  padding: 8px 18px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: 0.25s ease;

  &:hover {
    background: #3b4ce2;
    transform: translateY(-2px);
  }
`;

export const CategoryWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CatButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: ${({ active }) => (active ? '#5b77f2' : '#e9ecef')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: ${({ active }) => (active ? '#4a63d5' : '#dee2e6')};
  }
`;

/* 테이블 */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

/* 헤더 */
export const Th = styled.th`
  padding: 14px 8px;
  font-size: 15px;
  font-weight: 700;
  color: #333;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
  text-align: center;

  &:nth-child(1) {
    width: 8%;
  }
  &:nth-child(2) {
    width: 52%;
    text-align: left;
    padding-left: 12px;
  }
  &:nth-child(3) {
    width: 12%;
  }
  &:nth-child(4) {
    width: 10%;
  }
  &:nth-child(5) {
    width: 10%;
  }
  &:nth-child(6) {
    width: 10%;
  }
`;

/* 행 */
export const Tr = styled.tr`
  cursor: pointer;
  transition: 0.15s ease;

  &:hover {
    background: #f7f9ff;
  }
`;

/* 데이터 컬럼 */
export const Td = styled.td`
  padding: 14px 8px;
  font-size: 15px;
  color: #444;
  border-bottom: 1px solid #f1f3f5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: center;

  &:nth-child(1) {
    width: 8%;
  }
  &:nth-child(2) {
    width: 52%;
    text-align: left;
    padding-left: 12px;
  }
  &:nth-child(3) {
    width: 12%;
  }
  &:nth-child(4) {
    width: 10%;
  }
  &:nth-child(5) {
    width: 10%;
  }
  &:nth-child(6) {
    width: 10%;
  }
`;
