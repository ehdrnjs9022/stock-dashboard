package com.dk.project.index.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 📊 KOSPI 등 국내지수 30일 차트용 DTO
 * 실제 프론트에서 시가·고가·저가·종가·거래량 차트용으로만 사용하는 구조
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IndexMonthDTO {

    private Chart chart;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Chart {
        private List<Result> result;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Result {
        private Meta meta;
        private List<Long> timestamp; // 날짜 목록
        private Indicators indicators;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString	
    public static class Meta {
        private String symbol; // ^KS11 (KOSPI 코드)
        private String exchangeName;
        private String timezone;
        private double regularMarketPrice; //현재코스피지수
        private double chartPreviousClose; //전일마감지수 
        
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Indicators {
        private List<Quote> quote;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Quote {
        private List<Double> open;
        private List<Double> high;
        private List<Double> low;
        private List<Double> close;
        private List<Long> volume;
    }
}
