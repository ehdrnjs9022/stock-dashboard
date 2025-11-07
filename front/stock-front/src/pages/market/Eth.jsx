import {
  Container,
  Title,
  SummaryBox,
  ChartWrap,
  ChartInfo,
  InfoGrid,
  InfoCard,
  DetailGrid,
  DetailItem,
} from './Common.style';
import {
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Eth = () => {
  const [monthData, setMonthData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cryptoETH/month`)
      .then((res) => {
        setMonthData(res.data.items || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const CustomTooltip = ({ active, payload, setSelectedData }) => {
    useEffect(() => {
      if (active && payload && payload.length > 0) {
        setSelectedData?.(payload[0].payload);
      }
    }, [active, payload, setSelectedData]);
  };

  return (
    <Container>
      <Title>ETH 지수</Title>

      {/* 상단 핵심 요약 */}
      <SummaryBox>
        <div className="summary-header">
          <h2>
            {new Date(monthData[0]?.candle_date_time_kst).toLocaleString()}
          </h2>
          <span className="label">ETH</span>
        </div>
        <div className="price">
          {monthData[0]?.trade_price
            ? monthData[0].trade_price.toLocaleString()
            : '-'}
        </div>
        <div className="sub positive">
          {(
            monthData[0]?.trade_price - monthData[0]?.prev_closing_price
          ).toLocaleString()}
        </div>
      </SummaryBox>

      {/* 차트 영역 */}
      <ChartWrap>
        <ChartInfo>
          <h3>📈 최근 30일 추이</h3>
        </ChartInfo>

        {monthData.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={[...monthData].reverse()}>
              <XAxis
                dataKey="candle_date_time_kst"
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => v.slice(5, 10)} // 월/일만 표시
              />
              <YAxis
                tickFormatter={(v) => v.toLocaleString()}
                tick={{ fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <Tooltip
                content={<CustomTooltip setSelectedData={setSelectedData} />}
              />
              <CartesianGrid stroke="#eee" />
              <Line
                type="monotone"
                dataKey="trade_price"
                stroke="#2a5298"
                strokeWidth={2}
                dot
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartWrap>

      {/* 일일 시가·고가·저가·종가 */}
      <InfoGrid>
        <InfoCard>
          <h4>시가</h4>
          <div className="value">
            {selectedData ? selectedData.opening_price.toLocaleString() : '-'}
          </div>
        </InfoCard>
        <InfoCard>
          <h4>고가</h4>
          <div className="value">
            {selectedData ? selectedData.high_price.toLocaleString() : '-'}
          </div>
        </InfoCard>
        <InfoCard>
          <h4>저가</h4>
          <div className="value">
            {selectedData ? selectedData.low_price.toLocaleString() : '-'}
          </div>
        </InfoCard>
        <InfoCard>
          <h4>종가</h4>
          <div className="value">
            {selectedData ? selectedData.trade_price.toLocaleString() : '-'}
          </div>
        </InfoCard>
      </InfoGrid>

      {/* 세부 지표 */}
      <DetailGrid>
        <h3>📊 세부 지수 데이터</h3>
        <div className="detail-body">
          <DetailItem>
            <span className="label">거래일</span>
            <span>
              {new Date(
                selectedData ? selectedData.candle_date_time_kst : '_'
              ).toLocaleString()}
            </span>
          </DetailItem>
          <DetailItem>
            <span className="label">전일 대비 구분</span>
            <span
              className={
                selectedData?.trade_price > selectedData?.prev_closing_price > 0
                  ? 'positive'
                  : 'negative'
              }
            >
              {selectedData
                ? selectedData?.trade_price > selectedData?.prev_closing_price
                  ? '▲ 상승'
                  : '▼ 하락'
                : '-'}
            </span>
          </DetailItem>
          <DetailItem>
            <span className="label">전일 종가 대비</span>
            <span
              className={
                selectedData?.trade_price - selectedData?.prev_closing_price > 0
                  ? 'positive'
                  : 'negative'
              }
            >
              {selectedData
                ? (
                    selectedData?.trade_price - selectedData?.prev_closing_price
                  ).toLocaleString()
                : '_'}
            </span>
          </DetailItem>
          <DetailItem>
            <span className="label">등락률</span>
            <span
              className={
                (selectedData?.trade_price - selectedData?.prev_closing_price) /
                  selectedData?.prev_closing_price >
                0
                  ? 'positive'
                  : 'negative'
              }
            >
              {selectedData
                ? (
                    ((selectedData?.trade_price -
                      selectedData?.prev_closing_price) /
                      selectedData?.prev_closing_price) *
                    100
                  ).toFixed(2)
                : '_'}
              %
            </span>
          </DetailItem>
        </div>
      </DetailGrid>
    </Container>
  );
};

export default Eth;
