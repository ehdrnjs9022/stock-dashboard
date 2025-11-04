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
  margin-bottom: 40px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    opacity: 0.9;
  }
`;

/* 마켓 탭 */
export const MarketTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 35px;

  button {
    padding: 10px 22px;
    border-radius: 25px;
    border: 1.5px solid #ccc;
    background: white;
    color: #333;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    transition: all 0.25s ease;

    &.active {
      border-color: #1e3c72;
      background: #1e3c72;
      color: white;
      box-shadow: 0 4px 12px rgba(30, 60, 114, 0.25);
      transform: translateY(-2px);
    }

    &:hover {
      background: #f6f8ff;
    }
  }
`;

/* 대표 코인 카드 */
export const IndexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 35px;
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
    color: #222;
  }

  .value {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 10px;
    color: #111;
  }

  .sub {
    font-size: 15px;
    color: #555;
    margin: 4px 0;
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

/* 테이블 */
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
