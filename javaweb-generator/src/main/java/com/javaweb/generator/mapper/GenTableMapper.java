// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.generator.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.javaweb.generator.entity.GenTable;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.javaweb.generator.query.GenTableQuery;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * <p>
 * 代码生成业务表 Mapper 接口
 * </p>
 *
 * @author 鲲鹏
 * @since 2020-11-06
 */
public interface GenTableMapper extends BaseMapper<GenTable> {

    /**
     * 获取业务表列表
     *
     * @param page  分页信息
     * @param param 参数
     * @return
     */
    IPage<GenTable> selectGenTableList(IPage<GenTable> page, @RequestParam("param") GenTableQuery param);

    /**
     * 获取数据库表
     *
     * @param page  分页信息
     * @param param 查询条件
     * @return
     */
    IPage<GenTable> selectDbTableList(IPage<GenTable> page, @RequestParam("param") GenTableQuery param);

    /**
     * 根据表明获取数据库列表
     *
     * @param tableNames 数据库名
     * @return
     */
    List<GenTable> selectDbTableListByNames(String[] tableNames);

    /**
     * 插入数据表
     *
     * @param genTable 待生成数据表
     * @return
     */
    int insertGenTable(GenTable genTable);

    /**
     * 根据表ID获取表信息
     *
     * @param tableId 表ID
     * @return
     */
    GenTable selectGenTableById(Integer tableId);

    /**
     * 修改业务表信息
     *
     * @param genTable 业务表
     * @return
     */
    int updateGenTable(GenTable genTable);


    /**
     * 根据表名查询业务表
     *
     * @param tableName 表名
     * @return
     */
    GenTable selectGenTableByName(String tableName);

}
