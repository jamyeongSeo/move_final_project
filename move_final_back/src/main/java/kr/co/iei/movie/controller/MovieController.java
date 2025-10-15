package kr.co.iei.movie.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import kr.co.iei.movie.model.service.MovieService;

@RestController
@RequestMapping(value="/movie")
@CrossOrigin("*")
public class MovieController {
	@Autowired
	MovieService movieService;
	
	@GetMapping(value="/list")
	public ResponseEntity<Map> getMovieList(){
		Map map =  movieService.selectMovieList();
		
		return ResponseEntity.ok(map);
	}
}
