// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.system.controller;

import com.javaweb.common.enums.LogType;
import com.javaweb.system.common.BaseController;
import com.javaweb.system.entity.DictData;
import com.javaweb.system.query.DictDataQuery;
import com.javaweb.system.service.IDictDataService;
import com.javaweb.common.annotation.Log;
import com.javaweb.common.utils.JsonResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 字典项管理表 前端控制器
 * </p>
 *
 * @author yzs113
 * @since 2021-07-06
 */
@RestController
@RequestMapping("/dictdata")
public class DictDataController extends BaseController {

    @Autowired
    private IDictDataService dictDataService;

    /**
     * 获取数据列表
     *
     * @param query 查询条件
     * @return
     */
    @RequiresPermissions("sys:dictdata:index")
    @GetMapping("/index")
    public JsonResult index(DictDataQuery query) {
        return dictDataService.getList(query);
    }

    /**
     * 添加记录
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "字典项管理表", logType = LogType.INSERT)
    @RequiresPermissions("sys:dictdata:add")
    @PostMapping("/add")
    public JsonResult add(@RequestBody DictData entity) {
        return dictDataService.edit(entity);
    }

    /**
     * 获取详情
     *
     * @param dictdataId 记录ID
     * @return
     */
    @GetMapping("/info/{dictdataId}")
    public JsonResult info(@PathVariable("dictdataId") Integer dictdataId) {
        return dictDataService.info(dictdataId);
    }

    /**
     * 更新记录
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "字典项管理表", logType = LogType.UPDATE)
    @RequiresPermissions("sys:dictdata:edit")
    @PutMapping("/edit")
    public JsonResult edit(@RequestBody DictData entity) {
        return dictDataService.edit(entity);
    }

    /**
     * 删除记录
     *
     * @param dictdataIds 记录ID
     * @return
     */
    @Log(title = "字典项管理表", logType = LogType.DELETE)
    @RequiresPermissions("sys:dictdata:drop")
    @DeleteMapping("/delete/{dictdataIds}")
    public JsonResult delete(@PathVariable("dictdataIds") Integer[] dictdataIds) {
        return dictDataService.deleteByIds(dictdataIds);
    }

    /**
     * 设置状态
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "字典项管理表", logType = LogType.STATUS)
    @RequiresPermissions("sys:dictdata:status")
    @PutMapping("/setStatus")
    public JsonResult setStatus(@RequestBody DictData entity) {
        return dictDataService.setStatus(entity);
    }
}