import styled from 'styled-components';

export const UpdateWrap = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const UpdateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 15px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  height: 220px;
  resize: none;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 15px;
  line-height: 1.6;
`;

export const ButtonWrap = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const SubmitBtn = styled.button`
  padding: 10px 18px;
  background: #4c7af0;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #3a68d6;
  }
`;

export const CancelBtn = styled.button`
  padding: 10px 18px;
  background: #e0e0e0;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #d5d5d5;
  }
`;
