import React from "react";

const YouTubeEmbed = () => {
  const videoId = "Jr19_NTy86g"; // 재생하려는 YouTube 동영상 ID
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default YouTubeEmbed;


// 사용 예시
// <YouTubeVideoEmbed videoId="Jr19_NTy86g" />






// 얘는 정책상 해결할 수가 없음
// import React from "react";

// const YouTubeEmbed = () => {
//   const youtubeUrl = "https://m.youtube.com/@sentihae"; // 유튜브 모바일 버전 URL

//   return (
//     <div
//       style={{
//         width: "100vw", // 전체 너비
//         height: "100vh", // 전체 높이
//         overflow: "hidden",
//       }}
//     >
//       <iframe
//         src={youtubeUrl}
//         title="YouTube Mobile"
//         style={{
//           width: "100vw", // iframe 너비
//           height: "100vh", // iframe 높이
//           border: "none", // 테두리 제거
//         }}
//       />
//     </div>
//   );
// };

// export default YouTubeEmbed;
