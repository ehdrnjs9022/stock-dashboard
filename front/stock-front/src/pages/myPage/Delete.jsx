import axios from 'axios';
import {
  PageContainer,
  DeleteBox,
  DeleteTitle,
  DeleteText,
  DeleteInput,
  ButtonRow,
  DangerButton,
  CancelButton,
} from './Delete.style';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import reisseToken from '../../api/reissueToken';
const Delete = () => {
  const [password, setPassword] = useState('');
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    reisseToken
      .post(`http://localhost:8080/api/delete`, { password })

      .then((res) => {
        alert(res.data.message);
        setTimeout(() => {
          navi('/login');
        }, 0.5);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PageContainer>
      <DeleteBox>
        <DeleteTitle>회원 탈퇴</DeleteTitle>

        <DeleteText>
          회원 탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
          <br />
          계속 진행하려면 비밀번호를 입력하세요.
        </DeleteText>

        <DeleteInput
          type="password"
          placeholder="비밀번호 입력"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <ButtonRow>
          <DangerButton onClick={handleSubmit}>탈퇴하기</DangerButton>
          <CancelButton onClick={() => navi('/mypage')}>취소</CancelButton>
        </ButtonRow>
      </DeleteBox>
    </PageContainer>
  );
};

export default Delete;
