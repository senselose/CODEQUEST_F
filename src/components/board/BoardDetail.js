import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./customStyles.css";
import {
  Typography,
  Container,
  Paper,
  Box,
  Divider,
  Button,
  TextField,
  Chip,
  IconButton,
  Avatar
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Slider from "react-slick";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BackButton from '../menu/BackButton';


function BoardDetail() {
  const { id } = useParams(); // 게시글 ID
  const [post, setPost] = useState({ likes: [], images: [] }); // 게시글 데이터 초기화
  const [comments, setComments] = useState([]); // 댓글 데이터 초기화
  const [newComment, setNewComment] = useState(""); // 새 댓글 내용
  const [liked, setLiked] = useState(null); // 현재 사용자가 좋아요를 눌렀는지 여부
  const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수
  // const [showComments, setShowComments] = useState(false); // 댓글 보기 토글 상태
  const [loadingCommentId, setLoadingCommentId] = useState(null); // 댓글 좋아요 로딩 상태
  const [newReply, setNewReply] = useState({}); // 대댓글 입력 상태
  const [showComments, setShowComments] = useState(false); // 댓글 초기 숨김 상태


  // const state = useSelector((state) => state);
  // const userId = state.auth?.userId || null; //수정전 userId

  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const navigate = useNavigate();
  // const userId = useSelector((state) => state.auth?.userId || null); // Redux에서 userId 가져오기
  const userId = useSelector((state) => state.auth?.userId); // 특정 상태만 선택
  const [showReplies, setShowReplies] = useState({}); // 각 댓글의 대댓글 상태


    const [userData, setUserData] = useState({
      nickName: "",
      email: "",
      bio: "안녕하세요! 사용자 정보를 불러오는 중입니다.",
      profilePicturePath: "https://via.placeholder.com/150",
    }); // 사용자 데이터 상태

  useEffect(() => {
    fetchPost(); // 게시글 데이터 가져오기
    fetchComments(); // 댓글 데이터 가져오기
    incrementViews(); // 조회수 증가
    fetchLikeStatus(); // 좋아요 상태 가져오기
    fetchCommentLikeStatus();

    // 백엔드에서 사용자 데이터 가져오기
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/${userId}`);
        if (!response.ok) {
          throw new Error("사용자 정보를 가져올 수 없습니다.");
        }
        const data = await response.json();
        setUserData({
          nickName: data.nickName || "닉네임 없음",
          email: data.mail || "이메일 없음",
          bio: data.bio || "자기소개가 없습니다.",
          profilePicturePath: data.profilePicturePath || "https://via.placeholder.com/150",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);
  // }, [id]);


  const darkTheme = createTheme({
    palette: {
      mode: "dark", // 다크모드 활성화
      primary: {
        main: "#90caf9", // 기본 색상
      },
      secondary: {
        main: "#f48fb1", // 보조 색상
      },
      background: {
        default: "#121212", // 배경색
        paper: "#1d1d1d", // 카드나 페이퍼 색상
      },
      text: {
        primary: "#ffffff", // 기본 텍스트 색상
        secondary: "#aaaaaa", // 보조 텍스트 색상
      },
    },
  });

  
  // Slider 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // 이전/다음 버튼 표시
    adaptiveHeight: true, // 이미지 높이에 맞게 슬라이더 높이 조정
    // dotsClass: "slick-dots",
  };

  const handleAddReply = async (commentId) => {
    if (!newReply[commentId]?.trim()) {
      alert("대댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/comments/${commentId}/reply`,
        {
          nickname: "익명",
          content: newReply[commentId],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 새로운 대댓글 데이터를 가져옴
      const newReplyData = response.data;

      // 댓글 상태 업데이트
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.commentId === commentId) {
            // 해당 댓글의 childComments에 새 대댓글을 추가
            return {
              ...comment,
              childComments: [...comment.childComments, newReplyData],
            };
          } else {
            // 다른 댓글은 그대로 유지
            return comment;
          }
        });
      });

      // 입력 필드 초기화
      setNewReply((prev) => ({ ...prev, [commentId]: "" }));
    } catch (error) {
      console.error("Error adding reply:", error);
      alert("대댓글 작성에 실패했습니다.");
    }
  };

  // 게시글 데이터 가져오기
  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/boards/${id}`
      );
      const postData = response.data;

      setPost(postData);
      setLikeCount(postData.likes ? postData.likes.length : 0); // 좋아요 수 초기화
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  
  // 프로필사진 가져오기
  const user = {
    name: "홍길동",
    email: "hong@example.com",
    avatar: "https://via.placeholder.com/150", // 프로필 이미지 URL
    bio: "안녕하세요! 저는 홍길동입니다.",
  };


  // 댓글 데이터 가져오기
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/comments/board/${id}`,
        { params: { userId } }
      );

      const rawComments = response.data;

      console.log("Raw comments:", JSON.stringify(rawComments, null, 2));

      // 중복 제거 및 부모-자식 관계 구성
      const structuredComments = rawComments.filter(
        (comment) =>
          !rawComments.some((parent) =>
            parent.childComments.some(
              (child) => child.commentId === comment.commentId
            )
          )
      );

      // 좋아요 상태 추가
      const commentsWithLikeStatus = await Promise.all(
        structuredComments.map(async (comment) => {
          const likeStatus = await fetchCommentLikeStatus(comment.commentId);
          return {
            ...comment,
            liked: likeStatus.liked,
            likeCount: likeStatus.likeCount,
          };
        })
      );

      setComments(commentsWithLikeStatus);

      console.log(
        "Structured comments with like status:",
        commentsWithLikeStatus
      );
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류:", error);
    }
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // 해당 댓글의 상태를 토글
    }));
  };
  
  // 조회수 증가
  const incrementViews = async () => {
    try {
      await axios.put(`http://localhost:8080/api/boards/${id}/views`);
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  // 좋아요 상태 가져오기
  const fetchLikeStatus = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/boards/${id}/like-status`,
        {
          params: { userId },
        }
      );
      setLiked(response.data);
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  // 좋아요 토글
  const toggleLike = async () => {
    if (!userId) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/boards/${id}/like`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data === "좋아요") {
        setLiked(true);
        setLikeCount((prev) => prev + 1); // 좋아요 수 증가
      } else if (response.data === "좋아요 취소") {
        setLiked(false);
        setLikeCount((prev) => prev - 1); // 좋아요 수 감소
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // 댓글 좋아요 토글
  const toggleCommentLike = async (commentId) => {
    console.log("댓글 좋아요 클릭:", commentId);

    if (!userId) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    try {
      setLoadingCommentId(commentId); // 로딩 시작

      // 좋아요 토글 API 요청 (수정된 부분)
      const response = await axios.post(
        `http://localhost:8080/api/comments/${commentId}/like`,
        {
          userId, // 이제 userId를 요청 바디로 전달합니다.
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );



      const { isLiked, likeCount } = response.data; // 서버 응답에서 상태를 가져옴
      console.log("토글된 좋아요 상태:", response.data);
      // UI 상태 업데이트
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, liked: isLiked, likeCount }
            : comment
        )
      );
    } catch (error) {
      console.error("댓글 좋아요 처리 중 오류:", error);
      if (error.response) {
        console.error("서버 응답 데이터:", error.response.data);
        console.error("서버 응답 상태 코드:", error.response.status);
      } else if (error.request) {
        console.error("서버 응답이 없습니다. 요청 데이터:", error.request);
      } else {
        console.error("요청 오류:", error.message);
      }
      alert("좋아요 처리 중 문제가 발생했습니다.");
    } finally {
      setLoadingCommentId(null); // 로딩 완료
    }
  };

  // 댓글 추가
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/comments/board/${id}`,
        {
          nickname: "익명", // 닉네임 (임시값)
          content: newComment,
        }
      );
      setComments([
        ...comments,
        { ...response.data, liked: false, likeCount: 0 },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };
  // 댓글 좋아요 상태 가져오기
  const fetchCommentLikeStatus = async (commentId) => {
    if (!commentId) {
      console.error("댓글 ID(commentId)가 누락되었습니다.");
      return { liked: false, likeCount: 0 };
    }

    if (!userId) {
      console.warn("사용자 ID(userId)가 누락되었습니다.");
      return { liked: false, likeCount: 0 };
    }

    try {
      console.log("Fetching like status for commentId:", commentId);
      console.log("With userId:", userId);

      const response = await axios.get(
        `http://localhost:8080/api/comments/${commentId}/like-status`,
        {
          params: { userId },
        }
      );
      const { isLiked, likeCount } = response.data;

      // 데이터를 로깅하여 응답 확인 (디버깅 목적)
      console.log("Received like status:", response.data);

      return {
        liked: typeof isLiked !== "undefined" ? isLiked : false,
        likeCount: typeof likeCount !== "undefined" ? likeCount : 0,
      };
    } catch (error) {
      console.error("댓글 좋아요 상태를 가져오는 중 오류:", error);
      return { liked: false, likeCount: 0 };
    }
  };

  if (!post) return <Typography>게시글을 불러오는 중입니다...</Typography>;

  // 태그를 배열로 변환
  const tags = post.hashtags ? post.hashtags.split(",") : [];

  // 댓글을 순차적으로 렌더링하기 위한 Helper 함수
  const renderComments = (comments) => {
    if (!comments || comments.length === 0) {
      return null;
    }

    return comments.map((comment) => (
        <Box key={comment.commentId} mb={2}>
          {/* 댓글 영역 */}
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{ gap: 1 }}
          >
            {/* 프로필 사진 */}
            <Avatar
              src={userData.profilePicturePath}
              alt={userData.nickName}
              sx={{
                width: 30, // 프로필 사진 크기
                height: 30,
                cursor: "pointer",
              }}
            />

            {/* 댓글 내용 */}
            <Box flex={1}>
              <Typography
                variant="body1"
                sx={{ display: "inline", fontWeight: "bold", marginRight: 1 }}
              >
                {comment.nickname}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline", color: "#ffffff" }}>
                {comment.content}
              </Typography>

              {/* 작성일 */}
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: "block", fontSize: "12px", marginTop: "4px" }}
              >
                {new Date(comment.createdAt).toLocaleString()}
              </Typography>
            </Box>

            {/* 좋아요 버튼 */}
            <Box display="flex" alignItems="center">
              <IconButton
                color={comment.liked ? "secondary" : "default"}
                onClick={() => toggleCommentLike(comment.commentId)}
                sx={{
                  padding: "4px", // 버튼 크기 줄이기
                }}
              >
                {comment.liked ? (
                  <ThumbUpAltIcon sx={{ fontSize: "16px" }} /> // 작은 크기 아이콘
                ) : (
                  <ThumbUpOffAltIcon sx={{ fontSize: "16px" }} />
                )}
              </IconButton>

              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {comment.likeCount || 0}
              </Typography>
            </Box>
          </Box>
        {/* 대댓글 토글 버튼 */}
        {comment.childComments && comment.childComments.length > 0 && (
          <Box
            sx={{
              marginTop: "10px",
              marginLeft: "30px",
              borderLeft: "2px solid #444",
              paddingLeft: "10px",
            }}
          >    



            {showReplies[comment.commentId] && comment.childComments.map((reply) => (              
              <Box
                key={reply.commentId}
                mb={2}
                sx={{
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#2a2a2a", // 대댓글 배경색
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                  marginBottom: "10px",
                  color: "#ffffff", // 텍스트 색상
                }}
              >

          <Box display="flex" alignItems="flex-start" sx={{ gap: 1 }}
          >         


            {/* 프로필 사진 */}
              <Avatar
                src={userData.profilePicturePath}
                alt={userData.nickName}
                sx={{
                  width: 30, // 프로필 사진 크기
                  height: 30,
                  cursor: "pointer",
                }}
              />
              <Box flex={1}>
                <Typography variant="body2" 
                  xs={{ display:"inline", fontWeight : "bold", marginRight : 1, }}
                  color="primary"
                >
                {reply.nickname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(reply.createdAt).toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  style={{display: "inline", marginTop: "5px", color: "#ffffff" }}
                >
                  {reply.content}
                </Typography>
              </Box>
            </Box>
            </Box>
            ))}
          </Box>
        )}

        {/* 대댓글 입력
        <Box mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="대댓글을 입력하세요"
            value={newReply[comment.commentId] || ""}
            onChange={(e) =>
              setNewReply((prev) => ({
                ...prev,
                [comment.commentId]: e.target.value,
              }))
            }
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddReply(comment.commentId)}
            >
            대댓글 등록
          </Button>
        </Box> */}
        <Box mt={1}>
        {/* 답글 토글 버튼 */}
        <Box mt={1}>

        <Button
          size="small"
          onClick={() => toggleReplies(comment.commentId)}
          sx={{ textTransform: "none", color: "primary.main", padding: 0 }}
        >
          {showReplies[comment.commentId] 
            ? `숨기기` 
            : `답글 ${comment.childComments.length}`}
        </Button>
        {/* 답글 토글 버튼 */}

        <Button
          variant="text"
          size="small"
          onClick={() =>
            setNewReply((prev) => ({
              ...prev,
              showInput: !prev.showInput,
            }))
          }
          sx={{ textTransform: "none", color: "primary.main", padding: 0 }}
        >
          {newReply.showInput ? "답글 취소" : "답글 달기"}
        </Button>


        {/* 대댓글 입력창과 버튼 (한 줄 배치) */}
        {newReply.showInput && (
          <Box
            mt={1}
            display="flex"
            // alignItems="center"
            gap={1} // 입력창과 버튼 사이 간격 추가
          >
                    {/* <Box display="flex" mt={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="댓글을 입력하세요"
              size="small"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              style={{ marginLeft: "10px" }}
            >
              등록
            </Button>
          </Box> */}
          <TextField
            fullWidth
            variant="outlined"
            size= "small"
            placeholder="대댓글을 입력하세요"
            value={newReply[comment.commentId] || ""}
            onChange={(e) =>
              setNewReply((prev) => ({
                ...prev,
                [comment.commentId]: e.target.value,
              }))
            }
          />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddReply(comment.commentId)}
                >
                등록
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  ));
};

  // JSX 렌더링 부분
  return (
    <ThemeProvider theme={darkTheme}>

        {/* 메뉴바 컴포넌트 */}
        {/* <Header backgroundSrc="/loading_background.gif" logoSrc="/logo.png" /> */}

      <CssBaseline />


      {/* 본문그리기 
      - 수정전
      제목
      작성자, 작성일
      태그
      이미지 슬라이드
      게시글 내용*/}
      {/* <Container maxWidth="md" style={{ padding: "20px"}}> */}
        <Paper elevation={4} style={{ padding : "10px 20px", borderRadius: "8px", minHeight: "100vh" }}>
        <BackButton
          variant="contained" // 버튼 스타일을 컨테인드로 설정
          sx={{
            minWidth: "0px", // 최소 너비를 없애서 정사각형으로
            width: "40px",
            height: "40px",
            margin: "5px",
            padding: "10px",
            backgroundColor: "black", // 배경색
            color: "white", // 아이콘 색상
            borderRadius: "50%", // 동그란 모양
        }}
      />


           {/* 이미지 슬라이드 */}
           {post.images.length > 0 && (
            <Slider
              {...sliderSettings}
              style={{
                width: "100%", // 슬라이더가 부모의 전체 폭을 차지하도록 설정
                maxWidth: "100vh", // 원하는 최대 너비 설정 (중앙에 위치)
                margin: "0 auto", // 슬라이더를 중앙에 배치
              }}
            >
              {post.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    height: "400px", // 원하는 높이 설정
                    display: "flex", // 플렉스 박스를 사용하여 중앙 정렬
                    justifyContent: "center", // 수평 중앙 정렬
                    alignItems: "center", // 수직 중앙 정렬
                    overflow: "hidden", // 이미지가 부모 박스를 넘지 않도록
                    position: "relative", // 중앙 정렬을 위한 상대 위치
                  }}
                >
                  <img
                    src={`http://localhost:8080/${image.filePath.replace(
                      /^\/+/,
                      ""
                    )}`}
                    alt={`image-${index}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain", // 이미지 비율 유지
                      display: "block", // 기본 `inline-block`으로 인해 생길 수 있는 문제 제거
                      borderRadius: "8px", // 이미지 둥근 모서리
                      margin: "0 auto", // 추가적으로 수평 정렬을 보장
                    }}
                  />
                </Box>
              ))}
            </Slider>
          )}
        <Divider style={{ margin: "30px 0" }} /> 
        <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              style={{
                wordWrap: "break-word", // 단어가 길 경우 줄바꿈
                whiteSpace: "pre-line", // 개행 문자 유지
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              paragraph
              style={{ whiteSpace: "pre-line" }}
            >
              {post.content}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
        <Box
          mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"

        >
          {/* 왼쪽: 프로필 사진 */}
          <Box display="flex" alignItems="center" width="10px">
            <Avatar
              src={userData.profilePicturePath}
              alt={userData.nickName}
              sx={{
                width: 50,
                height: 50,
                cursor: "pointer",
              }}
            />
          </Box>

          {/* 가운데: 닉네임과 작성일 */}
          <Box textAlign="left">
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#ffffff" }}
            >
              {post.nickname}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "#aaaaaa", fontSize: "12px"}}
            >
              작성일: {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          {/* 오른쪽: 좋아요 버튼 */}
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <IconButton
              onClick={toggleLike}
              sx={{
                color: liked ? "secondary.main" : "text.secondary",
                transition: "color 0.3s ease",
              }}
            >
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: 1,
                color: "#ffffff",
                fontSize: "14px"
              }}
            >
              {likeCount || 0}
            </Typography>
          </Box>
        </Box>

          {/* 태그 표시 */}
          <Box mb={3} display="flex" gap={1} flexWrap="wrap">
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={`#${tag}`}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
              {/* 본문!!! */}
            <Divider style={{ margin: "20px 0" }} />


          {/* 댓글 입력 */}
          <Box display="flex" mt={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="댓글을 입력하세요"
              size="small"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              style={{ marginLeft: "10px" }}
            >
              등록
            </Button>
          </Box>


          {/* 댓글 목록 */}
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              댓글
            </Typography>
            <Divider style={{ marginBottom: "20px" }} />
            {renderComments(comments)}
          </Box> 

          {/* <Box
          display="flex"
          alignItems="center"
          sx={{
            marginBottom: 2, // 제목 아래 간격
            padding: 1, // 안쪽 여백
            borderBottom: "2px solid #90caf9", // 구분선 추가
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold", // 강조된 텍스트
              color: "#ffffff", // 텍스트 색상
              marginRight: 1, // 아이콘과 간격
            }}
          >
            댓글
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#aaaaaa", // 서브 텍스트 색상
              fontSize: "14px", // 작은 폰트 크기
              marginLeft: "auto", // 오른쪽 정렬
              cursor: "pointer", // 클릭 가능하도록 커서 변경
              textDecoration: "underline", // 강조를 위해 밑줄 추가
            }}
            onClick={() => setShowComments((prev) => !prev)} // 댓글 토글
          >
            {comments.length}개의 댓글 보기
          </Typography>
        </Box>
        {renderComments(comments)}

        
        {/* 댓글 개수 및 보기/숨기기 토글 */}
          {/* <Box
            display="flex"
            alignItems="center"
            sx={{
              marginBottom: 2, // 제목 아래 간격
              padding: 1, // 안쪽 여백
              borderBottom: "2px solid #90caf9", // 구분선 추가
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold", // 강조된 텍스트
                color: "#ffffff", // 텍스트 색상
                marginRight: 1, // 아이콘과 간격
              }}
            >
              댓글
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#aaaaaa", // 서브 텍스트 색상
                fontSize: "14px", // 작은 폰트 크기
                marginLeft: "auto", // 오른쪽 정렬
                cursor: "pointer", // 클릭 가능하도록 커서 변경
                textDecoration: "underline", // 강조를 위해 밑줄 추가
              }}
              onClick={() => setShowComments((prev) => !prev)} // 댓글 토글
            >
              {comments.length}개의 댓글 {showComments ? "숨기기" : "보기"}
            </Typography>
          </Box> */}

          {/* 댓글 목록 */}
          {showComments && (
            <Box mt={3}>
              {renderComments(comments)} {/* 댓글 렌더링 */}
            </Box>
          )}

{/* --------------------------------------------------------------------- */}
    {/*이 위에까지 순서를 조금 변경  */}

        </Paper>
      {/* </Container> */}
    </ThemeProvider>
  );
}

export default BoardDetail;

//예전 코드
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import "./customStyles.css";
// import {
//   Typography,
//   Container,
//   Paper,
//   Box,
//   Divider,
//   Button,
//   TextField,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
// import Slider from "react-slick";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// function BoardDetail() {
//   const { id } = useParams(); // 게시글 ID
//   const [post, setPost] = useState({ likes: [], images: [] }); // 게시글 데이터 초기화
//   const [comments, setComments] = useState([]); // 댓글 데이터 초기화
//   const [newComment, setNewComment] = useState(""); // 새 댓글 내용
//   const [liked, setLiked] = useState(null); // 현재 사용자가 좋아요를 눌렀는지 여부
//   const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수
//   const [loadingCommentId, setLoadingCommentId] = useState(null); // 댓글 좋아요 로딩 상태
//   const [newReply, setNewReply] = useState({}); // 대댓글 입력 상태

//   const state = useSelector((state) => state);
//   const userId = state.auth?.userId || null;

//   useEffect(() => {
//     fetchPost(); // 게시글 데이터 가져오기
//     fetchComments(); // 댓글 데이터 가져오기
//     incrementViews(); // 조회수 증가
//     fetchLikeStatus(); // 좋아요 상태 가져오기
//     fetchCommentLikeStatus();
//   }, [id]);
//   const darkTheme = createTheme({
//     palette: {
//       mode: "dark", // 다크모드 활성화
//       primary: {
//         main: "#90caf9", // 기본 색상
//       },
//       secondary: {
//         main: "#f48fb1", // 보조 색상
//       },
//       background: {
//         default: "#121212", // 배경색
//         paper: "#1d1d1d", // 카드나 페이퍼 색상
//       },
//       text: {
//         primary: "#ffffff", // 기본 텍스트 색상
//         secondary: "#aaaaaa", // 보조 텍스트 색상
//       },
//     },
//   });

//   // Slider 설정
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false, // 이전/다음 버튼 표시
//     adaptiveHeight: true, // 이미지 높이에 맞게 슬라이더 높이 조정
//     // dotsClass: "slick-dots",
//   };

//   const handleAddReply = async (commentId) => {
//     if (!newReply[commentId]?.trim()) {
//       alert("대댓글 내용을 입력해주세요.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/comments/${commentId}/reply`,
//         {
//           nickname: "익명",
//           content: newReply[commentId],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // 새로운 대댓글 데이터를 가져옴
//       const newReplyData = response.data;

//       // 댓글 상태 업데이트
//       setComments((prevComments) => {
//         return prevComments.map((comment) => {
//           if (comment.commentId === commentId) {
//             // 해당 댓글의 childComments에 새 대댓글을 추가
//             return {
//               ...comment,
//               childComments: [...comment.childComments, newReplyData],
//             };
//           } else {
//             // 다른 댓글은 그대로 유지
//             return comment;
//           }
//         });
//       });

//       // 입력 필드 초기화
//       setNewReply((prev) => ({ ...prev, [commentId]: "" }));
//     } catch (error) {
//       console.error("Error adding reply:", error);
//       alert("대댓글 작성에 실패했습니다.");
//     }
//   };

//   // 게시글 데이터 가져오기
//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/boards/${id}`
//       );
//       const postData = response.data;

//       setPost(postData);
//       setLikeCount(postData.likes ? postData.likes.length : 0); // 좋아요 수 초기화
//     } catch (error) {
//       console.error("Error fetching post:", error);
//     }
//   };

//   // 댓글 데이터 가져오기
//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/comments/board/${id}`,
//         { params: { userId } }
//       );

//       const rawComments = response.data;

//       console.log("Raw comments:", JSON.stringify(rawComments, null, 2));

//       // 중복 제거 및 부모-자식 관계 구성
//       const structuredComments = rawComments.filter(
//         (comment) =>
//           !rawComments.some((parent) =>
//             parent.childComments.some(
//               (child) => child.commentId === comment.commentId
//             )
//           )
//       );

//       // 좋아요 상태 추가
//       const commentsWithLikeStatus = await Promise.all(
//         structuredComments.map(async (comment) => {
//           const likeStatus = await fetchCommentLikeStatus(comment.commentId);
//           return {
//             ...comment,
//             liked: likeStatus.liked,
//             likeCount: likeStatus.likeCount,
//           };
//         })
//       );

//       setComments(commentsWithLikeStatus);

//       console.log(
//         "Structured comments with like status:",
//         commentsWithLikeStatus
//       );
//     } catch (error) {
//       console.error("댓글 데이터를 가져오는 중 오류:", error);
//     }
//   };

//   // 조회수 증가
//   const incrementViews = async () => {
//     try {
//       await axios.put(`http://localhost:8080/api/boards/${id}/views`);
//     } catch (error) {
//       console.error("Error incrementing views:", error);
//     }
//   };

//   // 좋아요 상태 가져오기
//   const fetchLikeStatus = async () => {
//     if (!userId) return;
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/boards/${id}/like-status`,
//         {
//           params: { userId },
//         }
//       );
//       setLiked(response.data);
//     } catch (error) {
//       console.error("Error fetching like status:", error);
//     }
//   };

//   // 좋아요 토글
//   const toggleLike = async () => {
//     if (!userId) {
//       alert("로그인 후 이용 가능합니다.");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/boards/${id}/like`,
//         { userId },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data === "좋아요") {
//         setLiked(true);
//         setLikeCount((prev) => prev + 1); // 좋아요 수 증가
//       } else if (response.data === "좋아요 취소") {
//         setLiked(false);
//         setLikeCount((prev) => prev - 1); // 좋아요 수 감소
//       }
//     } catch (error) {
//       console.error("Error toggling like:", error);
//     }
//   };

//   // 댓글 좋아요 토글
//   const toggleCommentLike = async (commentId) => {
//     console.log("댓글 좋아요 클릭:", commentId);

//     if (!userId) {
//       alert("로그인 후 이용 가능합니다.");
//       return;
//     }

//     try {
//       setLoadingCommentId(commentId); // 로딩 시작

//       // 좋아요 토글 API 요청 (수정된 부분)
//       const response = await axios.post(
//         `http://localhost:8080/api/comments/${commentId}/like`,
//         {
//           userId, // 이제 userId를 요청 바디로 전달합니다.
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const { isLiked, likeCount } = response.data; // 서버 응답에서 상태를 가져옴
//       console.log("토글된 좋아요 상태:", response.data);
//       // UI 상태 업데이트
//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment.commentId === commentId
//             ? { ...comment, liked: isLiked, likeCount }
//             : comment
//         )
//       );
//     } catch (error) {
//       console.error("댓글 좋아요 처리 중 오류:", error);
//       if (error.response) {
//         console.error("서버 응답 데이터:", error.response.data);
//         console.error("서버 응답 상태 코드:", error.response.status);
//       } else if (error.request) {
//         console.error("서버 응답이 없습니다. 요청 데이터:", error.request);
//       } else {
//         console.error("요청 오류:", error.message);
//       }
//       alert("좋아요 처리 중 문제가 발생했습니다.");
//     } finally {
//       setLoadingCommentId(null); // 로딩 완료
//     }
//   };

//   // 댓글 추가
//   const handleAddComment = async () => {
//     if (!newComment.trim()) {
//       alert("댓글 내용을 입력해주세요.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/comments/board/${id}`,
//         {
//           nickname: "익명", // 닉네임 (임시값)
//           content: newComment,
//         }
//       );
//       setComments([
//         ...comments,
//         { ...response.data, liked: false, likeCount: 0 },
//       ]);
//       setNewComment("");
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       alert("댓글 작성에 실패했습니다.");
//     }
//   };
//   // 댓글 좋아요 상태 가져오기
//   const fetchCommentLikeStatus = async (commentId) => {
//     if (!commentId) {
//       console.error("댓글 ID(commentId)가 누락되었습니다.");
//       return { liked: false, likeCount: 0 };
//     }

//     if (!userId) {
//       console.warn("사용자 ID(userId)가 누락되었습니다.");
//       return { liked: false, likeCount: 0 };
//     }

//     try {
//       console.log("Fetching like status for commentId:", commentId);
//       console.log("With userId:", userId);

//       const response = await axios.get(
//         `http://localhost:8080/api/comments/${commentId}/like-status`,
//         {
//           params: { userId },
//         }
//       );
//       const { isLiked, likeCount } = response.data;

//       // 데이터를 로깅하여 응답 확인 (디버깅 목적)
//       console.log("Received like status:", response.data);

//       return {
//         liked: typeof isLiked !== "undefined" ? isLiked : false,
//         likeCount: typeof likeCount !== "undefined" ? likeCount : 0,
//       };
//     } catch (error) {
//       console.error("댓글 좋아요 상태를 가져오는 중 오류:", error);
//       return { liked: false, likeCount: 0 };
//     }
//   };

//   if (!post) return <Typography>게시글을 불러오는 중입니다...</Typography>;

//   // 태그를 배열로 변환
//   const tags = post.hashtags ? post.hashtags.split(",") : [];

//   // 댓글을 순차적으로 렌더링하기 위한 Helper 함수
//   const renderComments = (comments) => {
//     if (!comments || comments.length === 0) {
//       return null;
//     }

//     return comments.map((comment) => (
//       <Box key={comment.commentId} mb={2}>
//         {/* 부모 댓글 */}
//         <Box>
//           <Typography variant="body1" fontWeight="bold">
//             {comment.nickname}
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             {new Date(comment.createdAt).toLocaleString()}
//           </Typography>
//           <Typography variant="body1" style={{ marginTop: "5px" }}>
//             {comment.content}
//           </Typography>
//           <Box display="flex" alignItems="center" mt={1}>
//             <IconButton
//               color={comment.liked ? "secondary" : "default"}
//               onClick={() => toggleCommentLike(comment.commentId)}
//             >
//               {comment.liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
//             </IconButton>
//             <Typography variant="body2" style={{ marginLeft: "5px" }}>
//               {comment.likeCount || 0}
//             </Typography>
//           </Box>
//         </Box>

//         {/* 대댓글 렌더링 */}
//         {/* 대댓글 */}
//         {comment.childComments && comment.childComments.length > 0 && (
//           <Box
//             sx={{
//               marginTop: "10px",
//               marginLeft: "30px",
//               borderLeft: "2px solid #444",
//               paddingLeft: "10px",
//             }}
//           >
//             {comment.childComments.map((reply) => (
//               <Box
//                 key={reply.commentId}
//                 sx={{
//                   padding: "10px",
//                   borderRadius: "8px",
//                   backgroundColor: "#2a2a2a", // 대댓글 배경색
//                   boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
//                   marginBottom: "10px",
//                   color: "#ffffff", // 텍스트 색상
//                 }}
//               >
//                 <Typography variant="body2" fontWeight="bold" color="primary">
//                   {reply.nickname}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {new Date(reply.createdAt).toLocaleString()}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   style={{ marginTop: "5px", color: "#ffffff" }}
//                 >
//                   {reply.content}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         )}

//         {/* 대댓글 입력 */}
//         <Box mt={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="대댓글을 입력하세요"
//             value={newReply[comment.commentId] || ""}
//             onChange={(e) =>
//               setNewReply((prev) => ({
//                 ...prev,
//                 [comment.commentId]: e.target.value,
//               }))
//             }
//             style={{ marginBottom: "10px" }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleAddReply(comment.commentId)}
//           >
//             대댓글 등록
//           </Button>
//         </Box>
//       </Box>
//     ));
//   };

//   // JSX 렌더링 부분
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <Container maxWidth="md" style={{ padding: "20px" }}>
//         <Paper elevation={4} style={{ padding: "30px", borderRadius: "8px" }}>
//           <Box mb={3}>
//             <Typography variant="h4" fontWeight="bold" gutterBottom>
//               {post.title}
//             </Typography>
//             <Divider style={{ marginBottom: "20px" }} />
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <Typography variant="subtitle1" color="textSecondary">
//                 작성자: {post.nickname}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 작성일: {new Date(post.createdAt).toLocaleDateString()}
//               </Typography>
//             </Box>
//           </Box>

          // {/* 태그 표시 */}
          // <Box mb={3} display="flex" gap={1} flexWrap="wrap">
          //   {tags.map((tag, index) => (
          //     <Chip
          //       key={index}
          //       label={`#${tag}`}
          //       variant="outlined"
          //       color="primary"
          //     />
          //   ))}
          // </Box>

//           <Divider style={{ margin: "20px 0" }} />
//           {/* 이미지 슬라이드 */}
//           {post.images.length > 0 && (
//             <Slider
//               {...sliderSettings}
//               style={{
//                 width: "100%", // 슬라이더가 부모의 전체 폭을 차지하도록 설정
//                 maxWidth: "600px", // 원하는 최대 너비 설정 (중앙에 위치)
//                 margin: "0 auto", // 슬라이더를 중앙에 배치
//               }}
//             >
//               {post.images.map((image, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     width: "100%",
//                     height: "200px", // 원하는 높이 설정
//                     display: "flex", // 플렉스 박스를 사용하여 중앙 정렬
//                     justifyContent: "center", // 수평 중앙 정렬
//                     alignItems: "center", // 수직 중앙 정렬
//                     overflow: "hidden", // 이미지가 부모 박스를 넘지 않도록
//                     position: "relative", // 중앙 정렬을 위한 상대 위치
//                   }}
//                 >
//                   <img
//                     src={`http://localhost:8080/${image.filePath.replace(
//                       /^\/+/,
//                       ""
//                     )}`}
//                     alt={`image-${index}`}
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "100%",
//                       objectFit: "contain", // 이미지 비율 유지
//                       display: "block", // 기본 `inline-block`으로 인해 생길 수 있는 문제 제거
//                       borderRadius: "8px", // 이미지 둥근 모서리
//                       margin: "0 auto", // 추가적으로 수평 정렬을 보장
//                     }}
//                   />
//                 </Box>
//               ))}
//             </Slider>
//           )}
//           <Divider style={{ margin: "30px 0" }} />
//           <Typography
//             variant="body1"
//             paragraph
//             style={{ whiteSpace: "pre-line" }}
//           >
//             {post.content}
//           </Typography>
//           <Divider style={{ margin: "20px 0" }} />

//           {/* 좋아요 버튼 */}
//           <Box display="flex" justifyContent="flex-end" mb={2}>
//             <Button
//               variant="contained"
//               color={liked ? "secondary" : "primary"}
//               onClick={toggleLike}
//             >
//               {liked ? "좋아요 취소" : "좋아요"} ({likeCount || 0})
//             </Button>
//           </Box>

//           {/* 댓글 목록 */}
//           <Box mt={3}>
//             <Typography variant="h6" gutterBottom>
//               댓글
//             </Typography>
//             <Divider style={{ marginBottom: "20px" }} />
//             {renderComments(comments)}
//           </Box>

//           {/* 댓글 입력 */}
//           <Box display="flex" mt={3}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="댓글을 입력하세요"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleAddComment}
//               style={{ marginLeft: "10px" }}
//             >
//               등록
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default BoardDetail;
