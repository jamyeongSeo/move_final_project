package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired BCryptPasswordEncoder encoder;
	
	public int checkEmail(String memberEmail) {
		int result = memberDao.checkEmail(memberEmail);
		return result;
	}

	public int login(MemberDTO member) {
		int result = memberDao.login(member);
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
}
