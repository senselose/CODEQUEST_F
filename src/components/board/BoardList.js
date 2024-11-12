import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  TextField, Pagination, Box, Container, Button
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function BoardList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const postsPerPage = 5;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async (isSearch = false) => {
    try {
      const response = await axios.get('http://localhost:8080/api/boards', {
        params: { 
          page: currentPage - 1,
          size: postsPerPage,
          search: isSearch ? searchTerm : ''
        },
      });
      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/board/${id}`); // 게시글 ID를 포함하여 BoardDetail로 이동
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPosts(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      {/* 제목과 검색 필드 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">게시판</Typography>
        <Link to="/create" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">글쓰기</Button>
        </Link>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="제목 검색"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          검색
        </Button>
      </Box>

      {/* 게시글 목록 테이블 */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center">조회수</TableCell>
              <TableCell align="center">좋아요</TableCell>
              <TableCell align="center">날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow 
                key={post.boardId}
                hover
                onClick={() => handleRowClick(post.boardId)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell align="center">{index + 1 + (currentPage - 1) * postsPerPage}</TableCell>
                <TableCell align="center">{post.title}</TableCell>
                <TableCell align="center">{post.nickname}</TableCell>
                <TableCell align="center">{post.views}</TableCell> {/* 조회수 */}
                <TableCell align="center">{post.likes}</TableCell> {/* 좋아요 수 */}
                <TableCell align="center">{new Date(post.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default BoardList;
