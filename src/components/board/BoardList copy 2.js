import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Pagination,
  Box,
  Container,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";

function BoardList({
  showSearch = true,
  showWriteButton = true,
  sortCriteria,
}) {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const postsPerPage = 5;

  useEffect(() => {
    console.log("Fetching posts with sortCriteria:", sortCriteria);
    fetchPosts();
  }, [currentPage, sortCriteria]); // sortCriteria 변경 시 다시 데이터 로드


  //게시글 가져오기!
  const fetchPosts = async (isSearch = false) => {
    try {
      if (!sortCriteria || !sortCriteria.key) {
        console.error("Invalid sortCriteria:", sortCriteria);
        return;
      }

      const params = {
        page: currentPage - 1,
        size: postsPerPage,
        sort: `${sortCriteria.key}`,
      };

      if (isSearch && searchTerm) {
        params["search"] = searchTerm; // 검색어 추가
      }

      if (sortCriteria.filter === "last30Days") {
        params["filterDate"] = 30; // 최근 30일 필터링
      }
      if (sortCriteria.filter === "last7Days") {
        params["filterDate"] = 7; // 최근 7일 필터링
      }
      console.log("Fetching posts with params:", params);
      const response = await axios.get("http://localhost:8080/api/boards", {
        params,
      });

      setPosts(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  //  // 태그를 배열로 변환
  //  const tags = post.hashtags ? post.hashtags.split(",") : [];




  

  const handleRowClick = (id) => {
    navigate(`/board/${id}`);
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
    <Container maxWidth="md" sx={{ padding: 2 }}>
      {/* 상단 검색 및 글쓰기 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {showSearch && (
          <TextField
            label="제목 검색"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{ marginRight: 2 }}
          />
        )}
        {showWriteButton && (
          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00dfee",
                "&:hover": { backgroundColor: "#00b2cc" },
              }}
            >
              글쓰기
            </Button>
          </Link>
        )}
        {showSearch && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF8C94",
              "&:hover": { backgroundColor: "#e57a82" },
            }}
            onClick={handleSearch}
          >
            검색
          </Button>
        )}
      </Box>

      {/* 게시글 테이블 */}
      {/* <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          // background: "linear-gradient(135deg, #1e1e2f, #151515)",
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
        }}
      > */}
      <TableContainer>
        <Table>
         <TableBody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <TableRow
              key={post.boardId}
              hover
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#2a2a3c",
                  transform: "scale(1.02)",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                },
                transition: "all 0.3s ease-in-out",
              }}
              onClick={() => handleRowClick(post.boardId)}
            >
            {/* 왼쪽 셀 */}
            <TableCell sx={{ width: "70%", verticalAlign: "top" }}>

              {/* Tag */}
            <Typography
              variant="caption"
              sx={{ color: "#00b2cc", fontWeight: "bold", display: "block"  }}
            >
              #{post.hashtags || "기본태그"}
            </Typography>

          {/* 제목 */}
            {/* <Typography
                variant="subtitle1"
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize : "15px",
                  maxWidth: "200px", // 고정된 너비 설정
                  whiteSpace: "nowrap", // 텍스트를 한 줄로 유지
                  overflow: "hidden", // 넘치는 텍스트 숨김
                  textOverflow: "ellipsis", // ...으로 표시
                }}
              >
              {post.title}
              </Typography> */}
                <Typography
                  variant="subtitle1"
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: "15px",
                    maxWidth: post.images && post.images.length > 0 ? "200px" : "100%", // 이미지가 있다면 제한된 너비, 없으면 100%
                    whiteSpace: post.images && post.images.length > 0 ? "nowrap" : "normal", // 이미지가 있으면 한 줄, 없으면 줄바꿈 허용
                    overflow: post.images && post.images.length > 0 ? "hidden" : "visible", // 넘치면 숨김, 없으면 보이기
                    textOverflow: post.images && post.images.length > 0 ? "ellipsis" : "clip", // 이미지가 있으면 ... 표시, 없으면 그대로
                  }}
                >
                  {post.title}
                </Typography>


                {/* Date and Views */}
                  <Typography
                  variant="caption"
                  sx={{ color: "#777", display: "block", marginTop: 1 }}
                >
                  {post.date || "1일 전"} • 조회 {post.views || 0}
              </Typography>
          </TableCell> 

          {/* (오른쪽 칸) 오른쪽 셀: 이미지 */}
          <TableCell align="center" sx={{ width: "100px", padding: "8px" }}>
            {post.images && post.images.length > 0 ? (
              <img
                src={`http://localhost:8080/${post.images[0].filePath.replace(
                  /^\/+/,
                  ""
                )}`}
                alt="미리보기"
                style={{
                  width: "75px",
                  height: "75px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              /> // 이미지가 았을 경우
            ) : (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  // backgroundColor: "#2a2a3c",
                  borderRadius: "4px",
                }}
              /> //이미지가 없을 경우
            )}
            <Box sx={{display : "flex", justifyContent:"center", gap: 2,}}>
              <Box sx={{display : "flex", alignItems: "center"}}>
                <FavoriteIcon
                  sx={{
                    marginLeft: "8px",
                    marginRight: "4px",
                    fontSize: "11px",
                    color: "#D8D8D8",
                  }}
                />
                <Typography
                  style={{
                    fontSize : "11px"
                  }}
                  >
                    {post.likes?.length || 0}
                </Typography>
                  <CommentIcon
                    sx={{
                      marginLeft: "8px",
                      fontSize: "11px",
                      color: "#D8D8D8",
                      marginRight: "4px",

                    }}
                  />
                <Typography
                  style={{
                    fontSize : "11px"
                  }}
                >
                  {post.comments?.length || 0}
                </Typography>
               </Box>
              </Box>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={5} align="center" sx={{ color: "#FFFFFF" }}>
          게시글이 없습니다.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>


      {/* </TableContainer> */}

      {/* 페이지네이션 */}
      {/* <Box display="flex" justifyContent="center" mt={1}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box> */}
      </TableContainer>
    </Container>
  );
}

export default BoardList;
