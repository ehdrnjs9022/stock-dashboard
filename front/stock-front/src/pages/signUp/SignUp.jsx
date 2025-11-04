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
const SignUp = () => {
  return (
    <>
      <Container>
        <SignUpForm>
          <Title>회원가입</Title>
          <Form>
            <FormGroup>
              <Label>아이디</Label>
              <Input type="text" placeholder="아이디를 입력하세요" />
            </FormGroup>
            <FormGroup>
              <Label>비밀번호</Label>
              <Input type="password" placeholder="비밀번호를 입력하세요" />
            </FormGroup>
            <FormGroup>
              <Label>이메일</Label>
              <EmailFormGroup>
                <EmailInput type="email" placeholder="이메일을 입력하세요" />

                <EmailButton>전송</EmailButton>
              </EmailFormGroup>
            </FormGroup>
            <FormGroup>
              <Label>인증번호</Label>
              <EmailFormGroup>
                <EmailInput type="text" placeholder="인증번호를 입력하세요" />
                <EmailButton>확인</EmailButton>
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
