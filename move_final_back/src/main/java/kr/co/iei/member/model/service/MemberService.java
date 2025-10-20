package kr.co.iei.member.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.coupon.model.dto.CouponDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.utils.JwtUtils;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired 
	private BCryptPasswordEncoder encoder;
	@Autowired
	private JwtUtils jwtUtils;
	
	
	//--------------회원가입----------------------
	public int checkEmail(String memberEmail) {
		int result = memberDao.checkEmail(memberEmail);
		return result;
	}

	public int checkId(String memberId) {
		int result = memberDao.checkId(memberId);
		return result;
	}
	
	@Transactional
	public int insertMember(MemberDTO member) {
		String memberPw =member.getMemberPw();
		String encPw = encoder.encode(memberPw);
		member.setMemberPw(encPw);
		int result = memberDao.insertMember(member);
		if(result == 1) {
			int couponResult = memberDao.wellcomCoupon(member);
			if(couponResult == 1) {
				return 2;//회원가입 성공 + 웰컴쿠폰 발급 성공
			}else {
				return 1;//회원가입 성공 + 웰컴쿠폰 발급 실패
			}
		}else{			
			return 0;//회원가입 실패
		}
	}
	
	//-----------------로그인-------------------------
	public LoginMemberDTO login(MemberDTO member) {
		//1.encoder 비밀번호와 입력 비밀번호 동일 형태로 만들어서 맞는지 확인(로그인 성공 여부 확인)->하면서 memberLevel도 같이 들고오기
		MemberDTO m = memberDao.login(member);
				
		if(m != null && encoder.matches( member.getMemberPw(), m.getMemberPw())) {
			//2.성공 시, token 생성 및 발행(//토큰 미발행 시, 오류:2  / 토큰 발행 성공 시, 1)
			String accessToken = jwtUtils.createAccessToken(m.getMemberId(), m.getMemberLevel());
			String refreshToken = jwtUtils.createRefreshToken(m.getMemberId(), m.getMemberLevel());
			LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken, m.getMemberId(), m.getMemberLevel());
			return loginMember;
		}else {
			return null;
			
		}
	}

	//-----------------아이디 찾기-------------------------
	public String searchId(String memberName, String memberEmail) {
		String searchId = memberDao.searchId(memberName, memberEmail);
		if(searchId != null) {
			return searchId;
		}else {
			return "";//아이디 조회 실패						
		}
	}

	//-----------------비밀번호 찾기-------------------------
	public int searchPw(String memberName, String memberId, String memberEmail) {
		int result = memberDao.searchPw(memberName, memberId, memberEmail);
		return result;
	}
	@Transactional
	public int updatePw(String memberPw, String memberEmail) {
		String encPw = encoder.encode(memberPw);
		memberPw=encPw;
		int result = memberDao.updatePw(memberPw,memberEmail);
		return result;
	}

	//-----------------회원정보-------------------------
	public MemberDTO selectMember(String memberId) {
		MemberDTO m = memberDao.selectMember(memberId);
		int couponCount = memberDao.memberCouponCount(m.getMemberNo());
		m.setCouponCount(couponCount);
		int watchingMovieCount = memberDao.memberWatchingMovieCount(m.getMemberNo()); 
		m.setWatchingMovieCount(watchingMovieCount);
		return m;
	}
	//쿠폰 모달
	public List<CouponDTO> selectCoupon(String memberId) {
		List<CouponDTO> couponList = memberDao.selectCoupon(memberId);
		return couponList;
	}
	
	
}
