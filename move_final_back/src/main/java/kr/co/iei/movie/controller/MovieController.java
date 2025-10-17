package kr.co.iei.movie.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.movie.model.service.MovieService;

@RestController
@RequestMapping(value="/movie")
@CrossOrigin("*")
public class MovieController {
	@Autowired
	MovieService movieService;
	
	@GetMapping(value="/list")
	public ResponseEntity<Map> getMovieList(@RequestParam String memberId){
		Map map =  movieService.selectMovieList(memberId);
		
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value="/likePush")
	public ResponseEntity<Integer> likePush(@RequestParam int movieNo, @RequestParam String memberId){
		int result = movieService.likePush(movieNo, memberId);
		return ResponseEntity.ok(result);
		
	}
	
	@GetMapping(value="/isLike")
	public ResponseEntity<Boolean> isLike(@RequestParam int movieNo, @RequestParam String memberId){
		boolean result = movieService.isLike(movieNo, memberId);
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping
	public ResponseEntity<Integer> likeUnPush(@RequestParam int movieNo, @RequestParam String memberId){
		System.out.println(movieNo);
		System.out.println(memberId);
		int result  = movieService.likeUnPush(movieNo, memberId);
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
}
