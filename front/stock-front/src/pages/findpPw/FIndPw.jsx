import {
  Container,
  LoginForm,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from './FIndPw.styles';
const FindPw = () => {
  return (
    <>
      <Container>
        <LoginForm>
          <Title>비밀번호 찾기</Title>
          <Form>
            <FormGroup>
              <Label>이메일</Label>
              <Input type="email" placeholder="이메일을 입력하세요" />
            </FormGroup>

            <FormGroup>
              <Label>아이디</Label>
              <Input type="text" placeholder="아이디를 입력하세요" />
            </FormGroup>

            <Button type="submit">비밀번호 찾기</Button>
          </Form>
        </LoginForm>
      </Container>
    </>
  );
};

export default FindPw;
