import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  PageContainer,
  Section,
  SectionTitle,
  EmptyBox,
  CommentListContainer,
  CommentCard,
  CommentContent,
  CommentDate,
} from "./MyCommentList.style";
import axios from "axios";
import reisseToken from "../../api/reissueToken";

const MyCommentList = () => {
  const { auth } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) return;

    reisseToken
      .get(`/api/comment/select`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        setComments(res.data.items);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [auth.accessToken]);

  return (
    <PageContainer>
      <Section>
        <SectionTitle>내가 쓴 댓글</SectionTitle>

        {comments.length === 0 ? (
          <EmptyBox>작성한 댓글이 없습니다.</EmptyBox>
        ) : (
          <CommentListContainer>
            {comments.map((c) => (
              <CommentCard
                key={c.commentNo}
                onClick={() => navigate(`/board/${c.boardNo}`)}
              >
                <CommentContent>{c.content}</CommentContent>
                <CommentDate>
                  {new Date(c.createDate).toLocaleString()}
                </CommentDate>
              </CommentCard>
            ))}
          </CommentListContainer>
        )}
      </Section>
    </PageContainer>
  );
};

export default MyCommentList;
