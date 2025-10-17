package kr.co.iei.cs.notice.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.cs.notice.model.dto.NoticeDTO;
import kr.co.iei.cs.notice.model.dto.NoticeFileDTO;
import kr.co.iei.cs.notice.model.service.NoticeService;
import kr.co.iei.utils.FileUtil;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/cs/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping
	public ResponseEntity<Map> noticeList(@RequestParam int reqPage, @RequestParam String noticeTitle){
		Map map = noticeService.selectNoticeList(reqPage, noticeTitle);
		return ResponseEntity.ok(map);
	}
	@PostMapping(value="/frm")
	public ResponseEntity<Integer> insertNotice(@ModelAttribute NoticeDTO notice,
													@ModelAttribute MultipartFile[] noticeFile){
		
		List<NoticeFileDTO> noticeFileList = new ArrayList<NoticeFileDTO>();
		
		if(noticeFile != null) {
			String savepath = root + "/notice/";
			for(MultipartFile file : noticeFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.upload(savepath, file);
				NoticeFileDTO fileDTO = new NoticeFileDTO();
				fileDTO.setFilename(filename);
				fileDTO.setFilepath(filepath);
				noticeFileList.add(fileDTO);
			}
		}
		int result = noticeService.insertNotice(notice, noticeFileList);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value="/detail/{noticeNo}")
	public ResponseEntity<NoticeDTO> selectOneNotice(@PathVariable int noticeNo){
		NoticeDTO notice = noticeService.selectOneNotice(noticeNo);
		return ResponseEntity.ok(notice);
	}
	@DeleteMapping(value="/delete/{noticeNo}")
	public ResponseEntity<Integer> deleteNotice(@PathVariable int noticeNo){
		NoticeDTO notice = noticeService.deleteNotice(noticeNo);
		if(notice==null) {
			return ResponseEntity.ok(0);
		}else {
			if(!notice.getNoticeFileList().isEmpty()) {
				String savepath = root + "/notice/";
				for(NoticeFileDTO fileDTO : notice.getNoticeFileList()) {
					File delFile = new File(savepath);
					delFile.delete();
				}
			}
			return ResponseEntity.ok(1);
		}
	}
	@PatchMapping(value="/update")
	public ResponseEntity<Integer> updateNotice(@ModelAttribute NoticeDTO notice, @ModelAttribute MultipartFile[] noticeFile){
		List<NoticeFileDTO> noticeFileList = new ArrayList<NoticeFileDTO>();
		if(noticeFile != null) {
			String savepath = root + "/notice/";
			for(MultipartFile file : noticeFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.upload(savepath, file);
				NoticeFileDTO fileDTO = new NoticeFileDTO();
				fileDTO.setFilename(filename);
				fileDTO.setFilepath(filepath);
				fileDTO.setNoticeNo(notice.getNoticeNo());
				noticeFileList.add(fileDTO);
			}
		}
		NoticeDTO nd = noticeService.updateNotice(notice,noticeFileList);
		
		if(nd.getNoticeFileList() != null) {
			String savepath = root + "/board/";
			for(NoticeFileDTO delFile : nd.getNoticeFileList()) {
				File delNoticeFile = new File(savepath+delFile.getFilepath());
				delNoticeFile.delete();
			}
		}
		
		return ResponseEntity.ok(1);
	}
	
	
}
