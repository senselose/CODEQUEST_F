import React, { useState } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

// 다크모드 테마 생성
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00DFEE",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
    },
  },
});


// http://localhost:3000/VillainUploader 이동후 업로드!

const VillainUploader = () => {
  const [villainName, setVillainName] = useState("");
  const [category, setCategory] = useState("");
  const [boardId, setBoardId] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({ villainName: "", category: "", boardId: "" });

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const checkBoardIdDuplicate = async () => {
    if (!boardId || isNaN(boardId)) {
      setError((prev) => ({ ...prev, boardId: "매핑할 보드 ID를 입력해주세요." }));
      return false;
    }
  
    try {
      const response = await axios.get("http://localhost:8080/api/villains/checkBoardId", {
        params: { boardId },
      });
  
      if (response.data.exists) {
        setError((prev) => ({ ...prev, boardId: "이미 중복된 보드 ID입니다." }));
        return false;
      } else {
        setError((prev) => ({ ...prev, boardId: "" })); // 오류 초기화
        return true;
      }
    } catch (error) {
      console.error("중복 확인 오류:", error);
      setError((prev) => ({
        ...prev,
        boardId: "보드 ID 중복 확인 중 오류가 발생했습니다.",
      }));
      return false;
    }
  };
  

  const validateForm = async () => {
    const newErrors = { villainName: "", category: "", boardId: "" };
    let isValid = true;

    if (!villainName.trim()) {
      newErrors.villainName = "빌런 이름을 입력해주세요.";
      isValid = false;
    }

    if (!category) {
      newErrors.category = "카테고리를 선택해주세요.";
      isValid = false;
    }

    const isBoardIdValid = await checkBoardIdDuplicate();
    if (!isBoardIdValid) {
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // 유효성 검사
    const isValid = await validateForm();
    if (!isValid) {
      return;
    }
  
    // FormData 생성
    const formData = new FormData();
    formData.append("villainName", villainName);
    formData.append("category", category);
    formData.append("boardId", boardId);
  
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/villains/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("업로드 성공: " + response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError((prev) => ({ ...prev, boardId: error.response.data }));
      } else {
        alert("업로드 실패: " + error.message);
      }
    }
  };
  

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          빌런 이미지 업로드
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="빌런 이름"
              variant="outlined"
              value={villainName}
              onChange={(e) => setVillainName(e.target.value)}
              error={!!error.villainName}
              helperText={error.villainName}
              fullWidth
            />

            <FormControl fullWidth error={!!error.category}>
              <InputLabel id="category-label">카테고리</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">카테고리를 선택하세요</MenuItem>
                <MenuItem value="betrayal">Betrayal</MenuItem>
                <MenuItem value="fam">Fam</MenuItem>
                <MenuItem value="fiery">Fiery</MenuItem>
                <MenuItem value="liar">Liar</MenuItem>
                <MenuItem value="love">Love</MenuItem>
                <MenuItem value="sloth">Sloth</MenuItem>
                <MenuItem value="violence">Violence</MenuItem>
              </Select>
              <Typography variant="caption" color="error">
                {error.category}
              </Typography>
            </FormControl>

            <TextField
              label="보드 ID"
              type="number"
              variant="outlined"
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              onBlur={checkBoardIdDuplicate} // 포커스를 잃을 때 중복 확인 실행
              error={!!error.boardId}
              helperText={error.boardId}
              fullWidth
            />

            <Button variant="outlined" component="label" fullWidth>
              파일 업로드
              <input type="file" multiple hidden onChange={handleFileChange} />
            </Button>

            {files.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                {Array.from(files).map((file) => file.name).join(", ")}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              업로드
            </Button>
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default VillainUploader;
