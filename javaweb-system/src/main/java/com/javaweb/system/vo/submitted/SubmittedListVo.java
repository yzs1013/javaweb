// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.system.vo.submitted;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

/**
 * <p>
 * 信息上报列表Vo
 * </p>
 *
 * @author yzs1013
 * @since 2021-07-09
 */
@Data
public class SubmittedListVo {

    /**
    * 信息上报ID
    */
    private Integer id;

    /**
     * 标题
     */
    private String title;

    /**
     * 原文链接
     */
    private String sourceurl;

    /**
     * 是否启用: 1启用  2停用
     */

    /**
    * 是否启用描述
    */
    private String statusName;

    private Integer status;

    /**
     * 媒体类型: 1网站 2论坛 3博客 4微博 5纸媒 6微信 7App
     */

    /**
    * 媒体类型描述
    */
    private String medtypeName;

    private Integer medtype;

    /**
     * 信息类型: 1原文 2动态 3卖报
     */

    /**
    * 信息类型描述
    */
    private String infotypeName;

    private Integer infotype;

    /**
     * 刊发时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date filetime;

    /**
     * 报送单位
     */
    private String workunit;

    /**
     * 报送人
     */
    private Integer uid;

    /**
     * 专题选择
     */
    private Integer specialId;

    /**
     * 领域类型: 1时政 2经济 3文化理论 4其他
     */

    /**
    * 领域类型描述
    */
    private String domaintypeName;

    private Integer domaintype;

    /**
     * 正文
     */
    private String content;

    /**
     * 附件
     */
    private String attachment;

    /**
     * 浏览数
     */
    private Integer views;

    /**
     * 回复数
     */
    private Integer replies;

    /**
     * 采用类型
     */
    private String caiyong;

    /**
     * 加分
     */
    private Integer jiafen;

    /**
     * 所属地域: 1南宁 2柳州 3桂林 4梧州 5北海 6防城港 7钦州 8贵港 9玉林 10百色 11贺州 12河池 13崇左
     */

    /**
    * 所属地域描述
    */
    private String cityName;

    private Integer city;

    /**
     * 添加人
     */
    private Integer createUser;

    /**
     * 添加时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /**
     * 更新人
     */
    private Integer updateUser;

    /**
     * 更新时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    /**
     * 有效标识
     */
    private Integer mark;

}