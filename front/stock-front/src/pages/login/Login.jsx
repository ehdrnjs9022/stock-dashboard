import {
  Container,
  LoginForm,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
} from './login.styles';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navi = useNavigate();
  return (
    <Container>
      <LoginForm>
        <Title>로그인</Title>
        <Form>
          <FormGroup>
            <Label>아이디</Label>
            <Input type="text" placeholder="아이디를 입력하세요" />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </FormGroup>

          <Button type="submit">로그인</Button>

          <ButtonGroup>
            <Button
              type="button"
              onClick={() => {
                navi('/signUp');
              }}
            >
              회원가입
            </Button>
            <Button
              type="button"
              onClick={() => {
                navi('/findId');
              }}
            >
              아이디 찾기
            </Button>
            <Button
              type="button"
              onClick={() => {
                navi('/findpw');
              }}
            >
              비밀번호 찾기
            </Button>
          </ButtonGroup>
        </Form>
      </LoginForm>
    </Container>
  );
};

export default Login;
