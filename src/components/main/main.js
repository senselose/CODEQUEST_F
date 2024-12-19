import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import BoardList from "../board/BoardList";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  ThemeProvider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  createTheme,
} from "@mui/material";
import { useCallback } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SidebarMenu from "../menu/SidebarMenu";
import Header from "../header";
import Carousel from "./Carousel";
import CssBaseline from "@mui/material/CssBaseline";
import CreateIcon from '@mui/icons-material/Create';
// import { dark } from "@mui/material/styles/createPalette";


  // 다크모드 테마 생성
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#00DFEE", // 브랜드 색상
      },
      background: {
        default: "#121212", // 배경 색상
        paper: "#1E1E1E", // Drawer 및 카드 배경 색상
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#AAAAAA",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ffffff",
      },
      background: {
        default: "#ffffff",
        paper: "#ffffff",
      },
      text: {
        primary: "#000000",
        secondary: "#000000",
      },
    },
  });
  
const Main = ({ posts = [] }) => {
  // posts의 기본값을 빈 배열로 설정
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]); // 초기값 빈 배열
  // const navigate = useNavigate();
  const images = [
    "/carousel1.png",
    "/carousel2.png",
    "/carousel4.png",

  ]; 
  // 캐러셀 이미지


  const sortCriteria = [
    { key: "createdAt", order: "desc" }, // 실시간 감정
    { key: "views", order: "desc", filter: "last7Days" }, // 이번주 베스트
    { key: "views", order: "desc", filter: "last30Days" }, // 월간 베스트
    {
      key: "views",
      order: "asc",
      secondaryKey: "likes",
      secondaryOrder: "asc",
    }, // 곧 소멸될 감정
  ];

  // //사이드바 토글
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  
  const handleTabChange = (event, newValue) => {
    console.log("Selected tab changed:", newValue);
    setSelectedTab(newValue);
  };
  const filterByDateRange = useCallback(
    (days) => {
      const now = new Date();
      return posts.filter((post) => {
        const postDate = new Date(post.createdAt);
        return (now - postDate) / (1000 * 60 * 60 * 24) <= days;
      });
    },
    [posts]
  );
  const getTopPostsByLikes = (data, limit) => {
    return [...data].sort((a, b) => b.likes - a.likes).slice(0, limit);
  };

    // const handleMenuClick = (path) => {
    //   if (path.startsWith("http")) {
    //     // 외부 URL로 이동
    //     window.location.href = path;
    //   } else {
    //     // 내부 경로로 이동
    //     navigate(path);
    //   }
    // };

  useEffect(() => {
    console.log("Current Tab:", selectedTab);
    console.log("Posts before filtering:", posts);
    if (!posts || posts.length === 0) {
      console.log("No posts available.");
      // setFilteredPosts([]);
      return;
    }
    if (selectedTab === 0) {
      const sortedByNewest = [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      console.log("Sorted by newest:", sortedByNewest);
      setFilteredPosts(sortedByNewest);
    } else if (selectedTab === 1) {
      const thisWeek = filterByDateRange(7);
      const topThisWeek = getTopPostsByLikes(thisWeek, 10);
      console.log("Top posts this week:", topThisWeek);
      setFilteredPosts(topThisWeek);
    } else if (selectedTab === 2) {
      const thisMonth = filterByDateRange(30);
      const topThisMonth = getTopPostsByLikes(thisMonth, 10);
      console.log("Top posts this month:", topThisMonth);
      setFilteredPosts(topThisMonth);
    } else if (selectedTab === 3) {
      const lowActivityPosts = posts
        .filter((post) => post.views < 10 && post.likes < 5)
        .sort((a, b) => a.views - b.views || a.likes - b.likes);
      console.log("Low activity posts:", lowActivityPosts);
      setFilteredPosts(lowActivityPosts);
    }
  }, [selectedTab, posts, filterByDateRange]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <div style={{ position: "relative" }}>
        {/* 메뉴바 컴포넌트 */}
        <Header backgroundSrc="loading_background.gif" logoSrc="logo.png" />

        {/* 상단 탭 3개 */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            // marginTop: "2px",
            marginBottom: "20px",
            height : "30px", 
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                color: "#FFFFFF",
              },
              "& .Mui-selected": {
                color: "#00DFEE",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#00DFEE",
              },
            }}
          >
            <Tab label="실시간 감정" />
            <Tab label="이번주 베스트" />
            <Tab label="월간 베스트" />
            {/* <Tab label="곧 소멸될 감정" /> */}
          </Tabs>
        </Box>
        {/* 탭 내용 */}
        <Box
          style={{ height: "566px" }} // 게시글 리스트 불러오는 box 직접 높이 지정
        >
          <BoardList
            posts={filteredPosts}
            showSearch={false}
            showWriteButton={false}
            sortCriteria={sortCriteria[selectedTab]}
          />
        </Box>
        {/* <div style={{ padding: "20px" }}>
        {filteredPosts.length > 0 ? (
          <BoardList posts={filteredPosts} showSearch={false} showWriteButton={false} />
        ) : (
          <Typography variant="h6" sx={{ color: "#aaa", textAlign: "center" }}>
            표시할 게시글이 없습니다.
          </Typography>
        )}
      </div> */}
      </div>
      
      {/* 캐러셀 */}
      {/* <Box
        sx={{
          width: "100%",
          // maxWidth: "1200px",
          // padding: "10px", // 내부 여백
          backgroundColor: "rgba(0, 0, 0, 0)", // 어두운 배경
          borderRadius: "20px", // 둥근 모서리
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)", // 그림자 효과
        }}
      >
        <Carousel images={images} width="100%" height="400px" />
      </Box> */}
    </ThemeProvider>

  );
};
export default Main;

