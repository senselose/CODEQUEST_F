import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Typography, Container, Paper, Box, Divider,
  Button, TextField
} from '@mui/material';

function BoardDetail() {
  const { id } = useParams(); // 게시글 ID
  const [post, setPost] = useState({ likes: [] }); // 게시글 데이터 초기화
  const [comments, setComments] = useState([]); // 댓글 데이터 초기화
  const [newComment, setNewComment] = useState(''); // 새 댓글 내용
  const [liked, setLiked] = useState(false); // 현재 사용자가 좋아요를 눌렀는지 여부
  const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수

  const state = useSelector((state) => state);
  console.log('Redux 전체 상태:', state);
  
  const userId = state.auth?.userId || null;
  console.log('Redux 상태에서 가져온 userId:', userId);
  

  useEffect(() => {
    fetchPost(); // 게시글 데이터 가져오기
    fetchComments(); // 댓글 데이터 가져오기
    incrementViews(); // 조회수 증가
    fetchLikeStatus(); // 좋아요 상태 가져오기
  }, [id]);

  // 게시글 데이터 가져오기
  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/boards/${id}`);
      const postData = response.data;

      setPost(postData);
      setLikeCount(postData.likes ? postData.likes.length : 0); // 좋아요 수 초기화
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  // 댓글 데이터 가져오기
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/comments/board/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // 조회수 증가
  const incrementViews = async () => {
    try {
      await axios.put(`http://localhost:8080/api/boards/${id}/views`);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  // 좋아요 상태 가져오기
  const fetchLikeStatus = async () => {
    if (!userId) {
      console.warn('userId가 null입니다. 좋아요 상태를 확인할 수 없습니다.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/boards/${id}/like-status`, {
        params: { userId },
      });
      setLiked(response.data);
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  };
  
  // 좋아요 토글
  const toggleLike = async () => {
    try {
        
      const response = await axios.post(
        `http://localhost:8080/api/boards/${id}/like`,
        { userId }, // JSON 객체로 사용자 ID 전달// 숫자 형식으로 변환
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data === '좋아요') {
        setLiked(true);
        setLikeCount((prev) => prev + 1); // 좋아요 수 증가
      } else if (response.data === '좋아요 취소') {
        setLiked(false);
        setLikeCount((prev) => prev - 1); // 좋아요 수 감소
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // 댓글 추가
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/comments/board/${id}`, {
        nickname: '익명', // 닉네임 (임시값)
        content: newComment,
      });
      setComments([...comments, response.data]); // 새 댓글 추가
      setNewComment(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  if (!post) return <Typography>게시글을 불러오는 중입니다...</Typography>;

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Paper elevation={4} style={{ padding: '30px', borderRadius: '8px' }}>
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {post.title}
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" color="textSecondary">
              작성자: {post.nickname}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              작성일: {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1" paragraph style={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        {/* 좋아요 버튼 */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color={liked ? 'secondary' : 'primary'}
            onClick={toggleLike}
          >
            {liked ? '좋아요 취소' : '좋아요'} ({likeCount || 0})
          </Button>
        </Box>

        {/* 댓글 목록 */}
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            댓글
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          {comments.map((comment) => (
            <Box key={comment.commentId} mb={2}>
              <Typography variant="body1">{comment.content}</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="textSecondary">
                  {comment.nickname} | {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </Box>
              <Divider style={{ margin: '10px 0' }} />
            </Box>
          ))}
        </Box>

        {/* 댓글 입력 */}
        <Box display="flex" mt={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            style={{ marginLeft: '10px' }}
          >
            등록
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default BoardDetail;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import {
//   Typography, Container, Paper, Box, Divider,
//   Button, TextField
// } from '@mui/material';

// function BoardDetail() {
//   const { id } = useParams(); // 게시글 ID
//   const [post, setPost] = useState({ likes: [] }); // 게시글 데이터 초기화
//   const [comments, setComments] = useState([]); // 댓글 데이터 초기화
//   const [newComment, setNewComment] = useState(''); // 새 댓글 내용
//   const [liked, setLiked] = useState(false); // 현재 사용자가 좋아요를 눌렀는지 여부
//   const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수
//   const userId = 1; // 현재 사용자 ID (실제 인증 기반으로 설정)

//   useEffect(() => {
//     fetchPost(); // 게시글 데이터 가져오기
//     fetchComments(); // 댓글 데이터 가져오기
//     incrementViews(); // 조회수 증가
//     fetchLikeStatus(); // 좋아요 상태 가져오기
//   }, [id]);

//   // 게시글 데이터 가져오기
//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/boards/${id}`);
//       const postData = response.data;

//       setPost(postData);
//       setLikeCount(postData.likes ? postData.likes.length : 0); // 좋아요 수 초기화
//     } catch (error) {
//       console.error('Error fetching post:', error);
//     }
//   };

//   // 좋아요 상태 가져오기
//   const fetchLikeStatus = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/boards/${id}/like-status`, {
//         params: { userId }, // 사용자 ID 전달
//       });
//       setLiked(response.data); // 서버에서 반환된 좋아요 상태 설정
//     } catch (error) {
//       console.error('Error fetching like status:', error);
//     }
//   };

//   // 좋아요 토글
//   const toggleLike = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/boards/${id}/like`,
//         { userId }, // JSON 객체로 사용자 ID 전달
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data === '좋아요') {
//         setLiked(true);
//         setLikeCount((prev) => prev + 1); // 좋아요 수 증가
//       } else if (response.data === '좋아요 취소') {
//         setLiked(false);
//         setLikeCount((prev) => prev - 1); // 좋아요 수 감소
//       }
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   // 댓글 추가
//   const handleAddComment = async () => {
//     if (!newComment.trim()) {
//       alert('댓글 내용을 입력해주세요.');
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:8080/api/comments/board/${id}`, {
//         nickname: '익명', // 닉네임 (임시값)
//         content: newComment,
//       });
//       setComments([...comments, response.data]); // 새 댓글 추가
//       setNewComment(''); // 입력 필드 초기화
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       alert('댓글 작성에 실패했습니다.');
//     }
//   };

//   if (!post) return <Typography>게시글을 불러오는 중입니다...</Typography>;

//   return (
//     <Container maxWidth="md" style={{ padding: '20px' }}>
//       <Paper elevation={4} style={{ padding: '30px', borderRadius: '8px' }}>
//         <Box mb={3}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             {post.title}
//           </Typography>
//           <Divider style={{ marginBottom: '20px' }} />
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Typography variant="subtitle1" color="textSecondary">
//               작성자: {post.nickname}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary">
//               작성일: {new Date(post.createdAt).toLocaleDateString()}
//             </Typography>
//           </Box>
//         </Box>
//         <Divider style={{ margin: '20px 0' }} />
//         <Typography variant="body1" paragraph style={{ whiteSpace: 'pre-line' }}>
//           {post.content}
//         </Typography>
//         <Divider style={{ margin: '20px 0' }} />

//         {/* 좋아요 버튼 */}
//         <Box display="flex" justifyContent="flex-end" mb={2}>
//           <Button
//             variant="contained"
//             color={liked ? 'secondary' : 'primary'}
//             onClick={toggleLike}
//           >
//             {liked ? '좋아요 취소' : '좋아요'} ({likeCount || 0})
//           </Button>
//         </Box>

//         {/* 댓글 목록 */}
//         <Box mt={3}>
//           <Typography variant="h6" gutterBottom>
//             댓글
//           </Typography>
//           <Divider style={{ marginBottom: '20px' }} />
//           {comments.map((comment) => (
//             <Box key={comment.commentId} mb={2}>
//               <Typography variant="body1">{comment.content}</Typography>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="subtitle2" color="textSecondary">
//                   {comment.nickname} | {new Date(comment.createdAt).toLocaleString()}
//                 </Typography>
//               </Box>
//               <Divider style={{ margin: '10px 0' }} />
//             </Box>
//           ))}
//         </Box>

//         {/* 댓글 입력 */}
//         <Box display="flex" mt={3}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="댓글을 입력하세요"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddComment}
//             style={{ marginLeft: '10px' }}
//           >
//             등록
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// export default BoardDetail;

