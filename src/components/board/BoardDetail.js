import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Container, Paper, Box, Divider,
  Button, TextField
} from '@mui/material';

function BoardDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 댓글 데이터
  const [newComment, setNewComment] = useState(''); // 새 댓글 내용
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    incrementViews(); // 조회수 증가
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/boards/${id}`);
      setPost(response.data);
      setComments(response.data.comments || []); // 댓글 데이터 초기화
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const incrementViews = async () => {
    try {
      await axios.put(`http://localhost:8080/api/boards/${id}/views`);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
  
    const newCommentData = {
      id: Date.now(), // 임시 ID
      nickname: '익명', // 닉네임은 사용자 인증에 따라 변경 가능
      content: newComment,
      createdAt: new Date().toISOString(),
    };
  
    const updatedComments = [...comments, newCommentData];
    const updatedPost = {
      ...post,
      comments: updatedComments,
    };
  
    console.log('보내는 데이터:', updatedPost);
  
    try {
        await axios.put(`http://localhost:8080/api/boards/${id}`, updatedPost, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      setComments(updatedComments);
      setNewComment(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };
  
  const handleDeleteComment = async (commentId) => {
    try {
      // 댓글 삭제
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      await axios.put(`http://localhost:8080/api/boards/${id}`, {
        ...post,
        comments: updatedComments,
      });
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글 삭제에 실패했습니다.');
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

        {/* 댓글 목록 */}
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            댓글
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          {comments.map((comment) => (
            <Box key={comment.id} mb={2}>
              <Typography variant="body1">{comment.content}</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="textSecondary">
                  {comment.nickname} | {new Date(comment.createdAt).toLocaleString()}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  삭제
                </Button>
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
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Typography, Container, Paper, Box, Divider,
//   Button, Dialog, DialogActions, DialogContent,
//   DialogContentText, DialogTitle, TextField
// } from '@mui/material';

// function BoardDetail() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]); // 댓글 데이터
//   const [newComment, setNewComment] = useState(''); // 새 댓글 내용
//   const [open, setOpen] = useState(false); // 삭제 확인 Dialog 상태
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPost();
//     fetchComments(); // 댓글 가져오기
//     incrementViews(); // 조회수 증가
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/boards/${id}`);
//       setPost(response.data);
//     } catch (error) {
//       console.error('Error fetching post:', error);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/boards/${id}/comments`);
//       setComments(response.data);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     }
//   };

//   const incrementViews = async () => {
//     try {
//       await axios.put(`http://localhost:8080/api/boards/${id}/views`);
//     } catch (error) {
//       console.error('Error incrementing views:', error);
//     }
//   };

//   const incrementLikes = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/api/boards/${id}/likes`);
//       setPost((prevPost) => ({ ...prevPost, likes: response.data.likes }));
//     } catch (error) {
//       console.error('Error incrementing likes:', error);
//     }
//   };

//   const handleAddComment = async () => {
//     try {
//       const response = await axios.post(`http://localhost:8080/api/boards/${id}/comments`, {
//         content: newComment,
//       });
//       setComments((prevComments) => [...prevComments, response.data]); // 새 댓글 추가
//       setNewComment(''); // 입력 필드 초기화
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       alert('댓글 작성에 실패했습니다.');
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
//       setComments((prevComments) => prevComments.filter((c) => c.id !== commentId));
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//       alert('댓글 삭제에 실패했습니다.');
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:8080/api/boards/${id}`);
//       alert('게시글이 삭제되었습니다.');
//       navigate('/BoardList');
//     } catch (error) {
//       console.error('Error deleting post:', error);
//       alert('게시글 삭제에 실패했습니다.');
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

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
//         <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//           <Typography variant="subtitle2" color="textSecondary">
//             조회수: {post.views} | 좋아요: {post.likes}
//           </Typography>
//           <Box>
//             <Button variant="outlined" color="error" onClick={handleOpen} style={{ marginRight: '10px' }}>
//               삭제하기
//             </Button>
//             <Button variant="contained" color="primary" onClick={incrementLikes}>
//               좋아요
//             </Button>
//           </Box>
//         </Box>
//       </Paper>

//       {/* 댓글 목록 */}
//       <Paper elevation={4} style={{ padding: '20px', marginTop: '30px', borderRadius: '8px' }}>
//         <Typography variant="h6" gutterBottom>
//           댓글
//         </Typography>
//         <Divider style={{ marginBottom: '20px' }} />
//         {comments.map((comment) => (
//           <Box key={comment.id} mb={2}>
//             <Typography variant="body1">{comment.content}</Typography>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="subtitle2" color="textSecondary">
//                 {comment.nickname} | {new Date(comment.createdAt).toLocaleString()}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 size="small"
//                 onClick={() => handleDeleteComment(comment.id)}
//               >
//                 삭제
//               </Button>
//             </Box>
//             <Divider style={{ margin: '10px 0' }} />
//           </Box>
//         ))}
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

//       {/* 삭제 확인 Dialog */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>삭제 확인</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             이 게시글을 정말로 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             취소
//           </Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             삭제
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default BoardDetail;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Typography, Container, Paper, Box, Divider, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// function BoardDetail() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [open, setOpen] = useState(false); // 삭제 확인 Dialog 상태
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPost();
//     incrementViews(); // 조회수 증가
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/boards/${id}`);
//       setPost(response.data);
//     } catch (error) {
//       console.error('Error fetching post:', error);
//     }
//   };

//   const incrementViews = async () => {
//     try {
//       await axios.put(`http://localhost:8080/api/boards/${id}/views`);
//     } catch (error) {
//       console.error('Error incrementing views:', error);
//     }
//   };

//   const incrementLikes = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/api/boards/${id}/likes`);
//       setPost((prevPost) => ({ ...prevPost, likes: response.data.likes }));
//     } catch (error) {
//       console.error('Error incrementing likes:', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:8080/api/boards/${id}`);
//       alert('게시글이 삭제되었습니다.');
//       navigate('/BoardList');
//     } catch (error) {
//       console.error('Error deleting post:', error);
//       alert('게시글 삭제에 실패했습니다.');
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

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
//         <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//           <Typography variant="subtitle2" color="textSecondary">
//             조회수: {post.views} | 좋아요: {post.likes}
//           </Typography>
//           <Box>
//             <Button variant="outlined" color="error" onClick={handleOpen} style={{ marginRight: '10px' }}>
//               삭제하기
//             </Button>
//             <Button variant="contained" color="primary" onClick={incrementLikes}>
//               좋아요
//             </Button>
//           </Box>
//         </Box>
//       </Paper>

//       {/* 삭제 확인 Dialog */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>삭제 확인</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             이 게시글을 정말로 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             취소
//           </Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             삭제
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default BoardDetail;
