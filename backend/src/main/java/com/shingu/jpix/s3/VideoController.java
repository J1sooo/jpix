package com.shingu.jpix.s3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VideoController {
    @Autowired
    VideoService videoService;

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@ModelAttribute VideoSaveDto dto) {
        String imageUrl = videoService.saveVideo(dto.getImage(), "img");
        return new ResponseEntity<>(imageUrl, HttpStatus.OK);
    }
}
