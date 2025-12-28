import styled from 'styled-components';

export const WriteWrap = styled.div`
  max-width: 820px;
  margin: 40px auto;
  padding: 0 24px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 26px;
  color: #1a237e;
`;

export const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 700;
  color: #333;
`;

export const Input = styled.input`
  padding: 12px 14px;
  font-size: 15px;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.2s ease;

  &:focus {
    background: #fff;
    border-color: #5b77f2;
    box-shadow: 0 0 0 2px rgba(91, 119, 242, 0.15);
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 12px 14px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #cfd8dc;
  background: #fafafa;
  transition: 0.2s;

  &:focus {
    background: #fff;
    border-color: #5b77f2;
    box-shadow: 0 0 0 2px rgba(91, 119, 242, 0.15);
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  height: 300px;
  resize: none;
  padding: 14px;
  font-size: 15px;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  background: #fafafa;
  line-height: 1.6;
  transition: all 0.2s;

  &:focus {
    background: #fff;
    border-color: #5b77f2;
    box-shadow: 0 0 0 2px rgba(91, 119, 242, 0.15);
    outline: none;
  }
`;

export const ButtonWrap = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 12px;
`;

export const SubmitBtn = styled.button`
  padding: 12px 24px;
  background: #5b77f2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: #3b4ce2;
    transform: translateY(-2px);
  }
`;

export const CancelBtn = styled.button`
  padding: 12px 24px;
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: #cacaca;
  }
`;
