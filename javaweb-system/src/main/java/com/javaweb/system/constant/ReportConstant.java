// +----------------------------------------------------------------------
// | JavaWeb混编版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.system.constant;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 * 信息浏览 模块常量
 * </p>
 *
 * @author yzs1013
 * @since 2021-07-09
 */
public class ReportConstant {

    /**
     * 媒体类型
     */
    public static Map<Integer, String> REPORT_MEDTYPE_LIST = new HashMap<Integer, String>() {
        {
            put(1, "网站");
            put(2, "论坛");
            put(3, "博客");
            put(4, "微博");
            put(5, "纸媒");
            put(6, "微信");
            put(7, "App");
        }
    };
    /**
     * 信息类型
     */
    public static Map<Integer, String> REPORT_INFOTYPE_LIST = new HashMap<Integer, String>() {
        {
            put(1, "原文");
            put(2, "动态");
            put(3, "卖报");
        }
    };
    /**
     * 等级舆情
     */
    public static Map<Integer, String> REPORT_GRADE_LIST = new HashMap<Integer, String>() {
        {
            put(1, "Ⅰ级信息");
            put(2, "Ⅱ级信息");
            put(3, "Ⅲ级信息");
        }
    };
    /**
     * 领域类型
     */
    public static Map<Integer, String> REPORT_DOMAINTYPE_LIST = new HashMap<Integer, String>() {
        {
            put(1, "时政");
            put(2, "经济");
            put(3, "文化理论");
            put(4, "其他");
        }
    };
    /**
     * 发送对象
     */
    public static Map<Integer, String> REPORT_SENDTOA_LIST = new HashMap<Integer, String>() {
        {
            put(1, "区政府");
            put(2, "区宣传部");
            put(3, "区网信办");
            put(4, "中宣部");
            put(5, "中央网信办");
        }
    };
    /**
     * 所属地域
     */
    public static Map<Integer, String> REPORT_CITY_LIST = new HashMap<Integer, String>() {
        {
            put(11, "贺州");
            put(12, "河池");
            put(13, "崇左");
            put(1, "南宁");
            put(2, "柳州");
            put(3, "桂林");
            put(4, "梧州");
            put(5, "北海");
            put(6, "防城港");
            put(7, "钦州");
            put(8, "贵港");
            put(9, "玉林");
            put(10, "百色");
        }
    };
    /**
     * 是否启用
     */
    public static Map<Integer, String> REPORT_STATUS_LIST = new HashMap<Integer, String>() {
        {
            put(1, "启用");
            put(2, "停用");
        }
    };
}