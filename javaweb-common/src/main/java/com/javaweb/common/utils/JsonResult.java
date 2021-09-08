// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.common.utils;

import com.javaweb.common.constant.CommonConstants;

import java.io.Serializable;

/**
 * JSON回应类
 *
 * @author 牧羊人
 * @date 2019/11/28
 */
public class JsonResult<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 成功
     */
    public static final int SUCCESS = 0;//CommonConstants.SUCCESS;

    /**
     * 失败
     */
    public static final int error = CommonConstants.FAIL;

    private int code;

    private String msg;

    private T data;

    public static <T> JsonResult<T> success() {
        return jsonResult(null, SUCCESS, "操作成功");
    }

    public static <T> JsonResult<T> success(T data) {
        return jsonResult(data, SUCCESS, "操作成功");
    }

    public static <T> JsonResult<T> success(T data, String msg) {
        return jsonResult(data, SUCCESS, msg);
    }

    public static <T> JsonResult<T> error() {
        return jsonResult(null, error, "操作失败");
    }

    public static <T> JsonResult<T> error(String msg) {
        return jsonResult(null, error, msg);
    }

    public static <T> JsonResult<T> error(T data) {
        return jsonResult(data, error, "操作失败");
    }

    public static <T> JsonResult<T> error(T data, String msg) {
        return jsonResult(data, error, msg);
    }

    public static <T> JsonResult<T> error(int code, String msg) {
        return jsonResult(null, code, msg);
    }

    private static <T> JsonResult<T> jsonResult(T data, int code, String msg) {
        JsonResult<T> result = new JsonResult<>();
        result.setCode(code);
        result.setData(data);
        result.setMsg(msg);
        return result;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
