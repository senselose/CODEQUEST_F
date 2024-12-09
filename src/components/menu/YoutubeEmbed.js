import React from "react";
import Header from "../header";

const YouTubeEmbed = () => {
  const channelUrl = "https://www.youtube.com/@sentihae"; // 유튜브 채널 URL

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Header 컴포넌트 */}
      <Header backgroundSrc="loading_background.gif" logoSrc="logo.png" />
      
      {/* 버튼 클릭 시 YouTube 채널로 이동 */}
      <div
        style={{
          position: "absolute",
          top: "8vh",
          width: "100%",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "blue",
            fontSize: "20px",
          }}
        >
          Visit YouTube Channel
        </a>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
