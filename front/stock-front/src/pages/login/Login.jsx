import { useContext, useState } from 'react';
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
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navi = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/login`, loginInfo)
      .then((res) => {
        const data = res.data.items;

        login(
          data.userId,
          data.nickName,
          data.realName,
          data.email,
          data.accessToken,
          data.refreshToken
        );

        alert(res.data.message);
        navi('/');
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <Form>
          <FormGroup>
            <Label>아이디</Label>
            <Input
              type="text"
              placeholder="아이디를 입력하세요"
              name="userId"
              value={loginInfo.userId}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
            />
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
