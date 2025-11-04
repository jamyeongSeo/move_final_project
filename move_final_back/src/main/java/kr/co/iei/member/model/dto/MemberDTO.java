package kr.co.iei.member.model.dto;

import java.util.List;
import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("member")
public class MemberDTO {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberName;
	private String memberBirth;
	private int memberGender;
	private String memberPhone;
	private String enrollDate;
	private int memberLevel;
	private int memberGrade;
	
	private int couponCount;
	private int watchingMovieCount;
	private int watchingMoviePayNoCount;
}

/*
member_no           number          primary key,
member_id           varchar2(30)    unique not null,
member_pw           char(60)        not null,
member_email        varchar2(50)    not null,
member_name         varchar2(20)    not null,
member_birth        date            not null,
member_gender       number          not null,--1: 남 2: 여
member_phone        char(13)        not null,-- sysdate
enroll_date         char(10)        not null,
member_level        number          not null,--1:관리자 2:회원
member_grade        number          not null  --1.normal  2.  VIP 3. VVIP-뺄지 말지 얘기 필요
);*/

