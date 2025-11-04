import axios from 'axios';
import {
  Container,
  Banner,
  MarketTabs,
  IndexWrap,
  IndexCard,
  Table,
} from './Crypto.style';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Crypto = () => {
  const [ticker, setTicker] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState('KRW'); // 기본값 KRW
  const navi = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/crypto`)
      .then((res) => {
        setTicker(res.data.items);
        console.log(res.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {/* 배너 */}
      <Banner>
        <h1>가상화폐 시세</h1>
        <p>마켓별 주요 암호화폐 시세를 실시간으로 확인하세요</p>
      </Banner>

      {/* 마켓 선택 탭 */}
      <MarketTabs>
        <button onClick={() => setSelectedMarket('KRW')}>KRW</button>
        <button onClick={() => setSelectedMarket('BTC')}>BTC</button>
        <button onClick={() => setSelectedMarket('USDT')}>USDT</button>
      </MarketTabs>

      {/* 대표 코인 카드 */}
      <IndexWrap>
        {/* 비트코인 */}
        <IndexCard
          onClick={() => navi('/market/btc')}
          style={{ cursor: 'pointer' }}
        >
          <h2>비트코인 (BTC)</h2>
          <div className="value">
            {ticker
              .find(
                (coin) => coin.market && coin.market === `${selectedMarket}-BTC`
              )
              ?.trade_price?.toLocaleString() || '_'}{' '}
            {selectedMarket}
          </div>
          <div className="sub">
            24시간 변화율{' '}
            {(
              (ticker.find((coin) => coin.market === `${selectedMarket}-BTC`)
                ?.change_rate ?? 0) * 100
            ).toFixed(2)}
            %
          </div>
          <div className="sub">
            거래량{' '}
            {ticker.find((coin) => coin.market === `${selectedMarket}-BTC`)
              ? Number(
                  ticker
                    .find((coin) => coin.market === `${selectedMarket}-BTC`)
                    ?.acc_trade_volume_24h.toFixed(0)
                ).toLocaleString()
              : '_'}
          </div>
        </IndexCard>

        {/* 이더리움 */}
        <IndexCard
          onClick={() => navi('/market/eth')}
          style={{ cursor: 'pointer' }}
        >
          <h2>이더리움 (ETH)</h2>
          <div className="value">
            {ticker
              .find((coin) => coin.market === `${selectedMarket}-ETH`)
              ?.trade_price?.toLocaleString() || '_'}{' '}
            {selectedMarket}
          </div>
          <div className="sub">
            24시간 변화율{' '}
            {(
              (ticker.find((coin) => coin.market === `${selectedMarket}-ETH`)
                ?.change_rate ?? 0) * 100
            ).toFixed(2)}
            %
          </div>
          <div className="sub">
            거래량{' '}
            {ticker.find((coin) => coin.market === `${selectedMarket}-ETH`)
              ? Number(
                  ticker
                    .find((coin) => coin.market === `${selectedMarket}-ETH`)
                    ?.acc_trade_volume_24h.toFixed(0)
                ).toLocaleString()
              : '_'}
          </div>
        </IndexCard>
      </IndexWrap>

      {/* 주요 코인 테이블 */}
      <Table>
        <thead>
          <tr>
            <th>코인명</th>
            <th>현재가</th>
            <th>변동금액</th>
            <th>등락률</th>
            <th>거래대금(24H)</th>
          </tr>
        </thead>
        <tbody>
          {ticker.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{ textAlign: 'center', color: '#777', padding: '25px' }}
              >
                데이터 로딩 중...
              </td>
            </tr>
          ) : (
            ticker
              .filter((coin) => coin.market.startsWith(selectedMarket))
              .slice(0, 15)
              .map((coin) => (
                <tr key={coin.market}>
                  <td>{coin.korean_name}</td>
                  <td>{coin.trade_price?.toLocaleString() || '-'}</td>
                  <td>{coin.change_price?.toLocaleString() || '-'}</td>
                  <td>{(coin.change_rate * 100).toFixed(2)}%</td>
                  <td>
                    {coin.acc_trade_price_24h
                      ? `${Number(
                          coin.acc_trade_price_24h.toFixed(0)
                        ).toLocaleString()} ${selectedMarket}`
                      : '-'}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Crypto;
