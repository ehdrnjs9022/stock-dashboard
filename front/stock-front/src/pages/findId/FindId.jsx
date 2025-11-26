import { useState } from 'react';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindId = () => {
  const navi = useNavigate();
  const [findInfo, setFindInfo] = useState({
    email: '',
    realName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFindInfo({ ...findInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/find-id`, findInfo)
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
        <LoginForm>
          <Title>아이디 찾기</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>이메일</Label>
              <Input
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={findInfo.email}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>이름</Label>
              <Input
                type="text"
                name="realName"
                placeholder="이름을 입력하세요"
                value={findInfo.realName}
                onChange={handleChange}
              />
            </FormGroup>

            <Button type="submit">아이디 찾기</Button>
          </Form>
        </LoginForm>
      </Container>
    </>
  );
};

export default FindId;
