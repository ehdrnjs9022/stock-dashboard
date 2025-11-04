import styled from 'styled-components';

export const HeaderWrap = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
`;

/* 상단 공지 영역 */
export const TopNotice = styled.div`
  background: linear-gradient(90deg, #0d47a1, #1976d2);
  color: #fff;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  letter-spacing: 0.3px;
  font-weight: 500;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

/* 메인 헤더 */
export const MainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  height: 72px;
  border-bottom: 1px solid #f1f3f5;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

/* 로고 */
export const LogoButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  font-weight: 900;
  cursor: pointer;
  color: #1a237e;
  letter-spacing: -0.8px;
  font-family: 'Inter', 'Pretendard', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    color: #3949ab;
    transform: scale(1.03);
  }
`;

/* 검색창 */
export const SearchForm = styled.form`
  position: relative;
`;

export const SearchInput = styled.input`
  height: 38px;
  padding: 0 14px;
  font-size: 14px;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.25s ease;
  width: 200px;

  &:focus {
    background: #fff;
    border-color: #5b77f2;
    box-shadow: 0 0 0 2px rgba(91, 119, 242, 0.15);
    outline: none;
  }
`;

/* 네비게이션 */
export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;
  height: 56px;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 28px;
  font-size: 15px;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  color: #333;
  font-weight: 500;
  transition: all 0.25s ease;

  &:hover {
    color: #5b77f2;
    transform: translateY(-2px);
  }
`;

/* 로그인 버튼 */
export const ActionButton = styled.button`
  background: #5b77f2;
  border: none;
  padding: 8px 18px;
  font-size: 14px;
  border-radius: 6px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background: #3b4ce2;
    transform: translateY(-2px);
  }
`;
