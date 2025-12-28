import { useContext, useState } from 'react';
import {
  PageContainer,
  Box,
  Title,
  Text,
  Input,
  ButtonRow,
  PrimaryButton,
  SecondaryButton,
} from './Password.style';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Password = () => {
  const navi = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordCheck) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    axios
      .put(
        `http://localhost:8080/api/password`,
        {
          password: password,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        logout();
        setTimeout(() => {
          navi('/login');
        }, 500);
      })
      .catch((err) => {
        console.log('비밀번호변경오류');
      });
  };
  console.log('access:', auth.accessToken);
  return (
    <PageContainer>
      <Box>
        <Title>비밀번호 변경</Title>

        <Text>현재 비밀번호를 입력하고 새 비밀번호로 변경하세요.</Text>

        <Input
          type="password"
          placeholder="현재 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="새 비밀번호 확인"
          value={newPasswordCheck}
          onChange={(e) => setNewPasswordCheck(e.target.value)}
        />

        <ButtonRow>
          <PrimaryButton onClick={handleSubmit}>비밀번호 변경</PrimaryButton>
          <SecondaryButton onClick={() => navi('/mypage')}>
            취소
          </SecondaryButton>
        </ButtonRow>
      </Box>
    </PageContainer>
  );
};

export default Password;
