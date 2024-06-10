package com.shingu.jpix.Controller;

import com.shingu.jpix.domain.dto.JoinRequest;
import com.shingu.jpix.domain.dto.LoginRequest;
import com.shingu.jpix.domain.dto.UserResponseDTO;
import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.service.UserDetailService;
import com.shingu.jpix.service.UserService;
import com.shingu.jpix.util.response.ResponseHandler;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserDetailService userDetailService;

    @PostMapping("/join")
    public ResponseEntity<User> join(@Valid @RequestBody JoinRequest joinRequest, BindingResult bindingResult) {

        // loginId 중복 체크
        if(userService.checkLoginIdDuplicate(joinRequest.getEmail())) {
            System.out.println("에러");
            bindingResult.addError(new FieldError("joinRequest", "email", "로그인 아이디가 중복됩니다."));
        }
        // 닉네임 중복 체크
        if(userService.checkNicknameDuplicate(joinRequest.getNickname())) {
            bindingResult.addError(new FieldError("joinRequest", "nickname", "닉네임이 중복됩니다."));
        }

        User user = userService.join(joinRequest);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<Object> getMyInfo(Principal principal) {
        try {
            User user = (User) userDetailService.loadUserByUsername(principal.getName());
            UserResponseDTO dto = UserResponseDTO.toMeDTO(user);
            return ResponseHandler.responseBuilder(
                    HttpStatus.OK,
                    null,
                    dto
            );
        } catch (Exception e) {
            return ResponseHandler.responseBuilder(
                    HttpStatus.OK,
                    null,
                    false
            );
        }

    }

}


