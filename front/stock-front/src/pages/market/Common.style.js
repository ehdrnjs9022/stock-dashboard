import styled from 'styled-components';

/* 전체 컨테이너 */
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/* 페이지 제목 */
export const Title = styled.h1`
  font-size: 26px;
  font-weight: 800;
  color: #1e3c72;
  text-align: center;
  margin-bottom: 4px;
`;

export const SummaryBox = styled.div`
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: white;
  border-radius: 14px;
  padding: 28px 32px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .summary-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
    opacity: 0.9;
  }

  .label {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 13px;
    letter-spacing: 0.5px;
  }

  .price {
    font-size: 38px;
    font-weight: 800;
    margin: 8px 0;
  }

  .sub {
    font-size: 16px;
    font-weight: 500;
    opacity: 0.9;
  }

  .positive {
    color: #ff6b6b;
  }

  .negative {
    color: #76a9fa;
  }
`;

/* 메인 차트 박스 */
export const ChartWrap = styled.div`
  width: 100%;
  height: 420px; /* ✅ 높이 줄임 */
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* 하단 카드 영역 */
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

export const InfoCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  h4 {
    font-size: 13px;
    color: #555;
    margin-bottom: 6px;
  }

  .value {
    font-size: 17px;
    font-weight: 700;
    color: #111;
  }

  &.positive .value {
    color: #d32f2f;
  }

  &.negative .value {
    color: #1976d2;
  }
`;
/* 차트 상단 설명 영역 */
export const ChartInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-size: 17px;
    font-weight: 700;
    color: #333;
  }

  span {
    font-size: 13px;
    color: #777;
  }
`;
/* 세부 데이터 영역 */
export const DetailGrid = styled.div`
  margin-top: 28px;
  background: #fff;
  border-radius: 12px;
  padding: 22px 26px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1e3c72;
    margin-bottom: 14px;
  }

  .detail-body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px 20px;
  }
`;

/* 세부 데이터 아이템 */
export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f7f9fc;
  padding: 10px 14px;
  border-radius: 8px;

  .label {
    font-size: 14px;
    color: #555;
    font-weight: 500;
  }

  .value {
    font-size: 14px;
    font-weight: 700;
    color: #222;
  }
`;
