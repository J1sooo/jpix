package com.shingu.jpix.util.exception;

public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException(String msg) {
        super(msg);
    }
}