import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  Hero,
  HeroText,
  ProfileCard,
  ProfileLeft,
  ProfileImage,
  ProfileInfo,
  ProfileNameRow,
  ProfileName,
  ProfileEmail,
  ProfileRealName,
  SettingsArea,
  SettingsButton,
  DropdownMenu,
  DropdownItem,
  Section,
  SectionTitle,
  EmptyBox,
  ModalOverlay,
  ModalBox,
  ModalHeader,
  ModalInput,
  ModalButtons,
  PrimaryButton,
  SecondaryButton,
} from './Mypage.style';

const Mypage = () => {
  const navi = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [openNicknameModal, setOpenNicknameModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [newNick, setNewNick] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleProfileFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <PageContainer>
      {/* 히어로 */}
      <Hero>
        <HeroText>
          <h1>마이페이지</h1>
          <p>내 정보를 관리하세요</p>
        </HeroText>
      </Hero>

      {/* 프로필 카드 */}
      <ProfileCard>
        <ProfileLeft>
          <ProfileImage />

          <ProfileInfo>
            <ProfileNameRow>
              <ProfileName>닉네임</ProfileName>
            </ProfileNameRow>

            <ProfileEmail>📧 example@ naver.com</ProfileEmail>
            <ProfileRealName>🙋 홍길동</ProfileRealName>
          </ProfileInfo>
        </ProfileLeft>

        {/* 설정 버튼 */}
        <SettingsArea>
          <SettingsButton onClick={() => setShowMenu(!showMenu)}>
            ⚙ 설정
          </SettingsButton>

          {showMenu && (
            <DropdownMenu>
              <DropdownItem onClick={() => setOpenNicknameModal(true)}>
                ✏️ 닉네임 변경
              </DropdownItem>
              <DropdownItem onClick={() => setOpenProfileModal(true)}>
                🖼 프로필 변경
              </DropdownItem>
              <DropdownItem onClick={() => navi('/mypage/password')}>
                🔒 비밀번호 변경
              </DropdownItem>
              <DropdownItem red onClick={() => navi('/mypage/delete')}>
                ❌ 회원탈퇴
              </DropdownItem>
            </DropdownMenu>
          )}
        </SettingsArea>
      </ProfileCard>

      {/* 즐겨찾기 */}
      <Section>
        <SectionTitle> 즐겨찾기</SectionTitle>
        <EmptyBox>등록된 즐겨찾기가 없습니다.</EmptyBox>
      </Section>

      {/* 활동 */}
      <Section>
        <SectionTitle> 나의 활동</SectionTitle>
        <EmptyBox>작성한 활동이 없습니다.</EmptyBox>
      </Section>

      {/* 닉네임 변경 모달 */}
      {openNicknameModal && (
        <>
          <ModalOverlay onClick={() => setOpenNicknameModal(false)} />
          <ModalBox>
            <ModalHeader>닉네임 변경</ModalHeader>

            <ModalInput
              placeholder="새 닉네임 입력"
              value={newNick}
              onChange={(e) => setNewNick(e.target.value)}
            />

            <ModalButtons>
              <PrimaryButton>저장</PrimaryButton>
              <SecondaryButton onClick={() => setOpenNicknameModal(false)}>
                취소
              </SecondaryButton>
            </ModalButtons>
          </ModalBox>
        </>
      )}

      {/* 프로필 이미지 변경 모달 */}
      {openProfileModal && (
        <>
          <ModalOverlay onClick={() => setOpenProfileModal(false)} />
          <ModalBox>
            <ModalHeader>프로필 이미지 변경</ModalHeader>

            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0 auto 20px',
                }}
              />
            )}

            <ModalInput type="file" onChange={handleProfileFile} />

            <ModalButtons>
              <PrimaryButton>변경</PrimaryButton>
              <SecondaryButton onClick={() => setOpenProfileModal(false)}>
                취소
              </SecondaryButton>
            </ModalButtons>
          </ModalBox>
        </>
      )}
    </PageContainer>
  );
};

export default Mypage;
