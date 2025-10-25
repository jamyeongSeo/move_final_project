package kr.co.iei.admin.controller;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.movie.model.dto.MovieDTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Value("${file.root}")
    private String root;

    @GetMapping("/movie")
    public ResponseEntity<Map> adminMovieList(
            @RequestParam(required = false) Integer reqPage,
            @RequestParam(required = false) String movieTitle,
            @RequestParam(required = false) Integer movieStatus
    ) {
        int page = (reqPage == null) ? 1 : reqPage;
        Map map = adminService.adminMovieList(page, movieTitle, movieStatus);
        return ResponseEntity.ok(map);
    }

    @PatchMapping("/movie/{movieNo}")
    public ResponseEntity<Integer> updateMovieStatus(
            @PathVariable int movieNo,
            @RequestPart("movie") MovieDTO movie) {
        int result = adminService.updateMovieStatus(movieNo, movie.getMovieStatus());
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/movie", consumes = "multipart/form-data")
    public ResponseEntity<Integer> insertMovieInfo(
            @RequestPart("movie") MovieDTO movie,
            @RequestPart(value = "movieThumb", required = false) MultipartFile movieThumb) {

        try {
            if (movieThumb != null && !movieThumb.isEmpty()) {
                String savePath = root + "/thumb/";
                File dir = new File(savePath);
                if (!dir.exists()) dir.mkdirs();

                String fileName = System.currentTimeMillis() + "_" + movieThumb.getOriginalFilename();
                File dest = new File(savePath, fileName);
                movieThumb.transferTo(dest);
                movie.setMovieThumb(fileName);
            }

            int result = adminService.insertMovieInfo(movie);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(0);
        }
    }

    @GetMapping("/{movieNo}")
    public ResponseEntity<MovieDTO> selectOneMovie(@PathVariable int movieNo) {
        MovieDTO movie = adminService.selectOneMovie(movieNo);
        return ResponseEntity.ok(movie);
    }

    @PostMapping("/schedule")
    public ResponseEntity<ScheduleDTO> insertMovieSchedule(@RequestPart("schedule") ScheduleDTO schedule) {
        ScheduleDTO s = adminService.insertSchedule(schedule);
        if (s != null) {
            return ResponseEntity.ok(s);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/movie/running")
    public ResponseEntity<List<MovieDTO>> getRunningMovies() {
        List<MovieDTO> grm = adminService.getRunningMovies();
        return ResponseEntity.ok(grm);
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<ScheduleDTO>> scheduleList() {
        List<ScheduleDTO> scheduleList = adminService.scheduleList();
        return ResponseEntity.ok(scheduleList);
    }

    @PatchMapping
    public ResponseEntity<Integer> updateSchedule(@RequestBody ScheduleDTO schedule) {
        int result = adminService.updateSchedule(schedule);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{scheduleNo}")
    public ResponseEntity<Integer> deleteSchedule(@PathVariable int scheduleNo) {
        int result = adminService.deleteSchedule(scheduleNo);
        return ResponseEntity.ok(result);
    }
}
