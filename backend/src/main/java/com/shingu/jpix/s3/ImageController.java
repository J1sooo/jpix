package com.shingu.jpix.s3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {
    @Autowired
    ImageService imageService;

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@ModelAttribute ImageSaveDto dto) {
        String imageUrl = imageService.saveImage(dto.getImage(), "img");
        return new ResponseEntity<>(imageUrl, HttpStatus.OK);
    }
}
