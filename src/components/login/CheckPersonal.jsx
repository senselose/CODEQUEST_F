import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import termsData from './termsData.json';

const CheckPersonal = ({ open, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    agreeAll: false,
    agreeService: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const [detailsOpen, setDetailsOpen] = useState(null);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name === "agreeAll") {
      setSelectedOptions((prev) => {
        const updatedOptions = Object.fromEntries(
          Object.keys(prev).map((key) => [key, checked])
        );
        return updatedOptions;
      });
    } else {
      setSelectedOptions((prev) => {
        const updatedOptions = { ...prev, [name]: checked };

        const allChecked = Object.keys(updatedOptions)
          .filter((key) => key !== "agreeAll")
          .every((key) => updatedOptions[key]);

        return { ...updatedOptions, agreeAll: allChecked };
      });
    }
  };

  const openDetails = (key) => {
    setDetailsOpen(key);
  };

  const closeDetails = () => {
    if (detailsOpen) {
      // 약관 다이얼로그를 닫을 때 자동으로 체크박스를 체크
      setSelectedOptions((prev) => ({
        ...prev,
        [`agree${detailsOpen}`]: true,
      }));
    }
    setDetailsOpen(null);
  };


  const getDetailContent = (key) => {
    const term = termsData.terms.find((term) => term.id === key);
    return term ? term.content : "약관 내용을 찾을 수 없습니다.";
  };

  return (
    <>
      <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
        <DialogTitle>개인정보 수집 및 이용 동의</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                name="agreeAll"
                checked={selectedOptions.agreeAll}
                onChange={handleCheckboxChange}
              />
            }
            label="모두 동의"
          />
          <br />
          {termsData.terms.map((term) => (
            <FormControlLabel
              key={term.id}
              control={
                <Checkbox
                  name={`agree${term.id}`}
                  checked={selectedOptions[`agree${term.id}`]}
                  onChange={handleCheckboxChange}
                />
              }
              label={
                <Button onClick={() => openDetails(term.id)} variant="text" size="small">
                  {term.title}
                </Button>
              } 
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)} color="secondary">
            취소
          </Button>
          <Button
            onClick={() => {
              const allRequiredChecked = termsData.terms
                .filter((term) => term.required)
                .every((term) => selectedOptions[`agree${term.id}`]);

              if (!allRequiredChecked) {
                alert("필수 항목을 모두 선택해주세요.");
                return;
              }
              onClose(true);
            }}
            color="primary"
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!detailsOpen} onClose={closeDetails}>
        <DialogTitle>
          {detailsOpen && termsData.terms.find((term) => term.id === detailsOpen)?.title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">{getDetailContent(detailsOpen)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetails} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CheckPersonal;
