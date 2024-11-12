import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

function BoardForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBoard();
    }
  }, [id]);

  const fetchBoard = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/boards/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
      setNickname(response.data.nickname);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const boardData = { title, content, nickname };
      if (id) {
        await axios.put(`http://localhost:8080/api/boards/${id}`, boardData);
      } else {
        await axios.post('http://localhost:8080/api/boards', boardData);
      }
      navigate('/BoardList');
    } catch (error) {
      console.error('Error saving board:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h5" gutterBottom align="center">
          {id ? '게시글 수정' : '새 게시글 작성'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="닉네임"
              variant="outlined"
              fullWidth
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="제목"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="내용"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" type="submit">
              저장
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default BoardForm;
