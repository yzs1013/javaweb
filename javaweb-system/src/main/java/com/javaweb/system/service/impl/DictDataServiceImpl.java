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
import com.javaweb.system.constant.DictDataConstant;
import com.javaweb.system.entity.DictData;
import com.javaweb.system.mapper.DictDataMapper;
import com.javaweb.system.query.DictDataQuery;
import com.javaweb.system.service.IDictDataService;
import com.javaweb.system.utils.ShiroUtils;
import com.javaweb.system.vo.dictdata.DictDataInfoVo;
import com.javaweb.system.vo.dictdata.DictDataListVo;
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
  * 字典项管理表 服务类实现
  * </p>
  *
  * @author yzs113
  * @since 2021-07-06
  */
@Service
public class DictDataServiceImpl extends BaseServiceImpl<DictDataMapper, DictData> implements IDictDataService {

    @Autowired
    private DictDataMapper dictDataMapper;

    /**
     * 获取数据列表
     *
     * @param query 查询条件
     * @return
     */
    @Override
    public JsonResult getList(BaseQuery query) {
        DictDataQuery dictDataQuery = (DictDataQuery) query;
        // 查询条件
        QueryWrapper<DictData> queryWrapper = new QueryWrapper<>();
        // 字典项名称
        if (!StringUtils.isEmpty(dictDataQuery.getName())) {
            queryWrapper.like("name", dictDataQuery.getName());
        }
        // 状态：1在用 2停用
        if (!StringUtils.isEmpty(dictDataQuery.getStatus())) {
            queryWrapper.eq("status", dictDataQuery.getStatus());
        }
        queryWrapper.eq("mark", 1);
        queryWrapper.orderByDesc("id");

        // 获取数据列表
        IPage<DictData> page = new Page<>(dictDataQuery.getPage(), dictDataQuery.getLimit());
        IPage<DictData> pageData = dictDataMapper.selectPage(page, queryWrapper);
        pageData.convert(x -> {
            DictDataListVo dictDataListVo = Convert.convert(DictDataListVo.class, x);
            // 状态描述
            if (dictDataListVo.getStatus() != null && dictDataListVo.getStatus() > 0) {
                dictDataListVo.setStatusName(DictDataConstant.DICTDATA_STATUS_LIST.get(dictDataListVo.getStatus()));
            }
            return dictDataListVo;
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
        DictData entity = (DictData) super.getInfo(id);
        // 返回视图Vo
        DictDataInfoVo dictDataInfoVo = new DictDataInfoVo();
        // 拷贝属性
        BeanUtils.copyProperties(entity, dictDataInfoVo);
        return dictDataInfoVo;
    }

    /**
     * 添加、更新记录
     *
     * @param entity 实体对象
     * @return
     */
    @Override
    public JsonResult edit(DictData entity) {
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
    public JsonResult delete(DictData entity) {
        entity.setUpdateUser(1);
        entity.setUpdateTime(DateUtils.now());
        entity.setMark(0);
        return super.delete(entity);
    }

    /**
     * 设置状态
     *
     * @param entity 实体对象
     * @return
     */
    @Override
    public JsonResult setStatus(DictData entity) {
        if (entity.getId() == null || entity.getId() <= 0) {
            return JsonResult.error("记录ID不能为空");
        }
        if (entity.getStatus() == null) {
            return JsonResult.error("记录状态不能为空");
        }
        return super.setStatus(entity);
    }

}