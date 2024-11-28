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
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
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
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          background: "linear-gradient(135deg, #1e1e2f, #151515)",
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Table>
          <TableBody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <TableRow
                  key={post.boardId}
                  hover
                  onClick={() => handleRowClick(post.boardId)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#2a2a3c",
                      transform: "scale(1.02)",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  

                  {/* 제목 셀 */}
                  <TableCell
                    sx={{
                      color: "#00DFEE",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      maxWidth: "200px",
                    }}
                  >
                    {post.title}
                  </TableCell>

                  {/* 좋아요 셀 */}
                  <TableCell
                    align="right"
                    sx={{
                      color: "#00DFEE", // 텍스트 색상 지정
                      textAlign: "right", // 오른쪽 정렬
                      verticalAlign: "bottom", // 아래쪽 정렬
                      fontSize: "12px", // 텍스트 크기 축소
                      paddingBottom: "4px", // 아래쪽 여백 조정
                    }}
                  >
                    <VisibilityIcon
                      sx={{
                        verticalAlign: "bottom",
                        marginRight: "4px",
                        fontSize: "16px", // 아이콘 크기 축소
                        color: "#83E3E9", // 아이콘 색상 유지
                      }}
                    />
                    <span style={{ marginLeft: "2px" }}>{post.views}</span>{" "}
                    {/* 간격 추가 */}
                    <FavoriteIcon
                      sx={{
                        verticalAlign: "bottom",
                        marginRight: "4px",
                        marginLeft: "3px", // 아이콘과 이전 텍스트 간 간격 추가
                        fontSize: "16px", // 아이콘 크기 축소
                        color: "#FF8C94", // 아이콘 색상 유지
                      }}
                    />
                    <span style={{ marginLeft: "2px" }}>
                      {post.likes?.length || 0}
                    </span>{" "}
                    {/* 간격 추가 */}
                    <CommentIcon
                      sx={{
                        verticalAlign: "bottom",
                        marginRight: "4px",
                        marginLeft: "3px", // 아이콘과 이전 텍스트 간 간격 추가
                        fontSize: "16px", // 아이콘 크기 축소
                        color: "#FFD700", // 아이콘 색상 유지
                      }}
                    />
                    <span style={{ marginLeft: "2px" }}>
                      {post.comments?.length || 0}
                    </span>{" "}
                    {/* 간격 추가 */}
                  </TableCell>
                  {/* 이미지 미리보기 셀 */}
                  <TableCell align="center" sx={{ width: "50px" }}>
                    {post.images && post.images.length > 0 ? (
                      <img
                        src={`http://localhost:8080/${post.images[0].filePath.replace(
                          /^\/+/,
                          ""
                        )}`}
                        alt="미리보기"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#2a2a3c",
                          borderRadius: "4px",
                        }}
                      />
                    )}
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   Typography,
//   TextField,
//   Pagination,
//   Box,
//   Container,
//   Button,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import CommentIcon from "@mui/icons-material/Comment";

// function BoardList({ showSearch = true, showWriteButton = true, sortCriteria}) {
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   const postsPerPage = 5;

//   useEffect(() => {
//     fetchPosts();
//   }, [currentPage, sortCriteria]); // sortCriteria 변경 시 다시 데이터 로드

//   const fetchPosts = async (isSearch = false) => {
//     try {
//       if (!sortCriteria || !sortCriteria.key) {
//         console.error("Invalid sortCriteria:", sortCriteria);
//         return;
//       }

//       const params = {
//         page: currentPage - 1,
//         size: postsPerPage,
//         sort: `${sortCriteria.key},${sortCriteria.order}`,
//       };

//       // 추가 필터링 조건
//       if (sortCriteria.filter === "last30Days") {
//         params["filterDate"] = 30; // 최근 30일 데이터 필터링
//       }

//       console.log("API 요청 파라미터:", params);

//       const response = await axios.get("http://localhost:8080/api/boards", {
//         params,
//       });
//       setPosts(response.data.content || []);
//       setTotalPages(response.data.totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   const handleRowClick = (id) => {
//     navigate(`/board/${id}`);
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     fetchPosts(true);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <Container maxWidth="md">
//       {/* 제목과 옵션 */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//         {showWriteButton && (
//           <Link to="/create" style={{ textDecoration: "none" }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#00dfee",
//                 "&:hover": { backgroundColor: "#00b2cc" },
//               }}
//             >
//               글쓰기
//             </Button>
//           </Link>
//         )}
//       </Box>

//       {/* 검색창 */}
//       {showSearch && (
//         <Box display="flex" justifyContent="space-between" mb={2}>
//           <TextField
//             label="제목 검색"
//             variant="outlined"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             fullWidth
//             style={{ marginRight: "10px" }}
//           />
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={handleSearch}
//             sx={{ backgroundColor: "#FF8C94" }}
//           >
//             검색
//           </Button>
//         </Box>
//       )}

//       {/* 게시글 테이블 */}
//       <TableContainer
//         component={Paper}
//         elevation={3}
//         sx={{
//           background: "linear-gradient(135deg, #1e1e2f, #151515)", // 다크모드 배경
//           borderRadius: 3,
//           padding: 0,
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
//         }}
//       >
//         <Table>
//           <TableBody>
//             {posts.map((post) => (
//               <TableRow
//                 key={post.boardId}
//                 hover
//                 onClick={() => handleRowClick(post.boardId)}
//                 sx={{
//                   cursor: "pointer",
//                   "&:hover": {
//                     backgroundColor: "#2a2a3c",
//                     transform: "scale(1.02)",
//                     boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
//                   },
//                   transition: "all 0.3s ease-in-out",
//                 }}
//               >
//                 <TableCell
//                   align="left"
//                   sx={{
//                     color: "#FFFFFF",
//                     borderBottom: "none",
//                     padding: "16px 24px",
//                     position: "relative",
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     component="div"
//                     sx={{
//                       color: "#00DFEE",
//                       fontWeight: "bold",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     {post.title}
//                   </Typography>

