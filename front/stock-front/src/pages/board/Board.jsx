import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BoardWrap,
  BoardHeader,
  Title,
  WriteButton,
  CategoryWrap,
  CatButton,
  Table,
  Tr,
  Th,
  Td,
} from './Board.style';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const [category, setCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board?category=${category}`)
      .then((res) => {
        setPosts(res.data.items ?? []);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err, '게시판에러');
      });
  }, [category]);

  return (
    <BoardWrap>
      {/* 상단 */}
      <BoardHeader>
        <Title>게시판</Title>
        <WriteButton onClick={() => navi('/board/write')}>글쓰기</WriteButton>
      </BoardHeader>

      {/* 카테고리 */}
      <CategoryWrap>
        <CatButton
          active={category === 'all'}
          onClick={() => setCategory('all')}
        >
          전체
        </CatButton>
        <CatButton
          active={category === 'domestic'}
          onClick={() => setCategory('domestic')}
        >
          국내
        </CatButton>
        <CatButton
          active={category === 'overseas'}
          onClick={() => setCategory('overseas')}
        >
          해외
        </CatButton>
        <CatButton
          active={category === 'crypto'}
          onClick={() => setCategory('crypto')}
        >
          코인
        </CatButton>
        <CatButton
          active={category === 'free'}
          onClick={() => setCategory('free')}
        >
          자유
        </CatButton>
      </CategoryWrap>

      {/* 게시글 목록 */}
      <Table>
        <thead>
          <Tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>조회</Th>
            <Th>추천</Th>
            <Th>날짜</Th>
          </Tr>
        </thead>

        <tbody>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((p) => (
              <Tr key={p.boardNo} onClick={() => navi(`/board/${p.boardNo}`)}>
                <Td>{p.boardNo}</Td>
                <Td>{p.title}</Td>
                <Td>{p.nickName}</Td>
                <Td>{p.viewCount}</Td>
                <Td>{p.likeCount}</Td>
                <Td>{p.createDate}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td
                colSpan={5}
                style={{ textAlign: 'center', padding: '40px', color: '#777' }}
              >
                게시글이 없습니다.
              </Td>
            </Tr>
          )}
        </tbody>
      </Table>
    </BoardWrap>
  );
};

export default Board;
