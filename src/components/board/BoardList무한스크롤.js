import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

function BoardList({ showSearch = true, showWriteButton = true, sortCriteria }) {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const navigate = useNavigate();
  const postsPerPage = 5;

  useEffect(() => {
    setPosts([]); // 검색어 또는 필터 변경 시 초기화
    setHasMore(true);
    fetchPosts();
  }, [searchTerm, sortCriteria]);


  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const params = {
        size: postsPerPage,
        sort: sortCriteria?.key || "createdAt",
        search: searchTerm || undefined,
        lastId: posts.length > 0 ? posts[posts.length - 1].boardId : undefined, // 마지막 게시글 ID 전달
      };

      const response = await axios.get("http://localhost:8080/api/boards", {
        params,
      });

      const newPosts = response.data.content || [];
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length === postsPerPage); // 데이터 개수가 batchSize보다 적으면 더 이상 없음
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/board/${id}`);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setPosts([]);
  //   setCurrentPage(0);
  //   setHasMore(true);
  // };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(0);
    setPosts([]);
  };

  const lastPostRef = useRef();
  useEffect(() => {
    if (loading) return;

    const callback = (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const observerInstance = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.1,
    });

    if (lastPostRef.current) observerInstance.observe(lastPostRef.current);

    return () => {
      if (lastPostRef.current) observerInstance.unobserve(lastPostRef.current);
    };
  }, [loading, hasMore]);

  return (
    <Container maxWidth="md" sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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

      <TableContainer>
        <Table>
          <TableBody>
            {posts.map((post, index) => (
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
                ref={index === posts.length - 1 ? lastPostRef : null}
              >
                <TableCell sx={{ width: "70%", verticalAlign: "top" }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#00b2cc", fontWeight: "bold", display: "block" }}
                  >
                    #{post.hashtags || "기본태그"}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    style={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "15px",
                      maxWidth:
                        post.images && post.images.length > 0
                          ? "200px"
                          : "100%", // 이미지가 있을 경우 제한된 너비, 없을 경우 전체 사용
                      whiteSpace:
                        post.images && post.images.length > 0
                          ? "nowrap"
                          : "normal", // 이미지가 있을 경우 한 줄 유지, 없을 경우 줄바꿈 허용
                      overflow:
                        post.images && post.images.length > 0
                          ? "hidden"
                          : "visible", // 넘침 처리
                      textOverflow:
                        post.images && post.images.length > 0
                          ? "ellipsis"
                          : "clip", // ... 표시
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "#777", display: "block", marginTop: 1 }}
                  >
                    {post.date || "1일 전"} • 조회 {post.views || 0}
                  </Typography>
                </TableCell>

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
                    />
                  ) : (
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#2a2a3c",
                        borderRadius: "4px",
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      marginTop: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <FavoriteIcon
                        sx={{
                          fontSize: "11px",
                          color: "#D8D8D8",
                        }}
                      />
                      <Typography style={{ fontSize: "11px" }}>
                        {post.likes?.length || 0}
                      </Typography>

                      <CommentIcon
                        sx={{
                          fontSize: "11px",
                          color: "#D8D8D8",
                          marginLeft: "8px",
                        }}
                      />
                      <Typography style={{ fontSize: "11px" }}>
                        {post.comments?.length || 0}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {loading && (
          <Box display="flex" justifyContent="center" sx={{ marginTop: "16px" }}>
            <Typography>로딩 중...</Typography>
          </Box>
        )}

        {!hasMore && (
          <Typography variant="body2" align="center" sx={{ marginTop: "16px", color: "#aaa" }}>
            더 이상 데이터가 없습니다.
          </Typography>
        )}
      </TableContainer>
    </Container>
  );
}

export default BoardList;
