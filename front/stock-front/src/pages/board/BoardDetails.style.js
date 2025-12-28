import styled from 'styled-components';

export const DetailWrap = styled.div`
  max-width: 820px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const DetailHeader = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 28px;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 14px;
`;

export const Info = styled.div`
  color: #777;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.div`
  font-size: 17px;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 40px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
`;

export const BackBtn = styled.button`
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;

export const EditBtn = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #4f46e5;
  background: #eef2ff;
  color: #4f46e5;
  cursor: pointer;

  &:hover {
    background: #e0e7ff;
  }
`;

export const DeleteBtn = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ef4444;
  background: #fee2e2;
  color: #b91c1c;
  cursor: pointer;

  &:hover {
    background: #fca5a5;
  }
`;

/* ------------------------------ */
/* 댓글 영역 스타일 */
/* ------------------------------ */

export const CommentSection = styled.div`
  margin-top: 50px;
  border-top: 2px solid #eee;
  padding-top: 30px;
`;

export const CommentTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  height: 90px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
  margin-bottom: 10px;
  font-size: 15px;
`;

export const CommentBtn = styled.button`
  padding: 8px 16px;
  background: #5b77f2;
  color: #fff;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #3f5ae0;
  }
`;

export const CommentList = styled.div`
  margin-top: 25px;
`;

export const CommentItem = styled.div`
  padding: 14px 10px;
  border-bottom: 1px solid #eee;
`;

export const CommentAuthor = styled.div`
  font-weight: 700;
  margin-bottom: 4px;
  font-size: 15px;
`;

export const CommentText = styled.div`
  font-size: 15px;
  color: #444;
  line-height: 1.5;
`;
export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #5b77f2;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ReplyInput = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
  margin-top: 8px;
  margin-bottom: 10px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
`;
export const LikeButton = styled.button`
  padding: 3px 10px;
  background: #ffe5e5;
  border: 1px solid #ff7a7a;
  color: #d64545;
  font-size: 12px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 6px;

  &:hover {
    background: #ffcccc;
  }
`;

export const CategoryBadge = styled.span`
  background: #eef2ff;
  color: #4f46e5;
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  margin-right: 10px;
`;
/* ================= 모달 스타일 ================= */

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background: #ffffff;
  width: 380px;
  padding: 22px 24px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #222;
`;

export const ModalMessage = styled.p`
  margin: 14px 0 22px;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
`;

export const ModalButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const ModalCancel = styled.button`
  padding: 7px 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 13px;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ModalConfirm = styled.button`
  padding: 7px 14px;
  border-radius: 6px;
  border: none;
  background: #ff5a5a;
  font-size: 13px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #e14b4b;
  }
`;
