import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./Mypage.style";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Mypage = () => {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [info, setInfo] = useState(null);

  const [showMenu, setShowMenu] = useState(false);
  const [openNicknameModal, setOpenNicknameModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [newNick, setNewNick] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);

  const defaultUrl =
    "https://dk-project-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg";

  const handleProfileFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!auth.accessToken) return;
    axios
      .get(`http://localhost:8080/api/profile/select`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setSelectImage(res.data.items.fileUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.accessToken]);

  const handleUpload = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(`http://localhost:8080/api/profile/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setSelectImage(res.data.items);
        setOpenProfileModal(false);

        console.log("업로드성공", res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!auth.accessToken) return;
    axios
      .get(`http://localhost:8080/api/info`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setInfo(res.data.items);
        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.accessToken]);
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
          <ProfileImage src={previewImage || selectImage || defaultUrl} />

          <ProfileInfo>
            <ProfileNameRow>
              <ProfileName>{info?.nickName}</ProfileName>
            </ProfileNameRow>

            <ProfileEmail>📧 {info?.email}</ProfileEmail>
            <ProfileRealName>🙋 {info?.realName}</ProfileRealName>
          </ProfileInfo>
        </ProfileLeft>

        {/* 설정 버튼 */}
        <SettingsArea>
          <SettingsButton onClick={() => setShowMenu(!showMenu)}>
            ⚙ 설정
          </SettingsButton>

          {showMenu && (
            <DropdownMenu>
              {/* <DropdownItem onClick={() => setOpenNicknameModal(true)}>
                ✏️ 닉네임 변경
              </DropdownItem> */}
              <DropdownItem onClick={() => setOpenProfileModal(true)}>
                🖼 프로필 변경
              </DropdownItem>
              <DropdownItem onClick={() => navi("/mypage/password")}>
                🔒 비밀번호 변경
              </DropdownItem>
              <DropdownItem red onClick={() => navi("/mypage/delete")}>
                ❌ 회원탈퇴
              </DropdownItem>
            </DropdownMenu>
          )}
        </SettingsArea>
      </ProfileCard>

      {/* 즐겨찾기 / 추천 종목 */}
      <Section>
        <SectionTitle>추천 종목</SectionTitle>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* 더미 추천 종목 카드 */}
          {["테스트시장1", "테스트시장2", "테스트시장3", "테스트시장4"].map(
            (item) => (
              <div
                key={item}
                style={{
                  background: "#f1f3f5",
                  borderRadius: "12px",
                  padding: "20px",
                  minWidth: "140px",
                  flex: "1 0 140px",
                  textAlign: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
              >
                <strong>{item}</strong>
                <p style={{ marginTop: "8px", color: "#666" }}>추천 종목</p>
              </div>
            ),
          )}
        </div>
      </Section>

      {/* 나의 활동 */}
      <Section>
        <SectionTitle>나의 활동</SectionTitle>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* 더미 활동 카드 */}
          {[
            { title: "작성한 게시물", count: 0 },
            { title: "작성한 댓글", count: 0 },
          ].map((activity) => (
            <div
              key={activity.title}
              style={{
                background: "#f8f9fa",
                borderRadius: "12px",
                padding: "25px 20px",
                minWidth: "160px",
                flex: "1 0 160px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "8px",
                }}
              >
                {activity.title}
              </p>
              <strong style={{ fontSize: "1.4rem" }}>{activity.count}</strong>
            </div>
          ))}
        </div>
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
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto 20px",
                }}
              />
            )}

            <ModalInput type="file" onChange={handleProfileFile} />

            <ModalButtons>
              <PrimaryButton onClick={handleUpload}>변경</PrimaryButton>
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
