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

const Password = () => {
  return (
    <PageContainer>
      <Box>
        <Title>비밀번호 변경</Title>

        <Text>현재 비밀번호를 입력하고 새 비밀번호로 변경하세요.</Text>

        <Input type="password" placeholder="현재 비밀번호" />
        <Input type="password" placeholder="새 비밀번호" />
        <Input type="password" placeholder="새 비밀번호 확인" />

        <ButtonRow>
          <PrimaryButton>비밀번호 변경</PrimaryButton>
          <SecondaryButton>취소</SecondaryButton>
        </ButtonRow>
      </Box>
    </PageContainer>
  );
};

export default Password;
