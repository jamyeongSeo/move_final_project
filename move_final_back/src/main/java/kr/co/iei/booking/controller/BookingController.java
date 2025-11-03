package kr.co.iei.booking.controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import kr.co.iei.MoveFinalBackApplication;
import kr.co.iei.admin.controller.AdminController;
import kr.co.iei.booking.model.dto.BookingInfoDTO;
import kr.co.iei.booking.model.service.BookingService;
import kr.co.iei.coupon.model.dto.CouponDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.movie.model.dto.MovieDTO;

@RestController
@RequestMapping(value="/booking")
@CrossOrigin("*")
public class BookingController {

    private final AdminController adminController;

    private final MoveFinalBackApplication moveFinalBackApplication;
	
	@Autowired
	BookingService bookingService;


    BookingController(MoveFinalBackApplication moveFinalBackApplication, AdminController adminController) {
        this.moveFinalBackApplication = moveFinalBackApplication;
        this.adminController = adminController;
    }
	

	@GetMapping(value="/list")
	public ResponseEntity<Map> getMovieList(){
		Map map = bookingService.selectMovieList();
		return ResponseEntity.ok(map);
	}

	@GetMapping(value="/date")
	public ResponseEntity<Map> getDate(){
		Map map = bookingService.selectDateList();
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/schedule")
	public ResponseEntity<Map> getSchedule(@RequestParam(required = false) Integer movieNo, @RequestParam String movieDate){
		Map map = bookingService.selectSchedule(movieNo, movieDate);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/getSeat/{screenNo}/{scheduleNo}")
	public ResponseEntity<Map> getSeat(@PathVariable int screenNo, @PathVariable int scheduleNo , @RequestParam String movieDate ){
		Map map = bookingService.selectScreenSeat(screenNo, scheduleNo, movieDate);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value="/calcPrice/{movieNo}")
	public ResponseEntity<Map> calcPrice(@PathVariable int movieNo, @RequestParam int adultCount, @RequestParam int kidCount){
		Map map = bookingService.calcPrice(movieNo, adultCount, kidCount);
		System.out.println(adultCount);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/getMovie")
	public ResponseEntity<MovieDTO> getMovie(@RequestParam int movieNo){
		MovieDTO m  = bookingService.selectOneMovie(movieNo);
		return ResponseEntity.ok(m);
	}
	
	@GetMapping(value="/getCoupon")
	public ResponseEntity<Map> getCoupon(@RequestParam String memberId){
		Map couponMap = bookingService.selectCoupon(memberId);
		return ResponseEntity.ok(couponMap);
	}
	
	@GetMapping(value="/getMember")
	public ResponseEntity<MemberDTO> getMember(@RequestParam String memberId){
		MemberDTO m = bookingService.selectOneMember(memberId);
		return ResponseEntity.ok(m);
	}
	
	@PostMapping(value="/payment")
	public ResponseEntity<Integer> payment(@RequestBody BookingInfoDTO bookingInfo){
		
		
		int result = bookingService.payment(bookingInfo);
		
		return ResponseEntity.ok(result);
	}
}
