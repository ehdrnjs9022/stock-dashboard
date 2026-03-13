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
} from "./Common.style";
import {
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/api";

const Kosdaq = () => {
  const [monthData, setMonthData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const latest = monthData.at(-1);

  const CustomTooltip = ({ active, payload, setSelectedData }) => {
    useEffect(() => {
      if (active && payload.length > 0) {
        setSelectedData(payload[0]?.payload);
      }
    }, [active, payload, setSelectedData]);
  };

  useEffect(() => {
    api
      .get(`/api/kosdaq/month`)
      .then((res) => {
        const result = res.data.items.chart.result[0] || [];
        const indicators = result.indicators.quote[0] || [];
        const timestamps = result.timestamp || [];
        // 변수에 배열의 요소를 넣으면 그 ‘객체 자체’를 가리키게 된다.”
        const open = indicators?.open || [];
        const close = indicators?.close || [];
        const high = indicators?.high || [];
        const low = indicators?.low || [];
        const volume = indicators?.volume || [];
        const meta = result.meta || [];

        const chartData = timestamps.map((t, i) => ({
          date: new Date(t * 1000).toLocaleDateString("ko-KR"),
          open: open[i],
          close: close[i],
          high: high[i],
          low: low[i],
          volume: volume[i],
          prevClose: i > 0 ? close[i - 1] : null, // ← 이전날 종가 추가
          regularMarketPrice: meta.regularMarketPrice || [],
          chartPreviousClose: meta.chartPreviousClose || [],
        }));

        setMonthData(chartData);
        console.log(chartData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {/* 제목 */}
      <Title>KOSDAQ 지수</Title>

      {/* 상단 핵심 요약 */}
      <SummaryBox>
        <div className="summary-header">
          <h2>{latest?.date}</h2>
          <span className="label">KOSDAQ</span>
        </div>
        <div className="price">{latest?.regularMarketPrice}</div>
        <div className="sub positive">
          {" "}
          {Number(
            (
              ((latest?.regularMarketPrice - latest?.chartPreviousClose) /
                latest?.chartPreviousClose) *
              100
            ).toFixed(2),
          ).toLocaleString()}
          %
        </div>
      </SummaryBox>

      {/* 차트 영역 */}
      <ChartWrap>
        <ChartInfo>
          <h3>📈 최근 30일 추이</h3>
        </ChartInfo>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(v) => v.toLocaleString()}
              tick={{ fontSize: 12 }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              content={<CustomTooltip setSelectedData={setSelectedData} />}
            />
            <CartesianGrid stroke="#eee" />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#2a5298"
              strokeWidth={2}
              dot
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrap>

      {/* 일일 시가·고가·저가·종가 */}
      <InfoGrid>
        <InfoCard>
          <h4>시가</h4>
          <div className="value">
            {selectedData ? (selectedData?.open).toFixed(2) : "-"}
          </div>
        </InfoCard>
        <InfoCard>
          <h4>고가</h4>
          <div className="value">
            {selectedData ? (selectedData?.high).toFixed(2) : "-"}
          </div>
        </InfoCard>
        <InfoCard>
          <h4>저가</h4>
          <div className="value">
            {selectedData ? (selectedData?.low).toFixed(2) : "-"}
          </div>
        </InfoCard>
        <InfoCard>
          <h4>종가</h4>
          <div className="value">
            {selectedData ? (selectedData?.close).toFixed(2) : "-"}
          </div>
        </InfoCard>
      </InfoGrid>

      {/* 세부 지표 */}
      <DetailGrid>
        <h3>📊 세부 지수 데이터</h3>
        <div className="detail-body">
          <DetailItem>
            <span className="label">거래일</span>
            <span className="value">{selectedData?.date}</span>
          </DetailItem>
          <DetailItem>
            <span className="label">전일 대비 구분</span>
            <span
              className={
                selectedData?.close - selectedData?.prevClose > 0
                  ? "positive"
                  : "negative"
              }
            >
              {selectedData?.close - selectedData?.prevClose > 0
                ? "▲ 상승"
                : "▼ 하락"}
            </span>
          </DetailItem>
          <DetailItem>
            <span className="label">전일 종가 대비</span>
            <span
              className={
                selectedData?.close - selectedData?.prevClose > 0
                  ? "positive"
                  : "negative"
              }
            >
              {Number(selectedData?.close - selectedData?.prevClose)
                .toFixed(2)
                .toLocaleString()}
            </span>
          </DetailItem>
          <DetailItem>
            <span className="label">등락률</span>
            <span
              className={
                (selectedData?.close - selectedData?.prevClose) /
                  selectedData?.prevClose >
                0
                  ? "positive"
                  : "negative"
              }
            >
              {(
                ((selectedData?.close - selectedData?.prevClose) /
                  selectedData?.prevClose) *
                100
              ).toFixed(2)}
              %
            </span>
          </DetailItem>
        </div>
      </DetailGrid>
    </Container>
  );
};

export default Kosdaq;
