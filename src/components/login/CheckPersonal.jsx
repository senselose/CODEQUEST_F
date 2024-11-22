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

const CheckPersonal = ({ open, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    agreeAge: false,
    agreeTerms: false,
    agreeFinance: false,
    agreePrivacy: false,
    agreeThirdParty: false,
    agreeMarketing: false,
    agreeAd: false,
    agreeEmail: false,
    agreeSms: false,
    agreePush: false,
  });

  const [detailsOpen, setDetailsOpen] = useState(null);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const openDetails = (key) => {
    setDetailsOpen(key);
  };

  const closeDetails = () => {
    setDetailsOpen(null);
  };

  return (
    <>
      <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
        <DialogTitle>개인정보 수집 및 이용 동의</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                name="agreeAge"
                checked={selectedOptions.agreeAge}
                onChange={handleCheckboxChange}
              />
            }
            label={
              <Button onClick={() => openDetails("age")} variant="text" size="small">
                [필수] 만 14세 이상입니다
              </Button>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                name="agreeTerms"
                checked={selectedOptions.agreeTerms}
                onChange={handleCheckboxChange}
              />
            }
            label={
              <Button onClick={() => openDetails("terms")} variant="text" size="small">
                [필수] 쿠팡 이용약관 동의
              </Button>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                name="agreeFinance"
                checked={selectedOptions.agreeFinance}
                onChange={handleCheckboxChange}
              />
            }
            label={
              <Button onClick={() => openDetails("finance")} variant="text" size="small">
                [필수] 전자금융거래 이용약관 동의
              </Button>
            }
          />
          {/* 추가 항목들 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)} color="secondary">
            취소
          </Button>
          <Button
            onClick={() => {
              const allRequiredChecked =
                selectedOptions.agreeAge &&
                selectedOptions.agreeTerms &&
                selectedOptions.agreeFinance;
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
          {detailsOpen === "age" && "만 14세 이상입니다"}
          {detailsOpen === "terms" && "쿠팡 이용약관"}
          {detailsOpen === "finance" && "전자금융거래 이용약관"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {detailsOpen === "age" && "서비스를 이용하기 위해 만 14세 이상임을 확인합니다."}
            {detailsOpen === "terms" && "쿠팡 이용약관 내용..."}
            {detailsOpen === "finance" && "전자금융거래 이용약관 내용..."}
          </Typography>
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
