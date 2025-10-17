package kr.co.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.MemberDTO;

@Mapper
public interface MemberDao {
	//-------------회원가입----------------
	int checkEmail(String memberEmail);

	int checkId(String memberId);

	int insertMember(MemberDTO member);

	int wellcomCoupon(MemberDTO member);

	//-------------로그인----------------------
	MemberDTO login(MemberDTO member);
	
	//------------아이디찾기---------------------
	String searchId(String memberName, String memberEmail);
	
	//-----------비밀번호찾기-----------------------
	int searchPw(String memberName, String memberId, String memberEmail);

	int updatePw(String memberPw, String memberEmail);


}

