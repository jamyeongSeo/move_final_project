package kr.co.iei.booking.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.booking.model.service.BookingService;
import kr.co.iei.movie.model.dto.MovieDTO;

@RestController
@RequestMapping(value="/booking")
@CrossOrigin("*")
public class BookingController {
	
	@Autowired
	BookingService bookingService;
	

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
	public ResponseEntity<Map> getSchedule(@RequestParam int movieNo){
		Map map = bookingService.selectSchedule(movieNo);
		return ResponseEntity.ok(map);
	}
	

}
