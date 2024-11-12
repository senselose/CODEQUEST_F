import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, Paper, Box, Divider, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function BoardDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(false); // 삭제 확인 Dialog 상태
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    incrementViews(); // 조회수 증가
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/boards/${id}`);
      setPost(response.data);
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

  const incrementLikes = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/boards/${id}/likes`);
      setPost((prevPost) => ({ ...prevPost, likes: response.data.likes }));
    } catch (error) {
      console.error('Error incrementing likes:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/boards/${id}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/BoardList');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="subtitle2" color="textSecondary">
            조회수: {post.views} | 좋아요: {post.likes}
          </Typography>
          <Box>
            <Button variant="outlined" color="error" onClick={handleOpen} style={{ marginRight: '10px' }}>
              삭제하기
            </Button>
            <Button variant="contained" color="primary" onClick={incrementLikes}>
              좋아요
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 삭제 확인 Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 게시글을 정말로 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default BoardDetail;
