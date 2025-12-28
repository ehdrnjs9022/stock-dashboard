import {
  HeaderWrap,
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
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const navi = useNavigate();
  const { auth, logout } = useContext(AuthContext);
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

            {auth?.accessToken ? (
              <ActionButton onClick={() => navi('/mypage')}>
                마이페이지
              </ActionButton>
            ) : null}

            {auth?.accessToken ? (
              <ActionButton
                onClick={() => {
                  logout();
                  navi('/');
                }}
              >
                로그아웃
              </ActionButton>
            ) : (
              <ActionButton onClick={() => navi('/login')}>로그인</ActionButton>
            )}
          </Right>
        </MainHeader>

        {/* 네비게이션 바 */}
        <NavBar>
          <MenuButton onClick={() => navi('/')}>홈</MenuButton>
          <MenuButton onClick={() => navi('/domestic')}>국내증시</MenuButton>
          <MenuButton onClick={() => navi('/overseas')}>해외증시</MenuButton>
          <MenuButton onClick={() => navi('/crypto')}>가상화폐</MenuButton>
          <MenuButton onClick={() => navi('/board')}>게시판</MenuButton>
        </NavBar>
      </Container>
    </HeaderWrap>
  );
};

export default Header;
