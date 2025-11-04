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
  const navi = useNavigate();

  const qqq = overSeas.find((o) => o?.['01. symbol'] === 'QQQ') || null;
  const spy = overSeas.find((o) => o?.['01. symbol'] === 'SPY') || null;
  const dia = overSeas.find((o) => o?.['01. symbol'] === 'DIA') || null;

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
  return (
    <Container>
      <Banner>
        <h1>해외 증시</h1>
        <p>주요 지수와 종목 시세를 확인하세요</p>
      </Banner>

      <IndexWrap>
        {/* QQQ */}
        <IndexCard
          onClick={() => navi('/market/nasdaq')}
          style={{ cursor: 'pointer' }}
        >
          <h2>NASDAQ 100 {qqq && qqq['07. latest trading day']}</h2>
          <div className="value">
            {qqq && qqq['05. price'] ? qqq['05. price'] : '-'}
          </div>
          <div className="sub">
            <span className="sub-label">전일대비</span>
            <span className="sub-value">
              {qqq && qqq['09. change'] ? qqq['09. change'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">등락률</span>
            <span className="sub-value">
              {qqq && qqq['10. change percent']
                ? qqq['10. change percent']
                : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">시가</span>
            <span className="sub-value">
              {qqq && qqq['02. open'] ? qqq['02. open'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">고가</span>
            <span className="sub-value">
              {qqq && qqq['03. high'] ? qqq['03. high'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">저가</span>
            <span className="sub-value">
              {qqq && qqq['04. low'] ? qqq['04. low'] : '-'}
            </span>
          </div>
        </IndexCard>

        {/* SPY */}
        <IndexCard
          onClick={() => navi('/market/sp500')}
          style={{ cursor: 'pointer' }}
        >
          <h2>S&P 500 {spy && spy['07. latest trading day']}</h2>
          <div className="value">
            {spy && spy['05. price'] ? spy['05. price'] : '-'}
          </div>
          <div className="sub">
            <span className="sub-label">전일대비</span>
            <span className="sub-value">
              {spy && spy['09. change'] ? spy['09. change'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">등락률</span>
            <span className="sub-value">
              {spy && spy['10. change percent']
                ? spy['10. change percent']
                : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">시가</span>
            <span className="sub-value">
              {spy && spy['02. open'] ? spy['02. open'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">고가</span>
            <span className="sub-value">
              {spy && spy['03. high'] ? spy['03. high'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">저가</span>
            <span className="sub-value">
              {spy && spy['04. low'] ? spy['04. low'] : '-'}
            </span>
          </div>
        </IndexCard>

        {/* DIA */}
        <IndexCard
          onClick={() => navi('/market/dowjones')}
          style={{ cursor: 'pointer' }}
        >
          <h2>Dow Jones {dia && dia['07. latest trading day']}</h2>
          <div className="value">
            {dia && dia['05. price'] ? dia['05. price'] : '-'}
          </div>
          <div className="sub">
            <span className="sub-label">전일대비</span>
            <span className="sub-value">
              {dia && dia['09. change'] ? dia['09. change'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">등락률</span>
            <span className="sub-value">
              {dia && dia['10. change percent']
                ? dia['10. change percent']
                : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">시가</span>
            <span className="sub-value">
              {dia && dia['02. open'] ? dia['02. open'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">고가</span>
            <span className="sub-value">
              {dia && dia['03. high'] ? dia['03. high'] : '-'}
            </span>
          </div>
          <div className="sub">
            <span className="sub-label">저가</span>
            <span className="sub-value">
              {dia && dia['04. low'] ? dia['04. low'] : '-'}
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
