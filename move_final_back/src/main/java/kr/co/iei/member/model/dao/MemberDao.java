package kr.co.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.MemberDTO;

@Mapper
public interface MemberDao {

	int checkEmail(String memberEmail);

	int login(MemberDTO member);

	int checkId(String memberId);

	int insertMember(MemberDTO member);

	int wellcomCoupon(MemberDTO member);

	

}

