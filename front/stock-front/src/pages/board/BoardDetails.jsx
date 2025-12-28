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
} from './BoardDetails.style';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const BoardDetails = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const { boardNo } = useParams();

  const [selectBoard, setSelectBoard] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [comment, setComment] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [replyOpen, setReplyOpen] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board/details/${boardNo}`)
      .then((res) => {
        setSelectBoard(res.data.items);
      })
      .catch(() => {
        console.log('디테일조회오류');
      });
  }, [boardNo]);

  const handleLike = (e) => {
    e.preventDefault();
    axios
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
        console.log('좋아요 오류');
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/api/board/delete/${boardNo}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        setShowDeleteModal(false);
        navi('/board');
      })
      .catch(() => {
        console.log('게시글 삭제 실패');
      });
  };

  const handleInsertComment = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/board/insertcomment/${boardNo}`,
        {
          content: comment,
          parentCommentNo: null,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        setComment(res.data.items);
        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err, '댓글등록실패');
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board/selectcomment/${boardNo}`)
      .then((res) => {
        console.log(res.data.items);
      })

      .catch((err) => {
        console.log(err, '댓글조회');
      });
  }, [boardNo]);

  return (
    <DetailWrap>
      <DetailHeader>
        <Title>{selectBoard.title}</Title>

        <Info>
          <div>
            <CategoryBadge>
              {selectBoard.category === 'domestic' && '국내'}
              {selectBoard.category === 'overseas' && '해외'}
              {selectBoard.category === 'crypto' && '코인'}
              {selectBoard.category === 'free' && '자유'}
            </CategoryBadge>
            {selectBoard.nickName} | 조회 {selectBoard.viewCount} | 추천{' '}
            {selectBoard.likeCount}
          </div>

          <LikeButton onClick={handleLike}>
            {selectBoard.likeCount ? '👍 추천취소' : '👍 추천하기'}
          </LikeButton>
        </Info>
      </DetailHeader>

      <Content>{selectBoard.content}</Content>

      <ButtonWrap>
        <BackBtn>목록</BackBtn>
        <EditBtn onClick={() => navi(`/board/update/${boardNo}`)}>수정</EditBtn>
        <DeleteBtn onClick={() => setShowDeleteModal(true)}>삭제</DeleteBtn>
      </ButtonWrap>

      <CommentSection>
        <CommentTitle>댓글 0</CommentTitle>

        <CommentInput
          placeholder="댓글을 입력하세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <CommentBtn onClick={handleInsertComment}>등록</CommentBtn>

        <CommentList>
          {commentList.map((c) => (
            <div key={c.commentNo}>
              <CommentItem>
                <CommentAuthor>{c.nickName}</CommentAuthor>

                {editMode === c.commentNo ? (
                  <>
                    <ReplyInput
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <ActionButtons>
                      <CommentBtn>수정완료</CommentBtn>
                      <DeleteBtn onClick={() => setEditMode(null)}>
                        취소
                      </DeleteBtn>
                    </ActionButtons>
                  </>
                ) : (
                  <CommentText>{c.content}</CommentText>
                )}

                <ActionButtons>
                  <ReplyButton onClick={() => setReplyOpen(c.commentNo)}>
                    답글
                  </ReplyButton>
                  <ReplyButton
                    onClick={() => {
                      setEditMode(c.commentNo);
                      setEditText(c.content);
                    }}
                  >
                    수정
                  </ReplyButton>
                  <ReplyButton>삭제</ReplyButton>
                </ActionButtons>
              </CommentItem>

              {replyOpen === c.commentNo && (
                <ReplyInput placeholder="대댓글 입력..." />
              )}

              {c.children.map((r) => (
                <CommentItem key={r.commentNo} style={{ marginLeft: '20px' }}>
                  <CommentAuthor>{r.author}</CommentAuthor>
                  <CommentText>{r.content}</CommentText>
                </CommentItem>
              ))}
            </div>
          ))}
        </CommentList>
      </CommentSection>

      {/* ===== 삭제 확인 모달 ===== */}
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
