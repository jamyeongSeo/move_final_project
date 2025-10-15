package kr.co.iei.booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.booking.model.service.BookingService;

@RestController
@RequestMapping(value="/booking")
@CrossOrigin("*")
public class BookingController {
	
	@Autowired
	BookingService bookingService;
	
	//@GetMapping(value="/list")
	//public ResponseEntity<MovieDTO> getMovieList(){
		
	

}
