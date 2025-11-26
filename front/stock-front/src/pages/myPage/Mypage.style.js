// Mypage.styles.js
import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Pretendard', sans-serif;
`;

/* 히어로 */
export const Hero = styled.div`
  height: 180px;
  border-radius: 14px;
  background: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')
    center/cover no-repeat;
  position: relative;
  margin-bottom: 40px;
`;

export const HeroText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 30px;
  color: white;

  h1 {
    font-size: 2rem;
    margin-bottom: 5px;
  }
`;

/* 프로필 카드 전체 */
export const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
`;

/* 왼쪽 영역 (사진+정보) */
export const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

export const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div``;

export const ProfileNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProfileName = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
`;

export const ProfileEmail = styled.p`
  margin-top: 10px;
  color: #666;
  font-size: 0.95rem;
`;

export const ProfileRealName = styled.p`
  color: #666;
  font-size: 0.95rem;
`;

/* 오른쪽 설정 영역 */
export const SettingsArea = styled.div`
  position: relative;
`;

export const SettingsButton = styled.button`
  padding: 10px 15px;
  background: #3a86ff;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #2563eb;
  }
`;

/* 드롭다운 */
export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 160px;
`;

export const DropdownItem = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  font-size: 0.95rem;
  color: ${(p) => (p.red ? '#d00000' : '#444')};

  &:hover {
    background: #f1f3f5;
  }
`;

/* 섹션 */
export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

export const EmptyBox = styled.div`
  background: #f8f9fa;
  padding: 60px 40px;
  border-radius: 12px;
  text-align: center;
  color: #adb5bd;
`;

/* 모달 */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

export const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  z-index: 101;
`;

export const ModalHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  padding: 10px 18px;
  background: #3a86ff;
  color: white;
  border-radius: 8px;
  border: none;
`;

export const SecondaryButton = styled.button`
  padding: 10px 18px;
  background: #f1f3f5;
  border-radius: 8px;
  border: none;
`;
