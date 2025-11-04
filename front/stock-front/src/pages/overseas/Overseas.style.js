import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

/* 상단 배너 */
export const Banner = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 14px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    opacity: 0.9;
  }
`;

/* KOSPI / KOSDAQ 카드 */
export const IndexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
`;

export const IndexCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 14px;
  padding: 24px 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #1f2a44;
  }

  .value {
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 10px;
    color: #0d1117;
  }

  .sub {
    font-size: 15px;
    color: #444;
    margin: 6px 0;
    display: flex;
    justify-content: center;
    gap: 8px;
    align-items: center;
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  }

  .sub-label {
    font-weight: 600;
    color: #2a5298; /* 파란 강조 */
  }

  .sub-value {
    font-weight: 500;
    color: #222;
  }

  .positive {
    color: #d32f2f;
    font-weight: 600;
  }

  .negative {
    color: #1976d2;
    font-weight: 600;
  }
`;

/* 종목 테이블 */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);

  thead {
    background: #f5f6fa;
    th {
      padding: 15px;
      font-size: 15px;
      font-weight: 600;
      color: #444;
      text-align: center;
    }
  }

  tbody {
    td {
      padding: 13px;
      text-align: center;
      border-top: 1px solid #eee;
      font-size: 14px;
      color: #333;
    }

    tr:hover {
      background: #fafafa;
    }

    .positive {
      color: #d32f2f;
      font-weight: 600;
    }
    .negative {
      color: #1976d2;
      font-weight: 600;
    }
  }
`;
