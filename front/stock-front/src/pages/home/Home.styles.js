import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
`;

/* 섹션 제목 */
export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin: 20px 0 30px;
  padding: 0 20px;
  border-radius: 8px;
  background-color: #f0f4ff;
  font-weight: 700;
  font-size: 18px;
  color: #1a237e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

export const ChartBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
`;

export const IndexCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 24px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .value {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 6px;
  }

  .sub {
    font-size: 14px;
    color: #555;
  }

  .positive {
    color: #e53935;
    font-weight: 600;
  }

  .negative {
    color: #1e88e5;
    font-weight: 600;
  }
`;

export const MainWrap = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 20px;
  width: 100%;
`;

export const Card = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.25s ease;
  max-height: 500px;
  overflow-y: auto;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 17px;
    font-weight: 700;
    color: #222;
    margin-bottom: 12px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 6px;
  }

  /* 스크롤바 통일 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }
`;

export const MainLeft = styled(Card)`
  .news-card {
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 8px;
    background: #fafafa;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: #f0f4ff;
      transform: translateY(-2px);
    }

    .title {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 6px;
      color: #333;
    }

    a {
      font-size: 13px;
      color: #5b77f2;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const MainCenter = styled(Card)`
  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      font-size: 14px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #fafafa;
      font-weight: 600;
      color: #333;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    td {
      color: #333;
    }

    .positive {
      color: #e53935;
      font-weight: 600;
    }
    .negative {
      color: #1e88e5;
      font-weight: 600;
    }
  }
`;

export const MainRight = styled(MainCenter)``;