//                   {/* 하단 아이콘 표시 */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "flex-end",
//                       position: "absolute",
//                       bottom: 8,
//                       right: 16,
//                       gap: 2,
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <VisibilityIcon sx={{ color: "#83E3E9", fontSize: 18 }} />
//                       <Typography
//                         sx={{
//                           color: "#83E3E9",
//                           fontSize: "0.8rem",
//                           marginLeft: "4px",
//                         }}
//                       >
//                         {post.views}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <FavoriteIcon sx={{ color: "#FF8C94", fontSize: 18 }} />
//                       <Typography
//                         sx={{
//                           color: "#FF8C94",
//                           fontSize: "0.8rem",
//                           marginLeft: "4px",
//                         }}
//                       >
//                         {post.likes?.length || 0}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <CommentIcon sx={{ color: "#FFD700", fontSize: 18 }} />
//                       <Typography
//                         sx={{
//                           color: "#FFD700",
//                           fontSize: "0.8rem",
//                           marginLeft: "4px",
//                         }}
//                       >
//                         {post.comments?.length || 0}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* 페이지네이션 */}
//       <Box display="flex" justifyContent="center" mt={3}>
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Box>
//     </Container>
//   );
// }

// export default BoardList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   TextField,
//   Pagination,
//   Box,
//   Container,
//   Button,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import FavoriteIcon from "@mui/icons-material/Favorite"; // 좋아요 아이콘
// import VisibilityIcon from "@mui/icons-material/Visibility"; // 조회수 아이콘
// import CommentIcon from "@mui/icons-material/Comment"; // 댓글 아이콘

// function BoardList({ showSearch = true, showWriteButton = true }) {
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   const postsPerPage = 5;

//   useEffect(() => {
//     fetchPosts();
//   }, [currentPage]);

//   const fetchPosts = async (isSearch = false) => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/boards", {
//         params: {
//           page: currentPage - 1,
//           size: postsPerPage,
//           search: isSearch ? searchTerm : "",
//         },
//       });
//       setPosts(response.data.content);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   const handleRowClick = (id) => {
//     navigate(`/board/${id}`);
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     fetchPosts(true);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <Container maxWidth="md">
//       {/* 제목과 옵션 */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={1}
//       >
//         {/* <Typography variant="h4">게시판</Typography> */}
//         {showWriteButton && (
//           <Link to="/create" style={{ textDecoration: "none" }}>
//             <Button variant="contained" color="primary">
//               글쓰기
//             </Button>
//           </Link>
//         )}
//       </Box>

//       {showSearch && (
//         <Box display="flex" justifyContent="space-between" mb={2}>
//           <TextField
//             label="제목 검색"
//             variant="outlined"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             fullWidth
//             style={{ marginRight: "10px" }}
//           />
//           <Button variant="contained" color="secondary" onClick={handleSearch}>
//             검색
//           </Button>
//         </Box>
//       )}

// <TableContainer
//       component={Paper}
//       elevation={3}
//       sx={{
//         background: "linear-gradient(135deg, #1e1e2f, #151515)", // 다크모드 배경
//         borderRadius: 3,
//         padding: 0,
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
//       }}
//     >
//       <Table>
//         <TableBody>
//           {posts.map((post) => (
//             <TableRow
//               key={post.boardId}
//               hover
//               onClick={() => handleRowClick(post.boardId)}
//               sx={{
//                 cursor: "pointer",
//                 "&:hover": {
//                   backgroundColor: "#2a2a3c", // Hover 효과
//                   transform: "scale(1.02)",
//                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
//                 },
//                 transition: "all 0.3s ease-in-out",
//               }}
//             >
//               {/* 게시글 정보 */}
//               <TableCell
//                 align="left" // 제목 왼쪽 정렬
//                 sx={{
//                   color: "#FFFFFF", // 기본 텍스트 색상
//                   borderBottom: "none",
//                   padding: "16px 24px",
//                   position: "relative", // 아이콘 배치를 위한 설정
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   component="div"
//                   sx={{
//                     color: "#00DFEE", // 대표색상
//                     fontWeight: "bold",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   {post.title}
//                 </Typography>

//                 {/* 하단 아이콘 표시 */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "flex-end", // 우측 정렬
//                     position: "absolute",
//                     bottom: 8, // 하단에 배치
//                     right: 16, // 오른쪽에 배치
//                     gap: 2,
//                   }}
//                 >
//                   {/* 조회수 */}
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <VisibilityIcon sx={{ color: "#83E3E9", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#83E3E9",
//                         fontSize: "0.8rem",
//                         marginLeft: "4px",
//                       }}
//                     >
//                       {post.views}
//                     </Typography>
//                   </Box>
//                   {/* 좋아요 */}
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <FavoriteIcon sx={{ color: "#FF8C94", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#FF8C94",
//                         fontSize: "0.8rem",
//                         marginLeft: "4px",
//                       }}
//                     >
//                       {post.likes ? post.likes.length : 0}
//                     </Typography>
//                   </Box>
//                   {/* 댓글 수 */}
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <CommentIcon sx={{ color: "#FFD700", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#FFD700",
//                         fontSize: "0.8rem",
//                         marginLeft: "4px",
//                       }}
//                     >
//                       {post.comments ? post.comments.length : 0}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>

//       {/* 페이지네이션 */}
//       <Box display="flex" justifyContent="center" mt={3}>
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Box>
//     </Container>
//   );
// }

// export default BoardList;
