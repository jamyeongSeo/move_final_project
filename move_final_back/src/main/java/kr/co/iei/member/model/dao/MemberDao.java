package kr.co.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.Member;

@Mapper
public interface MemberDao {

	int checkEmail(String memberEmail);

	int login(Member member);

}

