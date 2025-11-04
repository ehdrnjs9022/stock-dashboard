package com.dk.project.crypto.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TickerDTO {

    private String market;                 // 예: "KRW-BTC"
    private String trade_date;             // 거래 일자 (UTC)
    private String trade_time;             // 거래 시간 (UTC)
    private String trade_date_kst;         // 거래 일자 (KST)
    private String trade_time_kst;         // 거래 시간 (KST)
    private long trade_timestamp;          // 체결 타임스탬프

    private Double opening_price;          // 시가
    private Double high_price;             // 고가
    private Double low_price;              // 저가
    private Double trade_price;            // 현재가
    private Double prev_closing_price;     // 전일 종가

    private String change;                 // 등락 ("RISE", "FALL", "EVEN")
    private Double change_price;           // 변화 금액
    private Double change_rate;            // 변화율
    private Double signed_change_price;    // 부호 포함 변화 금액
    private Double signed_change_rate;     // 부호 포함 변화율

    private Double trade_volume;           // 최근 거래량
    private Double acc_trade_price;        // 누적 거래대금
    private Double acc_trade_price_24h;    // 24시간 누적 거래대금
    private Double acc_trade_volume;       // 누적 거래량
    private Double acc_trade_volume_24h;   // 24시간 누적 거래량

    private Double highest_52_week_price;  // 52주 최고가
    private String highest_52_week_date;   // 52주 최고가 달성일
    private Double lowest_52_week_price;   // 52주 최저가
    private String lowest_52_week_date;    // 52주 최저가 달성일

    private long timestamp;                // 현재 타임스탬프
}
