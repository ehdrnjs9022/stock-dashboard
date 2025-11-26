// delete/Delete.jsx
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

const Delete = () => {
  return (
    <PageContainer>
      <DeleteBox>
        <DeleteTitle>회원 탈퇴</DeleteTitle>

        <DeleteText>
          회원 탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
          <br />
          계속 진행하려면 비밀번호를 입력하세요.
        </DeleteText>

        <DeleteInput type="password" placeholder="비밀번호 입력" />

        <ButtonRow>
          <DangerButton>탈퇴하기</DangerButton>
          <CancelButton>취소</CancelButton>
        </ButtonRow>
      </DeleteBox>
    </PageContainer>
  );
};

export default Delete;
