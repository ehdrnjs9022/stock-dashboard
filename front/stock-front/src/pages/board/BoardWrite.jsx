import { useContext, useState } from 'react';
import {
  WriteWrap,
  WriteBox,
  Label,
  Input,
  Select,
  TextArea,
  ButtonWrap,
  SubmitBtn,
  CancelBtn,
  Title,
} from './BoardWrite.style';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [form, setForm] = useState({
    category: 'free',
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/board/write`, form, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        navi('/board');
        console.log(res, '글쓰기성공');
      })
      .catch((err) => {
        console.log(err, '글쓰기 에러');
      });
  };

  return (
    <WriteWrap>
      <Title>게시글 작성</Title>

      <WriteBox>
        <Label>카테고리</Label>
        <Select name="category" value={form.category} onChange={handleChange}>
          <option value="free">자유</option>
          <option value="domestic">국내</option>
          <option value="overseas">해외</option>
          <option value="crypto">코인</option>
        </Select>

        <Label>제목</Label>
        <Input
          name="title"
          placeholder="제목을 입력하세요"
          onChange={handleChange}
          value={form.title}
        />

        <Label>내용</Label>
        <TextArea
          name="content"
          placeholder="내용을 입력하세요"
          onChange={handleChange}
          value={form.content}
        />
      </WriteBox>

      <ButtonWrap>
        <SubmitBtn onClick={handleSubmit}>작성하기</SubmitBtn>
        <CancelBtn onClick={() => window.history.back()}>취소</CancelBtn>
      </ButtonWrap>
    </WriteWrap>
  );
};

export default BoardWrite;
