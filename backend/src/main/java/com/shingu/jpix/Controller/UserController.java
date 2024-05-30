package com.shingu.jpix.Controller;

import com.shingu.jpix.domain.dto.JoinRequest;
import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.service.UserService;
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
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/join")
    public String joinPage(Model model) {

        model.addAttribute("joinRequest", new JoinRequest());
        return "join";
    }

    @PostMapping("/join")
    public ResponseEntity<User> join(@Valid @RequestBody JoinRequest joinRequest, BindingResult bindingResult) {

//        // loginId 중복 체크
//        if(userService.checkLoginIdDuplicate(joinRequest.getEmail())) {
//            bindingResult.addError(new FieldError("joinRequest", "email", "로그인 아이디가 중복됩니다."));
//        }
//        // 닉네임 중복 체크
//        if(userService.checkNicknameDuplicate(joinRequest.getNickname())) {
//            bindingResult.addError(new FieldError("joinRequest", "nickname", "닉네임이 중복됩니다."));
//        }
//        // password와 passwordCheck가 같은지 체크
//        if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
//            bindingResult.addError(new FieldError("joinRequest", "passwordCheck", "바밀번호가 일치하지 않습니다."));
//        }


        User user = userService.join(joinRequest);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
