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
} from './Search.styles';

const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const cleanText = (str) => {
    if (!str) return '';
    // 1. 태그 제거
    const noTag = str.replace(/<[^>]+>/g, '');
    // 2. 엔티티 변환
    return he.decode(noTag);
  };

  useEffect(() => {
    if (!query) return;
    axios
      .get(`http://localhost:8080/api/search`, { params: { query } })
      .then((res) => {
        setResults(res.data.items.body.items || []);
      })
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <SearchWrap>
      <Title>"{query}" 검색 결과</Title>

      {results.length > 0 ? (
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
      ) : (
        <EmptyBox>
          검색 결과가 없습니다 😢 <br />
          인기 검색어: 삼성전자, 코스피, 카카오
        </EmptyBox>
      )}
    </SearchWrap>
  );
};

export default Search;
