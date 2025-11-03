package kr.co.iei.member.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.coupon.model.dto.CouponDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberMovieListDTO;
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
		//System.out.println("회원번호: "+m.getMemberNo());
		int couponCount = memberDao.memberCouponCount(m.getMemberNo());
		//System.out.println("관람영화 수 : "+couponCount);
		int watchingMovieCount = memberDao.memberWatchingMovieCount(m.getMemberNo());
		System.out.println(watchingMovieCount);
		m.setCouponCount(couponCount);
		m.setWatchingMovieCount(watchingMovieCount);
		//int watchingMovieCount = memberDao.memberWatchingMovieCount(m.getMemberNo()); 
		//m.setWatchingMovieCount(watchingMovieCount);
		System.out.println(m);
		return m;
	}
	//쿠폰 모달
	public List<CouponDTO> selectCoupon(String memberId) {
		List<CouponDTO> couponList = memberDao.selectCoupon(memberId);
		return couponList;
	}

	
	/*----------deleteMember-----------*/
	public int searchMember(String memberId, String memberPw) {
		MemberDTO m = memberDao.selectMember(memberId);
		if(m != null) {
			if(encoder.matches(memberPw, m.getMemberPw())) {
				return 1;//조회 결과 있음
			}			
		}
		return 0;//조회 결과 없음
	}
	
	public int deleteMember(String memberId) {
		int result = memberDao.deleteMember(memberId);
		return result;
		
	}
	
	/*----------updateMember----------*/
	@Transactional
	public int updateMember(MemberDTO member) {
		String memberPw = encoder.encode(member.getMemberPw());
		member.setMemberPw(memberPw);
		int result = memberDao.updateMember(member);
		return result;
	}

	/*-----------관람 완료 영화------------*/
	public Map selectWatchedMovie(String memberId, int intervalChoice) {
		String enrollDate = memberDao.memberEnrollDate(memberId);
		MemberDTO m = memberDao.selectMember(memberId);
		int memberNo = m.getMemberNo();
		int totalCount = memberDao.watchedCount(intervalChoice, memberNo);
		List<BookingDTO> list = memberDao.selectWatchedMovie(intervalChoice, memberNo);
		
		//payNo로 맵 만들어야함.
		Set<Integer> processedPayNo = new HashSet<>();
		List watchedList = new ArrayList<>();
		for(BookingDTO b : list) {
			if(processedPayNo.contains(b.getPayNo())) {
				continue;
			}
			processedPayNo.add(b.getPayNo());
			MemberMovieListDTO content = new MemberMovieListDTO();
			/*
			int payNo = b.getPayNo();
			String movieTitle = "";
			int movieGrade = -1;
			String movieDate = null;
			String movieTime = null;
			String movieScreen = null;
			String count = null;
			String comment = null;
			String movieThumb = null;
			*/
			String resultCount = null;
			int adult = 0;
			int kid = 0;
			for(BookingDTO c : list) {
				if(b.getPayNo() == c.getPayNo()) {
					//관람평
					content.setComment(c.getCommentContent());
					//연령별 인원수
					if(c.getPricePerAge()==1){//성인
						adult += 1;
					}else if(c.getPricePerAge() == 2) {//어린이
						kid += 1;
					}
					if(adult != 0 && kid != 0) {
						resultCount = "성인:"+adult+" / "+"어린이:"+kid;
					}else if(adult != 0 && kid == 0) {
						resultCount = "성인:"+adult;
					}else if(adult == 0 && kid != 0) {
						resultCount = "어린이:"+kid;
					}
					content.setCount(resultCount);
					//관람일
					content.setMovieDate(c.getBookingDate());
					//관람 연령(등급)
					content.setMovieGrade(c.getMovieGrade());
					//관람 관
					if(c.getScreenName().equals("1관")) {						
						content.setMovieScreen(c.getScreenName()+"(2D)");
					}else if(c.getScreenName().equals("2관")) {						
						content.setMovieScreen(c.getScreenName()+"(3D)");
					}else if(c.getScreenName().equals("3관")) {						
						content.setMovieScreen(c.getScreenName()+"(4DX)");
					}
					//썸네일(포스터)
					content.setMovieThumb(c.getMovieThumb());
					//
					//상영시간(관람 시간)
					content.setMovieTime(c.getScheduleTimeStart()+"~"+c.getScheduleTimeEnd());
					//관람 영화제목
					content.setMovieTitle(c.getMovieTitle());
					//좌석은 없어도 됨
					//content.setSeat(enrollDate);
				}
				
			}
			watchedList.add(content);
		}
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("enrollDate", enrollDate);
		map.put("totalCount", totalCount);
		map.put("watchedList", watchedList);
		
		return map;
	}
	
	/*-----------관람 예정 영화------------------*/
	public Map selectBookingMovie(String memberId) {
		MemberDTO m = memberDao.selectMember(memberId);
		
		int memberNo = m.getMemberNo();
		int totalCount = memberDao.bookingCount(memberNo);
		List<BookingDTO> list = memberDao.selectBookingMovie(memberNo);
		System.out.println(list);
		
		//payNo로 맵 만들어야함.
		Set<Integer> processedPayNo = new HashSet<>();
		List bookingList = new ArrayList<>();
		for(BookingDTO b : list) {
			if(processedPayNo.contains(b.getPayNo())) {
				continue;
			}
			processedPayNo.add(b.getPayNo());
			MemberMovieListDTO content = new MemberMovieListDTO();
			/*
			int payNo = b.getPayNo();
			String movieTitle = "";
			int movieGrade = -1;
			String movieDate = null;
			String movieTime = null;
			String movieScreen = null;
			String count = null;
			String comment = null;
			String movieThumb = null;
			*/
			String resultCount = null;
			int adult = 0;
			int kid = 0;
			String seat = null;
			for(BookingDTO c : list) {
				if(b.getPayNo() == c.getPayNo()) {
					
					//연령별 인원수
					if(c.getPricePerAge()==1){//성인
						adult += 1;
					}else if(c.getPricePerAge() == 2) {//어린이
						kid += 1;
					}
					if(adult != 0 && kid != 0) {
						resultCount = "성인:"+adult+" / "+"어린이:"+kid;
					}else if(adult != 0 && kid == 0) {
						resultCount = "성인:"+adult;
					}else if(adult == 0 && kid != 0) {
						resultCount = "어린이:"+kid;
					}
					content.setCount(resultCount);
					//관람일
					content.setMovieDate(c.getBookingDate());
					//관람 연령(등급)
					content.setMovieGrade(c.getMovieGrade());
					//관람 관
					if(c.getScreenName().equals("1관")) {						
						content.setMovieScreen(c.getScreenName()+"(2D)");
					}else if(c.getScreenName().equals("2관")) {						
						content.setMovieScreen(c.getScreenName()+"(3D)");
					}else if(c.getScreenName().equals("3관")) {						
						content.setMovieScreen(c.getScreenName()+"(4DX)");
					}
					//썸네일(포스터)
					content.setMovieThumb(c.getMovieThumb());
					//상영시간(관람 시간)
					content.setMovieTime(c.getScheduleTimeStart()+"~"+c.getScheduleTimeEnd());
					//관람 영화제목
					content.setMovieTitle(c.getMovieTitle());
					//좌석
					if(seat == null) {
						seat = c.getBookSeatRow()+c.getBookSeatColumn();
					}else {
						seat = seat+","+c.getBookSeatRow()+c.getBookSeatColumn();
					}
					content.setSeat(seat);
				}
				
			}
			bookingList.add(content);
		}
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("totalCount", totalCount);
		map.put("bookingList", bookingList);
		
		return map;
	}
	
	
}
