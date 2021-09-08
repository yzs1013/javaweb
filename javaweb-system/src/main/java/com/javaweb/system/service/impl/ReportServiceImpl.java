// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.system.service.impl;

import cn.hutool.core.convert.Convert;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.javaweb.common.config.CommonConfig;
import com.javaweb.common.utils.CommonUtils;
import com.javaweb.system.common.BaseQuery;
import com.javaweb.system.common.BaseServiceImpl;
import com.javaweb.system.constant.ReportConstant;
import com.javaweb.system.entity.Report;
import com.javaweb.system.mapper.ReportMapper;
import com.javaweb.system.query.ReportQuery;
import com.javaweb.system.service.IReportService;
import com.javaweb.system.utils.ShiroUtils;
import com.javaweb.system.vo.report.ReportInfoVo;
import com.javaweb.system.vo.report.ReportListVo;
import com.javaweb.common.utils.DateUtils;
import com.javaweb.common.utils.JsonResult;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.util.*;

/**
  * <p>
  * 信息浏览 服务类实现
  * </p>
  *
  * @author yzs1013
  * @since 2021-07-09
  */
@Service
public class ReportServiceImpl extends BaseServiceImpl<ReportMapper, Report> implements IReportService {

    @Autowired
    private ReportMapper reportMapper;

    /**
     * 获取数据列表
     *
     * @param query 查询条件
     * @return
     */
    @Override
    public JsonResult getList(BaseQuery query) {
        ReportQuery reportQuery = (ReportQuery) query;
        // 查询条件
        QueryWrapper<Report> queryWrapper = new QueryWrapper<>();
        // 标题
        if (!StringUtils.isEmpty(reportQuery.getTitle())) {
            queryWrapper.like("title", reportQuery.getTitle());
        }
        // 是否启用: 1启用  2停用
        if (!StringUtils.isEmpty(reportQuery.getStatus())) {
            queryWrapper.eq("status", reportQuery.getStatus());
        }
        queryWrapper.eq("mark", 1);
        queryWrapper.orderByDesc("id");

        // 获取数据列表
        IPage<Report> page = new Page<>(reportQuery.getPage(), reportQuery.getLimit());
        IPage<Report> pageData = reportMapper.selectPage(page, queryWrapper);
        pageData.convert(x -> {
            ReportListVo reportListVo = Convert.convert(ReportListVo.class, x);
            // 媒体类型描述
            if (reportListVo.getMedtype() != null && reportListVo.getMedtype() > 0) {
                reportListVo.setMedtypeName(ReportConstant.REPORT_MEDTYPE_LIST.get(reportListVo.getMedtype()));
            }
            // 信息类型描述
            if (reportListVo.getInfotype() != null && reportListVo.getInfotype() > 0) {
                reportListVo.setInfotypeName(ReportConstant.REPORT_INFOTYPE_LIST.get(reportListVo.getInfotype()));
            }
            // 等级舆情描述
            if (reportListVo.getGrade() != null && reportListVo.getGrade() > 0) {
                reportListVo.setGradeName(ReportConstant.REPORT_GRADE_LIST.get(reportListVo.getGrade()));
            }
            // 领域类型描述
            if (reportListVo.getDomaintype() != null && reportListVo.getDomaintype() > 0) {
                reportListVo.setDomaintypeName(ReportConstant.REPORT_DOMAINTYPE_LIST.get(reportListVo.getDomaintype()));
            }
            // 发送对象描述
            if (reportListVo.getSendtoa() != null && reportListVo.getSendtoa() > 0) {
                reportListVo.setSendtoaName(ReportConstant.REPORT_SENDTOA_LIST.get(reportListVo.getSendtoa()));
            }
            // 所属地域描述
            if (reportListVo.getCity() != null && reportListVo.getCity() > 0) {
                reportListVo.setCityName(ReportConstant.REPORT_CITY_LIST.get(reportListVo.getCity()));
            }
            // 是否启用描述
            if (reportListVo.getStatus() != null && reportListVo.getStatus() > 0) {
                reportListVo.setStatusName(ReportConstant.REPORT_STATUS_LIST.get(reportListVo.getStatus()));
            }
            return reportListVo;
        });
        return JsonResult.success(pageData);
    }

    /**
     * 获取详情Vo
     *
     * @param id 记录ID
     * @return
     */
    @Override
    public Object getInfo(Serializable id) {
        Report entity = (Report) super.getInfo(id);
        // 返回视图Vo
        ReportInfoVo reportInfoVo = new ReportInfoVo();
        // 拷贝属性
        BeanUtils.copyProperties(entity, reportInfoVo);
        return reportInfoVo;
    }

    /**
     * 添加、更新记录
     *
     * @param entity 实体对象
     * @return
     */
    @Override
    public JsonResult edit(Report entity) {
        if (entity.getId() != null && entity.getId() > 0) {
            entity.setUpdateUser(1);
            entity.setUpdateTime(DateUtils.now());
        } else {
            entity.setCreateUser(1);
            entity.setCreateTime(DateUtils.now());
        }
        return super.edit(entity);
    }

    /**
     * 删除记录
     *
     * @param entity 实体对象
     * @return
     */
    @Override
    public JsonResult delete(Report entity) {
        entity.setUpdateUser(1);
        entity.setUpdateTime(DateUtils.now());
        entity.setMark(0);
        return super.delete(entity);
    }

    /**
     * 设置是否启用
     *
     * @param entity 实体对象
     * @return
     */
    @Override
    public JsonResult setStatus(Report entity) {
        if (entity.getId() == null || entity.getId() <= 0) {
            return JsonResult.error("记录ID不能为空");
        }
        if (entity.getStatus() == null) {
            return JsonResult.error("记录是否启用不能为空");
        }
        return super.setStatus(entity);
    }

}