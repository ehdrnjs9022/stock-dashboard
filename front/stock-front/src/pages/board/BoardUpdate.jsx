import { useContext, useEffect, useState } from 'react';
import {
  UpdateWrap,
  UpdateBox,
  Label,
  Input,
  Select,
  TextArea,
  ButtonWrap,
  SubmitBtn,
  CancelBtn,
  Title,
} from './BoardUpdate.style';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const BoardUpdate = () => {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const { boardNo } = useParams();
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
      .put(`http://localhost:8080/api/board/update/${boardNo}`, form, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navi('/board');
      })
      .catch((err) => {
        console.log(err, '수정에러');
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board/details/${boardNo}`)
      .then((res) => {
        setForm({
          category: res.data.items.category,
          title: res.data.items.title,
          content: res.data.items.content,
        });
      })
      .catch((err) => {
        console.log('디테일조회오류');
      });
  }, [boardNo]);

  return (
    <UpdateWrap>
      <Title>게시글 수정</Title>

      <UpdateBox>
        <div>
          <Label>카테고리</Label>
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="free">자유</option>
            <option value="domestic">국내</option>
            <option value="overseas">해외</option>
            <option value="crypto">코인</option>
          </Select>
        </div>

        <div>
          <Label>제목</Label>
          <Input
            placeholder="제목을 입력하세요"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>내용</Label>
          <TextArea
            placeholder="내용을 입력하세요"
            name="content"
            value={form.content}
            onChange={handleChange}
          />
        </div>
      </UpdateBox>

      <ButtonWrap>
        <SubmitBtn onClick={handleSubmit}> 수정하기</SubmitBtn>
        <CancelBtn>취소</CancelBtn>
      </ButtonWrap>
    </UpdateWrap>
  );
};

export default BoardUpdate;
