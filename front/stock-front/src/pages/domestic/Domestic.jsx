import {
  Container,
  Banner,
  IndexWrap,
  IndexCard,
  Table,
} from './Domestic.style';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Domestic = () => {
  const [stock, setStock] = useState([]);
  const [kospi, setKospi] = useState([]);
  const [kosdaq, setKosdaq] = useState([]);
  const navi = useNavigate();

  const codes = [
    { itemCode: '005930', stockName: '삼성전자' },
    { itemCode: '000660', stockName: 'SK하이닉스' },
    { itemCode: '035420', stockName: 'NAVER' },
    { itemCode: '035720', stockName: '카카오' },
    { itemCode: '373220', stockName: 'LG에너지솔루션' },
    { itemCode: '051910', stockName: 'LG화학' },
    { itemCode: '005380', stockName: '현대차' },
    { itemCode: '000270', stockName: '기아' },
    { itemCode: '207940', stockName: '삼성바이오로직스' },
    { itemCode: '105560', stockName: 'KB금융' },
    { itemCode: '055550', stockName: '신한지주' },
    { itemCode: '028260', stockName: '삼성물산' },
    { itemCode: '006400', stockName: '삼성SDI' },
    { itemCode: '034730', stockName: 'SK' },
    { itemCode: '003550', stockName: 'LG' },
  ];

  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/domesticDetails`, codes)
      .then((res) => {
        setStock(res.data.items.body || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/kospi`)
      .then((res) => {
        setKospi(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/kosdaq`)
      .then((res) => {
        setKosdaq(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {/* 배너 */}
      <Banner>
        <h1>국내 증시</h1>
        <p>주요 지수와 종목 시세를 확인하세요</p>
      </Banner>

      {/* KOSPI / KOSDAQ 카드 */}
      <IndexWrap>
        <IndexCard
          onClick={() => navi('/market/kospi')}
          style={{ cursor: 'pointer' }}
        >
          <h2>KOSPI {kospi?.[0]?.localTradedAt}</h2>
          <div className="value">{kospi?.[0]?.closePrice}</div>
          <div
            className={`sub ${
              kospi?.[0]?.compareToPreviousPrice?.code === '2'
                ? 'positive'
                : 'negative'
            }`}
          >
            전일대비 {kospi?.[0]?.compareToPreviousClosePrice} (
            {kospi?.[0]?.compareToPreviousPrice?.text})
          </div>
          <div className="sub">등락률 {kospi?.[0]?.fluctuationsRatio}%</div>
          <div className="sub">시가 {kospi?.[0]?.openPrice}</div>
          <div className="sub">고가 {kospi?.[0]?.highPrice}</div>
          <div className="sub">저가 {kospi?.[0]?.lowPrice}</div>
        </IndexCard>

        <IndexCard
          onClick={() => navi('/market/kosdaq')}
          style={{ cursor: 'pointer' }}
        >
          <h2>KOSDAQ {kosdaq?.[0]?.localTradedAt}</h2>
          <div className="value">{kosdaq?.[0]?.closePrice}</div>
          <div
            className={`sub ${
              kosdaq?.[0]?.compareToPreviousPrice?.code === '2'
                ? 'positive'
                : 'negative'
            }`}
          >
            전일대비 {kosdaq?.[0]?.compareToPreviousClosePrice} (
            {kosdaq?.[0]?.compareToPreviousPrice?.text})
          </div>
          <div className="sub">등락률 {kosdaq?.[0]?.fluctuationsRatio}%</div>
          <div className="sub">시가 {kosdaq?.[0]?.openPrice}</div>
          <div className="sub">고가 {kosdaq?.[0]?.highPrice}</div>
          <div className="sub">저가 {kosdaq?.[0]?.lowPrice}</div>
        </IndexCard>
      </IndexWrap>

      {/* 종목 테이블 */}
      <Table>
        <thead>
          <tr>
            <th>종목명</th>
            <th>현재가</th>
            <th>전일대비</th>
            <th>등락률</th>
            <th>거래량</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((s, idx) => (
            <tr key={idx}>
              <td>{s.stockName}</td>
              <td>{s.industryCompareInfo?.[0]?.closePrice}</td>
              <td
                className={
                  s.industryCompareInfo?.[0]?.compareToPreviousPrice?.code ===
                  '2'
                    ? 'positive'
                    : 'negative'
                }
              >
                {s.industryCompareInfo?.[0]?.compareToPreviousClosePrice}
              </td>
              <td
                className={
                  s.industryCompareInfo?.[0]?.fluctuationsRatio >= 0
                    ? 'positive'
                    : 'negative'
                }
              >
                {s.industryCompareInfo?.[0]?.fluctuationsRatio}
              </td>
              <td>
                {s.totalInfos.find(
                  (info) => info.code === 'accumulatedTradingVolume'
                )?.value || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Domestic;
