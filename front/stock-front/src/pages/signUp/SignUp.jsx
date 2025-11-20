import { useState } from 'react';
import {
  Container,
  SignUpForm,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  EmailInput,
  EmailFormGroup,
  EmailButton,
} from './SignUp.styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navi = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/signup`, {
        realName: name,
        nickName: nickName,
        userId: userId,
        password: password,
        email: email,
      })
      .then((res) => {
        alert(res.data.message);
        navi('/');
        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err, '회원가입오류');
      });
  };

  const handleEmail = (e) => {
    e.preventDefault();
    alert('인증번호 전송');
    axios
      .post(`http://localhost:8080/api/email-send`, {
        email: email,
      })
      .then((res) => {
        alert(res.data.mesaage);
        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err, '이메일보내기오류');
      });
  };

  const handelCode = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/verifyCode`, {
        email: email,
        code: code,
      })
      .then((res) => {
        alert(res.data.message);
        console.log(res);
      })
      .catch((err) => {
        alert(err.response.data);
        console.log('코드인증오류');
      });
  };

  return (
    <>
      <Container>
        <SignUpForm onSubmit={handlerSubmit}>
          <Title>회원가입</Title>
          <Form>
            <FormGroup>
              <Label>이름</Label>
              <Input
                type="text"
                placeholder="이름을 입력하세요"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>닉네임</Label>
              <Input
                type="text"
                placeholder="닉네임을 입력하세요"
                onChange={(e) => setNickName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>아이디</Label>
              <Input
                type="text"
                placeholder="아이디를 입력하세요"
                onChange={(e) => setUserId(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>비밀번호</Label>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>이메일</Label>
              <EmailFormGroup>
                <EmailInput
                  type="email"
                  placeholder="이메일을 입력하세요"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <EmailButton type="button" onClick={handleEmail}>
                  전송
                </EmailButton>
              </EmailFormGroup>
            </FormGroup>
            <FormGroup>
              <Label>인증번호</Label>
              <EmailFormGroup>
                <EmailInput
                  type="text"
                  placeholder="인증번호를 입력하세요"
                  onChange={(e) => setCode(e.target.value)}
                />
                <EmailButton type="button" onClick={handelCode}>
                  확인
                </EmailButton>
              </EmailFormGroup>
            </FormGroup>
            <Button type="submit">회원가입</Button>
          </Form>
        </SignUpForm>
      </Container>
    </>
  );
};
export default SignUp;
