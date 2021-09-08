// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.admin.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 会员列表Vo
 */
@Data
public class MemberListVo {

    /**
     * 用户ID
     */
    private Integer id;

    /**
     * 用户唯一标识
     */
    private String openid;

    /**
     * 手机号
     */
    private String mobile;

    /**
     * 密码
     */
    private String password;

    /**
     * 会员等级
     */
    private Integer memberLevel;

    /**
     * 真实姓名
     */
    private String realname;

    /**
     * 用户昵称
     */
    private String nickname;

    /**
     * 性别（1男 2女 3未知）
     */
    private Integer gender;

    /**
     * 用户头像
     */
    private String avatar;

    /**
     * 出生日期
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date birthday;

    /**
     * 户籍省份编号
     */
    private String provinceCode;

    /**
     * 户籍城市编号
     */
    private String cityCode;

    /**
     * 户籍区/县编号
     */
    private String districtCode;

    /**
     * 详细地址
     */
    private String address;

    /**
     * 城市集合
     */
    private String[] city;

    /**
     * 个人简介
     */
    private String intro;

    /**
     * 个性签名
     */
    private String signature;

    /**
     * 设备类型：1苹果 2安卓 3WAP站 4PC站 5后台添加
     */
    private Integer device;

    /**
     * 设备编号
     */
    private String deviceCode;

    /**
     * 推送的别名
     */
    private String pushAlias;

    /**
     * 用户状态(1登录 2登出)
     */
    private Integer loginStatus;

    /**
     * 来源：1、APP注册；2、后台添加；
     */
    private Integer source;

    /**
     * 是否启用 1、启用  2、停用
     */
    private Integer status;

    /**
     * 客户端版本号
     */
    private String appVersion;

    /**
     * 我的推广码
     */
    private String code;

    /**
     * 上次登录时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date loginTime;

    /**
     * 最近登录IP
     */
    private String loginIp;

    /**
     * 上次登录地点
     */
    private String loginRegion;

    /**
     * 登录总次数
     */
    private Integer loginCount;

    /**
     * 添加人
     */
    private Integer createUser;

    /**
     * 创建时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    /**
     * 更新人
     */
    private Integer updateUser;

    /**
     * 更新时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    /**
     * 有效标识
     */
    private Integer mark;

}
