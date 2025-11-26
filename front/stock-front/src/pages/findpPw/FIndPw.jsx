import axios from 'axios';
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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const FindPw = () => {
  const navi = useNavigate();
  const [findInfo, setFindInfo] = useState({
    email: '',
    userId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFindInfo({ ...findInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/find-pw`, findInfo)
      .then((res) => {
        alert(res.data.message);
        navi('/login');
      })
      .catch((err) => {
        alert(err.response.message);
      });
  };

  return (
    <>
      <Container>
        <LoginForm onSubmit={handleSubmit}>
          <Title>비밀번호 찾기</Title>
          <Form>
            <FormGroup>
              <Label>이메일</Label>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                name="email"
                value={findInfo.email}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>아이디</Label>
              <Input
                type="text"
                placeholder="아이디를 입력하세요"
                name="userId"
                value={findInfo.userId}
                onChange={handleChange}
              />
            </FormGroup>

            <Button type="submit">비밀번호 찾기</Button>
          </Form>
        </LoginForm>
      </Container>
    </>
  );
};

export default FindPw;
