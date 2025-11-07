import {
  Container,
  Banner,
  IndexWrap,
  IndexCard,
  Table,
} from './Overseas.style';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OverSeas = () => {
  const [overSeas, setOverSeas] = useState([]);
  const [kospi, setKospi] = useState([]);
  const [kosdaq, setKosdaq] = useState([]);
  const [nasdaq, setNasdaq] = useState(null);
  const [sp500, setSp500] = useState(null);
  const [dowjones, setDowjones] = useState(null);
  const navi = useNavigate();

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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/overseas`, {
        params: {
          symbol: [
            'AAPL',
            'MSFT',
            'TSLA',
            'AMZN',
            'NVDA',
            'GOOG',
            'META',
            'NFLX',
            'ORCL',
            'INTC',
            'ADBE',
            'PEP',
            'KO',
            'NKE',
            'DIS',
            'QQQ',
            'SPY',
            'DIA',
          ],
        },
      })
      .then((res) => {
        setOverSeas(res.data.items || []);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/nasdaq/month`)
      .then((res) => {
        setNasdaq(res.data.items);

        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/dowjones/month`)
      .then((res) => {
        setDowjones(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sp500/month`)
      .then((res) => {
        setSp500(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <Banner>
        <h1>해외 증시</h1>
        <p>주요 지수와 종목 시세를 확인하세요</p>
      </Banner>

      <IndexWrap>
        <IndexCard
          onClick={() => navi('/market/nasdaq')}
          style={{ cursor: 'pointer' }}
        >
          <h2>NASDAQ 100 </h2>
          <div className="value">
            {Number(
              Number(
                nasdaq?.chart?.result[0]?.meta?.regularMarketPrice
              ).toFixed(2)
            ).toLocaleString()}
          </div>
          <div
            className={`sub ${
              nasdaq?.chart?.result[0]?.meta?.regularMarketPrice -
                nasdaq?.chart?.result[0]?.meta?.chartPreviousClose >
              0
                ? 'positive'
                : 'negative'
            }`}
          >
            전일대비{' '}
            {Number(
              Number(
                nasdaq?.chart?.result[0]?.meta?.regularMarketPrice -
                  nasdaq?.chart?.result[0]?.meta?.chartPreviousClose
              ).toFixed(2)
            ).toLocaleString()}
          </div>
          <div
            className={`sub ${
              (nasdaq?.chart?.result[0]?.meta?.regularMarketPrice -
                nasdaq?.chart?.result[0]?.meta?.chartPreviousClose) /
                nasdaq?.chart?.result[0]?.meta?.chartPreviousClose >
              0
                ? 'positive'
                : 'negative'
            }`}
          >
            등락률{' '}
            {nasdaq?.chart?.result[0]?.meta
              ? (
                  ((nasdaq?.chart?.result[0]?.meta?.regularMarketPrice -
                    nasdaq?.chart?.result[0]?.meta?.chartPreviousClose) /
                    nasdaq?.chart?.result[0]?.meta?.chartPreviousClose) *
                  100
                ).toFixed(2)
              : '_'}
            %
          </div>
          <div className="sub">
            <span className="sub-value">
              {new Date(
                nasdaq?.chart.result[0]?.timestamp[22] * 1000
              ).toLocaleDateString('ko-KR', { timeZone: 'America/New_York' })}
            </span>
          </div>
        </IndexCard>

        {/* SPY */}
        <IndexCard
          onClick={() => navi('/market/sp500')}
          style={{ cursor: 'pointer' }}
        >
          <h2>S&P 500</h2>
          <div className="value">
            {Number(
              Number(sp500?.chart?.result[0]?.meta?.regularMarketPrice).toFixed(
                2
              )
            ).toLocaleString()}
          </div>
          <div
            className={`sub ${
              sp500?.chart?.result[0]?.meta?.regularMarketPrice -
                sp500?.chart?.result[0]?.meta?.chartPreviousClose >
              0
                ? 'positive'
                : 'negative'
            }`}
          >
            전일대비{' '}
            {Number(
              Number(
                sp500?.chart?.result[0]?.meta?.regularMarketPrice -
                  sp500?.chart?.result[0]?.meta?.chartPreviousClose
              ).toFixed(2)
            ).toLocaleString()}
          </div>
          <div
            className={`sub ${
              (sp500?.chart?.result[0]?.meta?.regularMarketPrice -
                sp500?.chart?.result[0]?.meta?.chartPreviousClose) /
                sp500?.chart?.result[0]?.meta?.chartPreviousClose >
              0
                ? 'positive'
                : 'negative'
            }`}
          >
            등락률{' '}
            {sp500?.chart?.result[0]?.meta
              ? (
                  ((sp500?.chart?.result[0]?.meta?.regularMarketPrice -
                    sp500?.chart?.result[0]?.meta?.chartPreviousClose) /
                    sp500?.chart?.result[0]?.meta?.chartPreviousClose) *
                  100
                ).toFixed(2)
              : '_'}
            %
          </div>
          <div className="sub">
            <span className="sub-value">
              {new Date(
                sp500?.chart.result[0]?.timestamp[22] * 1000
              ).toLocaleDateString('ko-KR', { timeZone: 'America/New_York' })}
            </span>
          </div>
        </IndexCard>
        {/* DIA */}
        <IndexCard
          onClick={() => navi('/market/dowjones')}
          style={{ cursor: 'pointer' }}
        >
          <h2>Dow Jones</h2>
          <div className="value">
            {Number(
              Number(
                dowjones?.chart?.result[0]?.meta?.regularMarketPrice
              ).toFixed(2)
            ).toLocaleString()}
          </div>
          <div
            className={`sub ${
              dowjones?.chart?.result[0]?.meta?.regularMarketPrice -
                dowjones?.chart?.result[0]?.meta?.chartPreviousClose >
              0
                ? 'positive'
                : 'negative'
            }`}
          >
            전일대비{' '}
            {Number(
              Number(
                dowjones?.chart?.result[0]?.meta?.regularMarketPrice -
                  dowjones?.chart?.result[0]?.meta?.chartPreviousClose
              ).toFixed(2)
            ).toLocaleString()}
          </div>
          <div
            className={`sub ${
              (dowjones?.chart?.result[0]?.meta?.regularMarketPrice -
                dowjones?.chart?.result[0]?.meta?.chartPreviousClose) /
                dowjones?.chart?.result[0]?.meta?.chartPreviousClose >
              0
                ? 'positive'
                : 'negetive'
            }`}
          >
            등락률{' '}
            {dowjones?.chart?.result[0]?.meta
              ? (
                  ((dowjones?.chart?.result[0]?.meta?.regularMarketPrice -
                    dowjones?.chart?.result[0]?.meta?.chartPreviousClose) /
                    dowjones?.chart?.result[0]?.meta?.chartPreviousClose) *
                  100
                ).toFixed(2)
              : '_'}
            %
          </div>
          <div className="sub">
            <span className="sub-value">
              {new Date(
                dowjones?.chart.result[0]?.timestamp[22] * 1000
              ).toLocaleDateString('ko-KR', { timeZone: 'America/New_York' })}
            </span>
          </div>
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
          {overSeas && overSeas.filter(Boolean).length > 0 ? (
            overSeas.filter(Boolean).map((o, idx) =>
              o ? (
                <tr key={idx}>
                  <td>{o['01. symbol']}</td>
                  <td>{o['05. price']}</td>
                  <td>{o['08. previous close']}</td>
                  <td>{o['10. change percent']}</td>
                  <td>{o['06. volume']}</td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', color: 'gray' }}>
                해외증시 API 호출 초과
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default OverSeas;
