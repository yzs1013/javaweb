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
 * 信息上报查询条件
 * </p>
 *
 * @author yzs1013
 * @since 2021-07-09
 */
@Data
public class SubmittedQuery extends BaseQuery {

    /**
     * 标题
     */
    private String title;

    /**
     * 是否启用: 1启用  2停用
     */
    private Integer status;

}
