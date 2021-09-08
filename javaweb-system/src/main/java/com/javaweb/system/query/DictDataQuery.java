// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.system.query;

import com.javaweb.system.common.BaseQuery;
import lombok.Data;

/**
 * <p>
 * 字典项管理表查询条件
 * </p>
 *
 * @author yzs113
 * @since 2021-07-06
 */
@Data
public class DictDataQuery extends BaseQuery {

    /**
     * 字典项名称
     */
    private String name;

    /**
     * 状态：1在用 2停用
     */
    private Integer status;

}
