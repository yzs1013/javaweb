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
import com.javaweb.system.constant.SubmittedConstant;
import com.javaweb.system.entity.Submitted;
import com.javaweb.system.mapper.SubmittedMapper;
import com.javaweb.system.query.SubmittedQuery;
import com.javaweb.system.service.ISubmittedService;
import com.javaweb.system.utils.ShiroUtils;
import com.javaweb.system.vo.submitted.SubmittedInfoVo;
import com.javaweb.system.vo.submitted.SubmittedListVo;
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
  * 信息上报 服务类实现
  * </p>
  *
  * @author yzs1013
  * @since 2021-07-09
  */
@Service
public class SubmittedServiceImpl extends BaseServiceImpl<SubmittedMapper, Submitted> implements ISubmittedService {

    @Autowired
    private SubmittedMapper submittedMapper;

    /**
     * 获取数据列表
     *
     * @param query 查询条件
     * @return
     */
    @Override
    public JsonResult getList(BaseQuery query) {
        SubmittedQuery submittedQuery = (SubmittedQuery) query;
        // 查询条件
        QueryWrapper<Submitted> queryWrapper = new QueryWrapper<>();
        // 标题
        if (!StringUtils.isEmpty(submittedQuery.getTitle())) {
            queryWrapper.like("title", submittedQuery.getTitle());
        }
        // 是否启用: 1启用  2停用
        if (!StringUtils.isEmpty(submittedQuery.getStatus())) {
            queryWrapper.eq("status", submittedQuery.getStatus());
        }
        queryWrapper.eq("mark", 1);
        queryWrapper.orderByDesc("id");

        // 获取数据列表
        IPage<Submitted> page = new Page<>(submittedQuery.getPage(), submittedQuery.getLimit());
        IPage<Submitted> pageData = submittedMapper.selectPage(page, queryWrapper);
        pageData.convert(x -> {
            SubmittedListVo submittedListVo = Convert.convert(SubmittedListVo.class, x);
            // 是否启用描述
            if (submittedListVo.getStatus() != null && submittedListVo.getStatus() > 0) {
                submittedListVo.setStatusName(SubmittedConstant.SUBMITTED_STATUS_LIST.get(submittedListVo.getStatus()));
            }
            // 媒体类型描述
            if (submittedListVo.getMedtype() != null && submittedListVo.getMedtype() > 0) {
                submittedListVo.setMedtypeName(SubmittedConstant.SUBMITTED_MEDTYPE_LIST.get(submittedListVo.getMedtype()));
            }
            // 信息类型描述
            if (submittedListVo.getInfotype() != null && submittedListVo.getInfotype() > 0) {
                submittedListVo.setInfotypeName(SubmittedConstant.SUBMITTED_INFOTYPE_LIST.get(submittedListVo.getInfotype()));
            }
            // 领域类型描述
            if (submittedListVo.getDomaintype() != null && submittedListVo.getDomaintype() > 0) {
                submittedListVo.setDomaintypeName(SubmittedConstant.SUBMITTED_DOMAINTYPE_LIST.get(submittedListVo.getDomaintype()));
            }
            // 所属地域描述
            if (submittedListVo.getCity() != null && submittedListVo.getCity() > 0) {
                submittedListVo.setCityName(SubmittedConstant.SUBMITTED_CITY_LIST.get(submittedListVo.getCity()));
            }
            return submittedListVo;
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
        Submitted entity = (Submitted) super.getInfo(id);
        // 返回视图Vo
        SubmittedInfoVo submittedInfoVo = new SubmittedInfoVo();
        // 拷贝属性
        BeanUtils.copyProperties(entity, submittedInfoVo);
        return submittedInfoVo;
    }

    /**
     * 添加、更新记录
     *
     * @param entity 实体对象
     * @return
     */
    @Override
    public JsonResult edit(Submitted entity) {
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
    public JsonResult delete(Submitted entity) {
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
    public JsonResult setStatus(Submitted entity) {
        if (entity.getId() == null || entity.getId() <= 0) {
            return JsonResult.error("记录ID不能为空");
        }
        if (entity.getStatus() == null) {
            return JsonResult.error("记录是否启用不能为空");
        }
        return super.setStatus(entity);
    }

}