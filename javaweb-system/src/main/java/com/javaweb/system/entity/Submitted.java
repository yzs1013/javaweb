// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.system.entity;

import com.baomidou.mybatisplus.annotation.TableName;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.javaweb.system.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


/**
 * <p>
 * 信息上报
 * </p>
 *
 * @author yzs1013
 * @since 2021-07-09
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("sys_submitted")
public class Submitted extends BaseEntity {

    private static final long serialVersionUID = 1L;

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
    private Integer status;

    /**
     * 媒体类型: 1网站 2论坛 3博客 4微博 5纸媒 6微信 7App
     */
    private Integer medtype;

    /**
     * 信息类型: 1原文 2动态 3卖报
     */
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
    private Integer city;

}