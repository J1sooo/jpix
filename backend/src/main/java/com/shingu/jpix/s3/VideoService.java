package com.shingu.jpix.s3;

import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VideoService {

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucketName;
    private final S3Template s3Template;

    // 이미지 여러개 업로드
    @Transactional
    public List<String> saveManyImage(VideoSaveDto saveDto, String saveDir) {
        List<String> resultList = new ArrayList<>();

        for (MultipartFile multipartFile : saveDto.getImages()) {
            String value = saveVideo(multipartFile, saveDir);
            resultList.add(value);
        }

        return resultList;
    }

    // 이미지 1개 업로드
    @Transactional
    public String saveVideo(MultipartFile multipartFile, String saveDir) {
        String fileName = multipartFile.getOriginalFilename();
        String FileExt = fileName.substring(fileName.lastIndexOf("."));
        String uuidName = UUID.randomUUID() + FileExt;

//        if (!Objects.requireNonNull(multipartFile.getContentType()).contains("image/")) {
//            throw new IllegalArgumentException("허용되지 않는 형식의 파일입니다: " + multipartFile.getContentType());
//        }

        String saveDirWithUuidName = saveDir + "/" + uuidName;

        try {
            InputStream is = multipartFile.getInputStream();
            S3Resource s3Resource = s3Template.upload(bucketName, saveDirWithUuidName, is, ObjectMetadata.builder().contentType(multipartFile.getContentType()).build());

            return s3Resource.getURL().toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}