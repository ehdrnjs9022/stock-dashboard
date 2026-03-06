import {
  Container,
  SectionTitle,
  MainWrap,
  MainLeft,
  MainCenter,
  MainRight,
  ChartBox,
  IndexCard,
} from "./Home.styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import he from "he";
import api from "../../api/api";

const Home = () => {
  const [news, setNews] = useState([]);
  const [stock, setStock] = useState([]);
  const [overSeas, setOverSeas] = useState([]);
  const [kospi, setKospi] = useState([]);
  const [btc, setBtc] = useState([]);
  const [nasdaq, setNasdaq] = useState(null);
  const navi = useNavigate();

  // 📰 뉴스
  useEffect(() => {
    api
      .get(`/api/news`)
      .then((res) => setNews(res.data.items || []))
      .catch(console.error);
  }, []);

  // 🇰🇷 국내 주요 종목
  const codes = [
    { itemCode: "005930", stockName: "삼성전자" },
    { itemCode: "000660", stockName: "SK하이닉스" },
    { itemCode: "035420", stockName: "NAVER" },
    { itemCode: "373220", stockName: "LG에너지솔루션" },
    { itemCode: "051910", stockName: "LG화학" },
    { itemCode: "005380", stockName: "현대차" },
    { itemCode: "000270", stockName: "기아" },
    { itemCode: "207940", stockName: "삼성바이오로직스" },
    { itemCode: "028260", stockName: "삼성물산" },
    { itemCode: "003550", stockName: "LG" },
  ];

  useEffect(() => {
    api
      .post(`/api/domestic`, codes)
      .then((res) => {
        setStock(res.data.items || []);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 🌍 해외 증시 요약
  useEffect(() => {
    api
      .get("/api/overseas", {
        params: {
          symbol: [
            "AAPL",
            "MSFT",
            "TSLA",
            "AMZN",
            "NVDA",
            "GOOG",
            "META",
            "NFLX",
            "ORCL",
            "INTC",
            "ADBE",
            "PEP",
            "KO",
            "NKE",
            "DIS",
            "QQQ",
            "SPY",
            "DIA",
          ],
        },
      })
      .then((res) => {
        setOverSeas(res.data.items || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/api/nasdaq/month`)
      .then((res) => {
        setNasdaq(res.data.items);
        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 📈 KOSPI 지수
  useEffect(() => {
    api
      .get(`/api/kospi`)
      .then((res) => {
        setKospi(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ₿ 비트코인
  useEffect(() => {
    api
      .get(`/api/crypto`)
      .then((res) => {
        const btcData = res.data.items.find((c) => c.market === "KRW-BTC");
        setBtc(btcData);
        console.log(btcData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <SectionTitle>대표 지수 현황</SectionTitle>

      {/* 주요 지수 카드 */}
      <ChartBox>
        <IndexCard
          onClick={() => navi("/market/kospi")}
          style={{ cursor: "pointer" }}
        >
          <h2>KOSPI</h2>
          <div className="value">
            {kospi?.[0]?.closePrice?.toLocaleString() || "-"}
          </div>
          <div
            className={`sub ${
              kospi?.[0]?.compareToPreviousPrice?.code == 2
                ? "positive"
                : "negative"
            }`}
          >
            등락률 {kospi?.[0]?.compareToPreviousClosePrice}%
          </div>
        </IndexCard>

        <IndexCard
          onClick={() => navi("/market/nasdaq")}
          style={{ cursor: "pointer" }}
        >
          <h2>NASDAQ</h2>
          <div className="value">
            {nasdaq
              ? Number(
                  nasdaq?.chart?.result[0]?.indicators?.quote[0]?.close
                    .at(-1)
                    .toFixed(2),
                ).toLocaleString()
              : "_"}
          </div>
          <div
            className={`sub ${
              (nasdaq?.chart?.result[0]?.meta?.regularMarketPrice -
                nasdaq?.chart?.result[0]?.meta?.chartPreviousClose) /
                nasdaq?.chart?.result[0]?.meta?.chartPreviousClose >
              0
                ? "positive"
                : "negative"
            }`}
          >
            등락률{" "}
            {(
              ((nasdaq?.chart?.result[0]?.meta?.regularMarketPrice -
                nasdaq?.chart?.result[0]?.meta?.chartPreviousClose) /
                nasdaq?.chart?.result[0]?.meta?.chartPreviousClose) *
              100
            ).toFixed(2)}
            %
          </div>
        </IndexCard>

        <IndexCard
          onClick={() => navi("/market/btc")}
          style={{ cursor: "pointer" }}
        >
          <h2>BTC</h2>
          <div className="value">
            {btc?.trade_price ? Number(btc.trade_price).toLocaleString() : "-"}{" "}
            KRW
          </div>
          <div
            className={`sub ${
              btc?.change_rate * 100 > 0 ? "positive" : "negative"
            }`}
          >
            등락률 {(btc?.change_rate * 100).toFixed(2)}%
          </div>
        </IndexCard>
      </ChartBox>

      <MainWrap>
        {/* 뉴스 */}
        <MainLeft>
          <h3>📰 주요 뉴스</h3>
          {news.slice(0, 5).map((item, index) => (
            <div className="news-card" key={index}>
              <div className="title">
                {he.decode(item.title.replace(/<[^>]+>/g, ""))}
              </div>
              <a href={item.link} target="_blank" rel="noreferrer">
                기사 보기
              </a>
            </div>
          ))}
        </MainLeft>

        {/* 국내 증시 요약 */}
        <MainCenter>
          <h3>🇰🇷 국내 주요 종목</h3>
          <table>
            <thead>
              <tr>
                <th>종목명</th>
                <th>현재가</th>
                <th>등락률</th>
              </tr>
            </thead>
            <tbody>
              {stock.slice(0, 12).map((s, idx) => (
                <tr key={idx}>
                  <td>{s.stockName}</td>
                  <td>{s.industryCompareInfo?.[0]?.closePrice}</td>
                  <td
                    className={`sub ${
                      s.industryCompareInfo?.[0]?.fluctuationsRatio > 0
                        ? "positive"
                        : s.industryCompareInfo?.[0]?.fluctuationsRatio < 0
                          ? "negative"
                          : "-"
                    }`}
                  >
                    {s.industryCompareInfo?.[0]?.fluctuationsRatio}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MainCenter>

        {/* 해외 증시 요약 */}
        <MainRight>
          <h3>🌍 해외 주요 종목</h3>
          <table>
            <thead>
              <tr>
                <th>종목명</th>
                <th>현재가</th>
                <th>등락률</th>
              </tr>
            </thead>
            <tbody>
              {overSeas && overSeas.filter(Boolean).length > 0 ? (
                overSeas
                  .filter(Boolean)
                  .slice(0, 10)
                  .map((o, idx) => (
                    <tr key={idx}>
                      <td>{o["01. symbol"] || o.symbol || "-"}</td>
                      <td>{o["05. price"] || o.price || "-"}</td>
                      <td
                        className={`sub ${
                          parseFloat(o["10. change percent"]) > 0
                            ? "positive"
                            : parseFloat(o["10. change percent"]) < 0
                              ? "negative"
                              : "_"
                        }`}
                      >
                        {o["10. change percent"]
                          ? parseFloat(o["10. change percent"]).toFixed(2) + "%"
                          : "-"}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      color: "gray",
                      padding: "25px",
                    }}
                  >
                    🌐 해외 증시 API 호출 초과입니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </MainRight>
      </MainWrap>
    </Container>
  );
};

export default Home;
