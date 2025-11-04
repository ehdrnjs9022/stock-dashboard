package com.dk.project.main.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StockDTO {
    private String itemCode;
    private String stockName;
    private List<TotalInfo> totalInfos; // 상세 데이터
    private List<IndustryCompareInfo> industryCompareInfo; // 업종 비교 (홈에서 요약용)

    @Getter
    @Setter
    public static class TotalInfo {
        private String code;
        private String key;
        private String value;
        private CompareToPreviousPrice compareToPreviousPrice;
    }

    @Getter
    @Setter
    public static class CompareToPreviousPrice {
        private String code;
        private String text;
        private String name;
    }

    @Getter
    @Setter
    public static class IndustryCompareInfo {
        private String stockName;
        private String closePrice; // 현재가
        private String compareToPreviousClosePrice; // 전일 대비
        private CompareToPreviousPrice compareToPreviousPrice; // 상승/하락 정보
        private String fluctuationsRatio; // 등락률
    }
}
