import {
  HeaderWrap,
  TopNotice,
  MainHeader,
  NavBar,
  Right,
  Left,
  Container,
  SearchInput,
  SearchForm,
  LogoButton,
  MenuButton,
  ActionButton,
} from './Header.styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const navi = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navi(`/search?query=${search}`);
  };

  return (
    <HeaderWrap>
      {/* 상단 공지 배너 */}

      <Container>
        {/* 메인 헤더 */}
        <MainHeader>
          <Left>
            <LogoButton onClick={() => navi('/')}>UpChart</LogoButton>
          </Left>
          <Right>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput
                placeholder="검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchForm>
            <ActionButton onClick={() => navi('/login')}>로그인</ActionButton>
          </Right>
        </MainHeader>

        {/* 네비게이션 바 */}
        <NavBar>
          <MenuButton onClick={() => navi('/')}>홈</MenuButton>
          <MenuButton onClick={() => navi('/domestic')}>국내증시</MenuButton>
          <MenuButton onClick={() => navi('/overseas')}>해외증시</MenuButton>
          <MenuButton onClick={() => navi('/crypto')}>가상화폐</MenuButton>
        </NavBar>
      </Container>
    </HeaderWrap>
  );
};

export default Header;
