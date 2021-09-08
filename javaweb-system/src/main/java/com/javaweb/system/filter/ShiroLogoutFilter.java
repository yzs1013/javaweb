// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.system.filter;

import com.alibaba.fastjson.JSONObject;
import com.javaweb.common.utils.JsonResult;
import com.javaweb.common.utils.MessageUtils;
import com.javaweb.common.utils.StringUtils;
import com.javaweb.system.constant.Constants;
import com.javaweb.system.entity.User;
import com.javaweb.system.manager.AsyncFactory;
import com.javaweb.system.manager.AsyncManager;
import com.javaweb.system.utils.ShiroUtils;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.session.SessionException;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.Serializable;
import java.util.Deque;

/**
 * 退出过滤器
 */
public class ShiroLogoutFilter extends org.apache.shiro.web.filter.authc.LogoutFilter {

    private static final Logger log = LoggerFactory.getLogger(ShiroLogoutFilter.class);

    private Cache<String, Deque<Serializable>> cache;

    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        try {
            Subject subject = getSubject(request, response);
            try {
                User user = ShiroUtils.getUserInfo();
                if (StringUtils.isNotNull(user)) {
                    String loginName = user.getUsername();
                    // 记录用户退出日志
                    AsyncManager.me().execute(AsyncFactory.recordLogininfor(loginName, Constants.LOGOUT, MessageUtils.message("user.logout.success")));
                    // 清理缓存
                    cache.remove(loginName);
                }
                // 退出登录
                subject.logout();
            } catch (SessionException ise) {
                log.error("logout fail.", ise);
            }
            // 提示注销成功
            JsonResult jsonResult = new JsonResult();
            response.getWriter().write(JSONObject.toJSON(jsonResult.success("注销成功")).toString());
        } catch (Exception e) {
            log.error("Encountered session exception during logout.  This can generally safely be ignored.", e);
        }
        return false;
    }
}
