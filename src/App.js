// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Login from './components/login/Login';
// import Board from './components/board/Board';
// import BoardForm from './components/board/BoardForm';
// import BoardList from './components/board/BoardList';
// import BoardDetail from './components/board/BoardDetail'; // BoardDetail import 추가
// import Register from './components/login/Register';
// import Main from './components/main/main';
// import SevenHell from './components/menu/SevenHell';
// // import HellPages from './components/main/pages/HellPages'; // 경로에 맞게 수정

// import { Provider } from "react-redux";
// import store from "./reducers/store"; // store.js 경로에 맞게 수정
// import FloatingButton from './components/floatingButton/FloatingButton';
// import Test from './components/board/Test';
// import Feed from './components/board/Feed';

// import YoutubeEmbed from './components/menu/YoutubeEmbed.js';
// import Header from "./components/header.js"; // 경로에 따라 수정
// import MyPage from './components/profile/MyPage.js';



// function App() {
//   return (

//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           {/* <Route path="/board" element={<Board />} /> */}
//           <Route path="/create" element={<BoardForm />} />
//           <Route path="/main" element={<Main />} />
//           <Route path="/YoutubeEmbed" element={<YoutubeEmbed />} />
//           <Route path="/MyPage" element={<MyPage />} />

//           {/* 기본 경로 */}
//             <Route path="/sevenHell" element={<SevenHell />} />


//           <Route path="/BoardList" element={<BoardList />} /> {/* 오타 수정 */}
//           <Route path="/board/:id" element={<BoardDetail />} /> {/* 게시글 상세 페이지 경로 추가 */}
//           <Route path="/register" element={<Register />} />    
//           {/* <Route path="/test" element={<Test/>} />     */}
//           <Route path="/feed" element={<Feed/>} />
//         </Routes>

//         {/* 전역 FloatingButton */}
//         <FloatingButton />
//       </Router>
//     </Provider>
    
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login/Login';
import Board from './components/board/Board';
import BoardForm from './components/board/BoardForm';
import BoardList from './components/board/BoardList';
import BoardDetail from './components/board/BoardDetail'; // BoardDetail import 추가
import Register from './components/login/Register';
import Main from './components/main/main';
import SevenHell from './components/menu/SevenHell';
// import HellPages from './components/main/pages/HellPages'; // 경로에 맞게 수정

import { Provider } from "react-redux"; // 지은 추가
import store, { persistor } from "./reducers/store"; // store.js 경로에 맞게 수정 지은 추가
import FloatingButton from './components/floatingButton/FloatingButton';
import Test from './components/board/Test';
import Feed from './components/board/Feed';

import YoutubeEmbed from './components/menu/YoutubeEmbed.js';
import Header from "./components/header.js"; // 경로에 따라 수정
import MyPage from './components/profile/MyPage.js';
import { PersistGate } from 'redux-persist/integration/react'; // 지은 추가
import AuthCheck from './components/auth/AuthCheck.js'; // 지은 추가
import MyPosts from './components/profile/MyPosts.js'; // 지은 추가
import MyComments from './components/profile/MyComments.js'; // 지은 추가


function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={<div>로딩 중...</div>} persistor={persistor}>
        <AuthCheck/>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/board" element={<Board />} /> */}
            <Route path="/create" element={<BoardForm />} />
            <Route path="/main" element={<Main />} />
            <Route path="/YoutubeEmbed" element={<YoutubeEmbed />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/my-posts" element={<MyPosts/>}/>
            <Route path="/my-comments" element={<MyComments/>}/>

            {/* 기본 경로 */}
              <Route path="/sevenHell" element={<SevenHell />} />


            <Route path="/BoardList" element={<BoardList />} /> {/* 오타 수정 */}
            <Route path="/board/:id" element={<BoardDetail />} /> {/* 게시글 상세 페이지 경로 추가 */}
            <Route path="/register" element={<Register />} />    
            {/* <Route path="/test" element={<Test/>} />     */}
            <Route path="/feed" element={<Feed/>} />
          </Routes>

          {/* 전역 FloatingButton */}
          <FloatingButton />
        </Router>
      </PersistGate>
    </Provider>
    
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Login from './components/login/Login';
// import BoardForm from './components/board/BoardForm';
// import BoardList from './components/board/BoardList';
// import BoardDetail from './components/board/BoardDetail';
// import Register from './components/login/Register';
// import Main from './components/main/main';
// import SevenHell from './components/main/SevenHell';
// import HellPages1 from './components/main/pages/HellPage1'; // HellPages import

// import { Provider } from "react-redux";
// import store from "./reducers/store";
// import FloatingButton from './components/floatingButton/FloatingButton';
// import Feed from './components/board/Feed';

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           {/* 기본 로그인 경로 */}
//           <Route path="/" element={<Login />} />

//           {/* 다른 페이지 경로 */}
//           <Route path="/create" element={<BoardForm />} />
//           <Route path="/main" element={<Main />} />
//           <Route path="/sevenHell" element={<SevenHell />} />

//           {/* 아이콘 페이지 경로 */}
//           <Route path="/HellPages1" element={<HellPages1 />} />


//           <Route path="/BoardList" element={<BoardList />} />
//           <Route path="/board/:id" element={<BoardDetail />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/feed" element={<Feed />} />
//         </Routes>
//         <FloatingButton />
//       </Router>
//     </Provider>
//   );
// }

// export default App;
