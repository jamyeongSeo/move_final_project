package kr.co.iei.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.coupon.model.dto.CouponDTO;
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

	MemberDTO selectMember(String memberId);

	int memberCouponCount(int memberNo);

	int memberWatchingMovieCount(int memberNo);

	List<CouponDTO> selectCoupon(String memberId);

	//------------회원탈퇴
	int deleteMember(String memberId);

	//----------회원정보수정
	int updateMember(MemberDTO member);

	//--------관람 완료 영화
	String memberEnrollDate(String memberId);

	List<BookingDTO> selectWatchedMovie(int intervalChoice, int memberNo);
	
	int watchedCount(int intervalChoice, int memberNo);
	
	//--------관람 예정 영화
	int bookingCount(int memberNo);

	List<BookingDTO> selectBookingMovie(int memberNo);

	//--------쿠폰 자동 삭제 및 발급
	int deleteCoupon();

	List selectBirthMember();
	int BirthCoupon(String memberNo);


	

	

}

