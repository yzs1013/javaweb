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
import com.javaweb.system.entity.Report;
import com.javaweb.system.query.ReportQuery;
import com.javaweb.system.service.IReportService;
import com.javaweb.common.annotation.Log;
import com.javaweb.common.utils.JsonResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 信息浏览 前端控制器
 * </p>
 *
 * @author yzs1013
 * @since 2021-07-09
 */
@RestController
@RequestMapping("/report")
public class ReportController extends BaseController {

    @Autowired
    private IReportService reportService;

    /**
     * 获取数据列表
     *
     * @param query 查询条件
     * @return
     */
    @RequiresPermissions("sys:report:index")
    @GetMapping("/index")
    public JsonResult index(ReportQuery query) {
        return reportService.getList(query);
    }

    /**
     * 添加记录
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "信息浏览", logType = LogType.INSERT)
    @RequiresPermissions("sys:report:add")
    @PostMapping("/add")
    public JsonResult add(@RequestBody Report entity) {
        return reportService.edit(entity);
    }

    /**
     * 获取详情
     *
     * @param reportId 记录ID
     * @return
     */
    @GetMapping("/info/{reportId}")
    public JsonResult info(@PathVariable("reportId") Integer reportId) {
        return reportService.info(reportId);
    }

    /**
     * 更新记录
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "信息浏览", logType = LogType.UPDATE)
    @RequiresPermissions("sys:report:edit")
    @PutMapping("/edit")
    public JsonResult edit(@RequestBody Report entity) {
        return reportService.edit(entity);
    }

    /**
     * 删除记录
     *
     * @param reportIds 记录ID
     * @return
     */
    @Log(title = "信息浏览", logType = LogType.DELETE)
    @RequiresPermissions("sys:report:drop")
    @DeleteMapping("/delete/{reportIds}")
    public JsonResult delete(@PathVariable("reportIds") Integer[] reportIds) {
        return reportService.deleteByIds(reportIds);
    }

    /**
     * 设置是否启用
     *
     * @param entity 实体对象
     * @return
     */
    @Log(title = "信息浏览", logType = LogType.STATUS)
    @RequiresPermissions("sys:report:status")
    @PutMapping("/setStatus")
    public JsonResult setStatus(@RequestBody Report entity) {
        return reportService.setStatus(entity);
    }
}