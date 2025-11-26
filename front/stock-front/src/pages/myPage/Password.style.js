import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 650px;
  margin: 60px auto;
  padding: 20px;
  font-family: 'Pretendard', sans-serif;
`;

export const Box = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const Text = styled.p`
  color: #666;
  margin-bottom: 25px;
  line-height: 1.6;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;

  &:focus {
    border-color: #3a86ff;
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.25);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const PrimaryButton = styled.button`
  padding: 10px 20px;
  background: #3a86ff;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #2563eb;
  }
`;

export const SecondaryButton = styled.button`
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
