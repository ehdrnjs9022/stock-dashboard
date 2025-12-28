package com.dk.project.board.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LikeMapper {

    int likeExists(@Param("userNo") Long userNo,
                   @Param("boardNo") Long boardNo);

    int likeInsert(@Param("userNo") Long userNo,
                   @Param("boardNo") Long boardNo);

    int likeDelete(@Param("userNo") Long userNo,
                   @Param("boardNo") Long boardNo);
}
