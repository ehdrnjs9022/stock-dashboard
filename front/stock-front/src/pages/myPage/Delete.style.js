import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 650px;
  margin: 60px auto;
  padding: 20px;
  font-family: 'Pretendard', sans-serif;
`;

export const DeleteBox = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const DeleteTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #d00000;
  margin-bottom: 20px;
`;

export const DeleteText = styled.p`
  color: #444;
  margin-bottom: 25px;
  line-height: 1.6;
`;

export const DeleteInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 25px;

  &:focus {
    border-color: #ff4d4d;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.15);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const DangerButton = styled.button`
  padding: 10px 20px;
  background: #ff4d4d;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #d00000;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background: #e9ecef;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #555;

  &:hover {
    background: #dfe2e6;
  }
`;
