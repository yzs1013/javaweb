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
import com.javaweb.system.entity.Submitted;
import com.javaweb.system.query.SubmittedQuery;
import com.javaweb.system.service.ISubmittedService;
import com.javaweb.common.annotation.Log;
import com.javaweb.common.utils.JsonResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 信息上报 前端控制器
 * </p>
 *
 * @author yzs1013
 * @since 2021-07-09
 */
@RestController
@RequestMapping("/submitted")
public class SubmittedController extends BaseController {

    @Autowired
    private ISubmittedService submittedService;

    /**
     * 获取数据列表
     *
     * @param query 查询条件
     * @return
     */
    @RequiresPermissions("sys:submitted:index")
    @GetMapping("/index")
    public JsonResult index(SubmittedQuery query) {
        return submittedService.getList(query);
    }

    /**
     * 添加记录
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "信息上报", logType = LogType.INSERT)
    @RequiresPermissions("sys:submitted:add")
    @PostMapping("/add")
    public JsonResult add(@RequestBody Submitted entity) {
        return submittedService.edit(entity);
    }

    /**
     * 获取详情
     *
     * @param submittedId 记录ID
     * @return
     */
    @GetMapping("/info/{submittedId}")
    public JsonResult info(@PathVariable("submittedId") Integer submittedId) {
        return submittedService.info(submittedId);
    }

    /**
     * 更新记录
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "信息上报", logType = LogType.UPDATE)
    @RequiresPermissions("sys:submitted:edit")
    @PutMapping("/edit")
    public JsonResult edit(@RequestBody Submitted entity) {
        return submittedService.edit(entity);
    }

    /**
     * 删除记录
     *
     * @param submittedIds 记录ID
     * @return
     */
    @Log(title = "信息上报", logType = LogType.DELETE)
    @RequiresPermissions("sys:submitted:drop")
    @DeleteMapping("/delete/{submittedIds}")
    public JsonResult delete(@PathVariable("submittedIds") Integer[] submittedIds) {
        return submittedService.deleteByIds(submittedIds);
    }

    /**
     * 设置是否启用
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "信息上报", logType = LogType.STATUS)
    @RequiresPermissions("sys:submitted:status")
    @PutMapping("/setStatus")
    public JsonResult setStatus(@RequestBody Submitted entity) {
        return submittedService.setStatus(entity);
    }
}