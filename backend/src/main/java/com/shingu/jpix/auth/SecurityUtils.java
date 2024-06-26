package com.shingu.jpix.auth;


import com.shingu.jpix.util.exception.UnauthorizedAccessException;

public class SecurityUtils {
    public static Object checkAuthenticationPrincipal(Object principal) {
        if ("anonymousUser".equals(principal)) {
            throw new UnauthorizedAccessException("인증에 실패하였습니다.");
        }
        return principal;
    }
}