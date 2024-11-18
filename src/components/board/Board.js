import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Button
} from '@mui/material';

function Board() {
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 글', author: '홍길동', date: '2024-11-07' },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2024-11-07' },
    { id: 3, title: '세 번째 글', author: '이영희', date: '2024-11-07' },
  ]);

  return (
    
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        게시판
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center">날짜</TableCell>
              <TableCell align="center">액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell align="center">{post.id}</TableCell>
                <TableCell align="center">{post.title}</TableCell>
                <TableCell align="center">{post.author}</TableCell>
                <TableCell align="center">{post.date}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" size="small">
                    보기
                  </Button>
                  <Button variant="outlined" color="secondary" size="small" style={{ marginLeft: '10px' }}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

export default Board;
