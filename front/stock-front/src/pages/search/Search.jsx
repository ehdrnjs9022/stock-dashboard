// Search.jsx
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import he from 'he';
import {
  SearchWrap,
  Title,
  ResultList,
  NewsCard,
  NewsContent,
  NewsTitle,
  MetaInfo,
  LinkButton,
  EmptyBox,
  PageButton,
  PaginationWrap,
} from './Search.styles';

const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const display = 5;
  const totalPages = Math.ceil(total / display);

  const groupSize = 5;
  const startPage = Math.floor((page - 1) / groupSize) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const cleanText = (str) => {
    if (!str) return '';
    // 1. 태그 제거
    const noTag = str.replace(/<[^>]+>/g, '');
    // 2. 엔티티 변환
    return he.decode(noTag);
  };

  useEffect(() => {
    if (!query) return;
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:8080/api/search`, {
        params: { query, display, start: (page - 1) * display + 1 },
      })
      .then((res) => {
        setResults(res.data.items.body.items || []);
        setTotal(res.data.items.body.total);
        console.log(res.data || []);
      })
      .catch((err) => console.error(err));
  }, [query, page]);

  return (
    <SearchWrap>
      <Title>"{query}" 검색 결과</Title>

      {results.length > 0 ? (
        <>
          <ResultList>
            {results.map((news, idx) => (
              <NewsCard key={idx}>
                <NewsContent>
                  <NewsTitle>{cleanText(news.title)}</NewsTitle>
                  <MetaInfo>{cleanText(news.pubDate)}</MetaInfo>
                  <p>{cleanText(news.description)}</p>
                  <LinkButton href={cleanText(news.link)}>기사 보기</LinkButton>
                </NewsContent>
              </NewsCard>
            ))}
          </ResultList>
          <PaginationWrap>
            <PageButton
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              이전
            </PageButton>
            {visiblePages.map((num) => (
              <PageButton
                key={num}
                className={page === num ? 'active' : ''}
                onClick={() => setPage(num)}
              >
                {num}
              </PageButton>
            ))}

            <PageButton
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              다음
            </PageButton>
          </PaginationWrap>
        </>
      ) : (
        <EmptyBox>
          검색 결과가 없습니다 <br />
          인기 검색어: 삼성전자, 코스피, 카카오
        </EmptyBox>
      )}
    </SearchWrap>
  );
};

export default Search;
