package com.shingu.jpix.service;

import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.repository.BoardRepository;
import com.shingu.jpix.s3.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private VideoService videoService;
    // 글 작성 처리
    public void write(Board board, MultipartFile file) throws Exception{
        String url = videoService.saveVideo(file, "file");
        board.setFilepath(url);
        boardRepository.save(board);
    }

    // 게시글 리스트 처리
    public List<Board> boardList(int id){
        if(id < 0) return boardRepository.BoardList();
        else return  boardRepository.BoardListWithId(id);

    }

    // 특정 게시글 불러오기
    public Board boardView(int id) {
        return boardRepository.findById(id).get();
    }

    public Board boardModify(int id, String title, String content, MultipartFile file) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));

        board.setTitle(title);
        board.setContent(content);

        if (file != null && !file.isEmpty()) {
            // 새 파일이 업로드된 경우
            String url = videoService.saveVideo(file, "file");
            board.setFilepath(url);
        } else {
            // 파일이 업로드되지 않은 경우 기존 파일을 유지하도록 처리
            if (board.getFilepath() == null || board.getFilepath().isEmpty()) {
                // 기존에 파일이 없는 경우의 처리
                board.setFilepath(null); // 혹은 기존 파일 경로 유지 로직 추가
            }
        }

        return boardRepository.save(board);
    }


    // 특정 게시글 삭제
    public void boardDelete(Integer id) {
        boardRepository.deleteById(id);
    }



    public Board findBoardById(Integer id) {
        Optional<Board> boardOptional = boardRepository.findById(id);
        return boardOptional.orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다. ID: " + id));
    }
}
