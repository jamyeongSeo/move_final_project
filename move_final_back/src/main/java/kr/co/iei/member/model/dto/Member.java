package kr.co.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("member")
public class Member {
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
}

/*
member_no           number          primary key,
member_id           varchar2(30)    unique not null,
member_pw           char(60)        not null,
member_email        varchar2(50)    not null,
member_name         varchar2(20)    not null,
member_birth        date            not null,
member_gender       number          not null,--1:�� 2:��
member_phone        char(13)        not null,-- -���� �Է��ϱ�
enroll_date         char(10)        not null,
member_level        number          not null,--1:������ 2:ȸ��
member_grade        number          not null
);*/