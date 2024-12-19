import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8080/api/comments/my-comments", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("내가 쓴 댓글을 불러오지 못했습니다.");

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>댓글단 글</h2>

      {/* 댓글이 없을 때 */}
      {comments.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p style={{ color: "gray" }}>댓글단 글을 확인할 수 있어요.</p>
          <button
            onClick={() => navigate("/main")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#E0E0E0",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            실시간 감정 둘러보기
          </button>
        </div>
      ) : (
        // 댓글이 있을 때
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {comments.map((comment) => (
            <li key={comment.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
              <p>{comment.content}</p>
              <p style={{ color: "gray" }}>{comment.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyComments;
