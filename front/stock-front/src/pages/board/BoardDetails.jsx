import {
  DetailWrap,
  DetailHeader,
  Title,
  Info,
  Content,
  ButtonWrap,
  BackBtn,
  EditBtn,
  DeleteBtn,
  CommentSection,
  CommentTitle,
  CommentInput,
  CommentBtn,
  CommentList,
  CommentItem,
  CommentAuthor,
  CommentText,
  ReplyButton,
  ReplyInput,
  ActionButtons,
  CategoryBadge,
  LikeButton,
  ModalOverlay,
  ModalCancel,
  ModalBox,
  ModalButtonWrap,
  ModalConfirm,
  ModalMessage,
  ModalTitle,
} from "./BoardDetails.style";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import reisseToken from "../../api/reissueToken";

const BoardDetails = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const { boardNo } = useParams();

  const [selectBoard, setSelectBoard] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [replyOpen, setReplyOpen] = useState("");
  const [replyText, setReplyText] = useState("");
  const [updateOpen, setUpdateOpen] = useState("");
  const [updateText, setUpdateText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board/details/${boardNo}`)
      .then((res) => {
        setSelectBoard(res.data.items);
      })
      .catch(() => {
        console.log("디테일조회오류");
      });
  }, [boardNo]);

  // 댓글 목록 새로고침 함수 (필요시 재사용 가능)
  const fetchComments = () => {
    axios
      .get(`http://localhost:8080/api/board/selectComment/${boardNo}`)
      .then((res) => {
        setCommentList(res.data.items);
        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err, "댓글조회실패");
      });
  };

  useEffect(() => {
    fetchComments();
  }, [boardNo]);

  const handleLike = (e) => {
    e.preventDefault();
    reisseToken
      .post(`http://localhost:8080/api/board/like/${boardNo}`, null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setSelectBoard((prev) => ({
          ...prev,
          likeCount: res.data.items.likeCount,
          liked: res.data.items.liked,
        }));
      })
      .catch(() => {
        console.log("좋아요 오류");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    reisseToken
      .delete(`http://localhost:8080/api/board/delete/${boardNo}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        setShowDeleteModal(false);
        navi("/board");
      })
      .catch(() => {
        console.log("게시글 삭제 실패");
      });
  };

  // 댓글 등록 요청 함수
  const handleInsertComment = (commentContent, parentCommentNo = null) => {
    if (!commentContent || !commentContent.trim()) return;

    reisseToken
      .post(
        `http://localhost:8080/api/board/insertComment/${boardNo}`,
        {
          content: commentContent,
          parentCommentNo: parentCommentNo,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      )
      .then((res) => {
        setComment("");
        setReplyText("");
        setReplyOpen(null);
        fetchComments(); // 댓글 목록 갱신
      })
      .catch((err) => {
        console.log(err, "댓글등록실패");
      });
  };

  // 댓글 등록 버튼 클릭 핸들러 (이벤트 객체 받음)
  const onClickInsertComment = (e) => {
    e.preventDefault(); // 혹은 없어도 무방(폼이 아니면)
    handleInsertComment(comment);
  };

  const handleUpdateComment = (commentNo) => {
    reisseToken
      .post(
        `http://localhost:8080/api/board/updateComment/${commentNo}`,
        {
          content: updateText,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      )
      .then((res) => {
        fetchComments(); // 업데이트 후 목록 다시 조회
        setUpdateText("");
        setUpdateOpen(null);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteComment = (commentNo) => {
    reisseToken
      .delete(`http://localhost:8080/api/board/deleteComment/${commentNo}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        fetchComments();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DetailWrap>
      <DetailHeader>
        <Title>{selectBoard.title}</Title>

        <Info>
          <div>
            <CategoryBadge>
              {selectBoard.category === "domestic" && "국내"}
              {selectBoard.category === "overseas" && "해외"}
              {selectBoard.category === "crypto" && "코인"}
              {selectBoard.category === "free" && "자유"}
            </CategoryBadge>
            {selectBoard.nickName} | 조회 {selectBoard.viewCount} | 추천{" "}
            {selectBoard.likeCount}
          </div>

          <LikeButton onClick={handleLike}>
            {selectBoard.likeCount ? "👍 추천취소" : "👍 추천하기"}
          </LikeButton>
        </Info>
      </DetailHeader>

      <Content>{selectBoard.content}</Content>

      <ButtonWrap>
        <BackBtn onClick={() => navi(`/board`)}>목록</BackBtn>
        <EditBtn onClick={() => navi(`/board/update/${boardNo}`)}>수정</EditBtn>
        <DeleteBtn onClick={() => setShowDeleteModal(true)}>삭제</DeleteBtn>
      </ButtonWrap>

      <CommentSection>
        <CommentTitle>댓글 </CommentTitle>

        <CommentInput
          placeholder="댓글을 입력하세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <CommentBtn onClick={onClickInsertComment}>등록</CommentBtn>

        <CommentList>
          {commentList
            .filter((c) => c.parentCommentNo === null)
            .map((c) => (
              <div key={c.commentNo}>
                <CommentItem>
                  <CommentAuthor>{c.nickName}</CommentAuthor>

                  {updateOpen === c.commentNo ? (
                    <>
                      <ReplyInput
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                      />
                      <button onClick={() => handleUpdateComment(c.commentNo)}>
                        수정완료
                      </button>
                      <button onClick={() => setUpdateOpen(null)}>취소</button>
                    </>
                  ) : (
                    <>
                      <CommentText>{c.content}</CommentText>
                      <CommentText>{c.createDate}</CommentText>
                    </>
                  )}

                  <ActionButtons>
                    <ReplyButton onClick={() => setReplyOpen(c.commentNo)}>
                      답글
                    </ReplyButton>

                    <ReplyButton
                      onClick={() => {
                        setUpdateOpen(c.commentNo);
                        setUpdateText(c.content);
                      }}
                    >
                      수정
                    </ReplyButton>
                    <ReplyButton
                      onClick={() => handleDeleteComment(c.commentNo)}
                    >
                      삭제
                    </ReplyButton>
                  </ActionButtons>

                  {replyOpen === c.commentNo && (
                    <>
                      <ReplyInput
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button
                        onClick={() =>
                          handleInsertComment(replyText, c.commentNo)
                        }
                      >
                        등록
                      </button>
                      <button onClick={() => setReplyOpen(null)}>취소</button>
                    </>
                  )}

                  {commentList
                    .filter((r) => r.parentCommentNo === c.commentNo)
                    .map((r) => (
                      <CommentItem
                        key={r.commentNo}
                        style={{ marginLeft: "20px" }}
                      >
                        <CommentAuthor>{r.nickName}</CommentAuthor>

                        {updateOpen === r.commentNo ? (
                          <>
                            <ReplyInput
                              value={updateText}
                              onChange={(e) => setUpdateText(e.target.value)}
                            />
                            <button
                              onClick={() => handleUpdateComment(r.commentNo)}
                            >
                              수정완료
                            </button>
                            <button onClick={() => setUpdateOpen(null)}>
                              취소
                            </button>
                          </>
                        ) : (
                          <CommentText>{r.content}</CommentText>
                        )}

                        <ActionButtons>
                          <ReplyButton
                            onClick={() => setUpdateOpen(r.commentNo)}
                          >
                            수정
                          </ReplyButton>
                          <ReplyButton
                            onClick={() => handleDeleteComment(r.commentNo)}
                          >
                            삭제
                          </ReplyButton>
                        </ActionButtons>
                      </CommentItem>
                    ))}
                </CommentItem>
              </div>
            ))}
        </CommentList>
      </CommentSection>

      {showDeleteModal && (
        <ModalOverlay onClick={() => setShowDeleteModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>게시글 삭제</ModalTitle>
            <ModalMessage>
              정말로 이 게시글을 삭제하시겠습니까?
              <br />
              삭제 후에는 복구할 수 없습니다.
            </ModalMessage>

            <ModalButtonWrap>
              <ModalConfirm onClick={handleDelete}>삭제</ModalConfirm>
              <ModalCancel onClick={() => setShowDeleteModal(false)}>
                취소
              </ModalCancel>
            </ModalButtonWrap>
          </ModalBox>
        </ModalOverlay>
      )}
    </DetailWrap>
  );
};

export default BoardDetails;
