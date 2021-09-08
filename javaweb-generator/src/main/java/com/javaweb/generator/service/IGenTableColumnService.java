// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.generator.service;

import com.javaweb.generator.entity.GenTableColumn;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 代码生成业务表字段 服务类
 * </p>
 *
 * @author 鲲鹏
 * @since 2020-11-06
 */
public interface IGenTableColumnService extends IService<GenTableColumn> {

    /**
     * 查询表字段信息
     *
     * @param tableId 表ID
     * @return
     */
    List<GenTableColumn> selectGenTableColumnListByTableId(Integer tableId);

}
