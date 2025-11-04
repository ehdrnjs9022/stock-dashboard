import {
  Container,
  LoginForm,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from './FindId.styles';
const FindId = () => {
  return (
    <>
      <Container>
        <LoginForm>
          <Title>아이디 찾기</Title>
          <Form>
            <FormGroup>
              <Label>이메일</Label>
              <Input type="email" placeholder="이메일을 입력하세요" />
            </FormGroup>

            <FormGroup>
              <Label>비밀번호</Label>
              <Input type="password" placeholder="비밀번호를 입력하세요" />
            </FormGroup>

            <Button type="submit">아이디 찾기</Button>
          </Form>
        </LoginForm>
      </Container>
    </>
  );
};

export default FindId;
