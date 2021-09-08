// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.system.mapper;

import com.javaweb.system.entity.Role;
import com.javaweb.system.entity.UserRole;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 * 人员角色表 Mapper 接口
 * </p>
 *
 * @author 鲲鹏
 * @since 2020-10-30
 */
public interface UserRoleMapper extends BaseMapper<UserRole> {

    /**
     * 根据用户ID获取角色
     *
     * @param userId 用户ID
     * @return
     */
    List<Role> getRolesByUserId(Integer userId);

}
