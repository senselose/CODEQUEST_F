import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";

// CSS 파일 포함
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel= ({ images = [] }) => {
  // 캐러셀 설정
  const sliderSettings = {
    dots: false, // 캐러셀 하단 점 표시
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 속도
    slidesToShow: 3, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤될 슬라이드 수
    arrows: false, // 화살표 숨김
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 4000, // 3초 간격으로 이동
    responsive: [
      {
        breakpoint: 768, // 모바일 뷰포트
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // 태블릿 뷰포트
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
      <Box
        mt={1}
        sx={{
          display: "flex",
          justifyContent: "center", // 부모 컨테이너에서 중앙 정렬
        }}
      >
        <Slider
          {...sliderSettings}
          style={{
            width: "90%", // 슬라이더 너비를 조정하여 양쪽 여백 균형 맞추기
            margin: "0 auto", // 슬라이더를 부모 컨테이너 중앙으로 정렬
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                display: "flex", // 플렉스 박스 사용
                justifyContent: "center", // 수평 중앙 정렬
                alignItems: "center", // 수직 중앙 정렬
                height : "150px",
              }}
            >
              <img
                src={image}
                alt={`carousel-${index}`}
                style={{
                  width: "100%", // 이미지가 컨테이너에 맞게 조정
                  maxWidth: "350px", // 최대 너비 설정
                  height: "150px", // 고정 높이
                  objectFit: "cover", // 비율 유지하며 컨테이너 채우기
                  borderRadius: "20x", // 둥근 모서리
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    );
  };
  
  
  export default Carousel;

