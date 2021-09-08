// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package com.javaweb.generator.utils;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.javaweb.common.utils.CommonUtils;
import com.javaweb.common.utils.DateUtils;
import com.javaweb.common.utils.JsonResult;
import com.javaweb.common.utils.StringUtils;
import com.javaweb.system.entity.Menu;
import com.javaweb.system.mapper.MenuMapper;
import com.javaweb.system.utils.ShiroUtils;
import freemarker.template.Template;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Component
@Data
public class CodeGenerateUtils {

    @Autowired
    private MenuMapper menuMapper;

    /**
     * 作者
     */
    @Value("${generate.author}")
    private String author = "yzs1013";
    /**
     * 创建时间
     */
    private String createTime = DateUtils.getDate();
    /**
     * 数据表名
     */
    private String tableName = "javaweb.vue.pro";
    /**
     * 数据表前缀
     */
    @Value("${generate.tablePrefix}")
    private String tablePredix = "sys_";
    /**
     * 表描述
     */
    private String tableAnnotation = "";
    /**
     * 包名
     */
    @Value("${generate.packageName}")
    private String packageName = "com.javaweb.system";
    /**
     * 模块名
     */
    @Value("${generate.moduleName}")
    private String moduleName = "javaweb-system";
    /**
     * 自动去除表前缀
     */
    @Value("${generate.autoRemovePre}")
    private boolean autoRemovePre = true;
    /**
     * 数据库连接池
     */
    @Value("${spring.datasource.url}")
    private String url = "jdbc:mysql://127.0.0.1:3306/javaweb.vue.pro?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2b8&useSSL=true&tinyInt1isBit=false";
    /**
     * 数据库用户名
     */
    @Value("${spring.datasource.username}")
    private String username = "root";
    /**
     * 数据库密码
     */
    @Value("${spring.datasource.password}")
    private String password = "159456";
    /**
     * 数据库驱动
     */
    private String driver = "com.mysql.cj.jdbc.Driver";
    /**
     * 项目根目录
     */
    String projectPath = System.getProperty("user.dir");
    private String targetPath = "";
    /**
     * 实体对象名
     */
    private String entityName = "sys_report";

    /**
     * 连接数据库
     *
     * @return
     * @throws Exception
     */
    public Connection getConnection() throws Exception {
        Class.forName(driver);
        Connection connection = DriverManager.getConnection(url, username, password);
        return connection;
    }

//    /**
//     * 程序主入口
//     *
//     * @param args
//     * @throws Exception
//     */
//    public static void main(String[] args) throws Exception {
//        CodeGenerateUtils codeGenerateUtils = new CodeGenerateUtils();
//        codeGenerateUtils.generateFile("sys_demo", "演示");
//    }

    /**
     * 根据模板创建文件
     *
     * @throws Exception
     */
    public void generateFile(String tableName, String tableAnnotation) throws Exception {
        try {
            // 数据表名
            this.tableName = tableName;
            // 数据表描述
            this.tableAnnotation = tableAnnotation;
            // 实体对象名
            if (this.autoRemovePre) {
                this.entityName = replaceUnderLineAndUpperCase(tableName.replace(this.tablePredix, ""));
            } else {
                this.entityName = replaceUnderLineAndUpperCase(tableName);
            }
            // 目标文件路径
            String[] packageArr = packageName.split("\\.");
            targetPath = projectPath + "/" + moduleName + "/src/main/java/" + StringUtils.join(packageArr, "/");

            // 获取数据表信息
            Connection connection = getConnection();
            DatabaseMetaData databaseMetaData = connection.getMetaData();
            ResultSet resultSet = databaseMetaData.getColumns(null, "%", tableName, "%");

            // 获取数据表列信息
            Map<String, Object> dataMap = getColumnsList(resultSet);

            /**
             * 生成实体Entity文件
             */
            generateEntityFile(dataMap);
            /**
             * 生成Mapper文件
             */
            generateMapperFile();
            /**
             * 生成Dao文件
             */
            generateDaoFile();
            /**
             * 生成查询条件文件
             */
            generateQueryFile(dataMap);
            /**
             * 生成服务类接口文件
             */
            generateIServiceFile(dataMap);
            /**
             * 生成服务类接口实现文件
             */
            generateServiceImplFile(dataMap);
            /**
             * 生成实体列表Vo
             */
            generateEntityListVoFile(dataMap);
            /**
             * 生成实体表单Vo
             */
            generateEntityInfoVoFile(dataMap);
            /**
             * 生成模块常亮
             */
            generateConstantFile(dataMap);
            /**
             * 生成控制器
             */
            generateControllerFile(dataMap);
            /**
             *  生成Vue文件
             */
            generateVueFile(dataMap);
            /**
             * 生成菜单权限
             */
            generatePermission(entityName);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {

        }
    }

    /**
     * 生成实体对象Entity.java文件
     *
     * @param dataMap 参数
     * @throws Exception
     */
    private void generateEntityFile(Map<String, Object> dataMap) throws Exception {
        // 文件路径
        String path = targetPath + "/entity/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = ".java";
        // 完整的文件路径
        String filePath = path + entityName + suffix;
        // 模板文件
        String templateName = "Entity.ftl";
        File entityFile = new File(filePath);
        generateFileByTemplate(templateName, entityFile, dataMap);
    }

    /**
     * 生成Mapper.xml文件
     *
     * @throws Exception
     */
    private void generateMapperFile() throws Exception {
        // 文件路径
        String path = projectPath + "/" + moduleName + "/src/main/resources/mapper/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = "Mapper.xml";
        // 完整的文件路径
        String filePath = path + entityName + suffix;
        // 模板文件
        String templateName = "Mapper.ftl";
        File mapperFile = new File(filePath);
        Map<String, Object> dataMap = new HashMap<>();
        generateFileByTemplate(templateName, mapperFile, dataMap);
    }

    /**
     * 生成Dao.java文件
     *
     * @throws Exception
     */
    private void generateDaoFile() throws Exception {
        // 文件路径
        String path = targetPath + "/mapper/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = "Mapper.java";
        // 完整的文件路径
        String filePath = path + entityName + suffix;
        // 模板文件
        String templateName = "Dao.ftl";
        File daoFile = new File(filePath);
        Map<String, Object> dataMap = new HashMap<>();
        generateFileByTemplate(templateName, daoFile, dataMap);
    }

    /**
     * 生成Query.java查询文件
     *
     * @param dataMap 参数
     * @throws Exception
     */
    private void generateQueryFile(Map<String, Object> dataMap) throws Exception {
        // 文件路径
        String path = targetPath + "/query/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = "Query.java";
        // 完整的文件路径
        String filePath = path + entityName + suffix;
        // 模板文件
        String templateName = "Query.ftl";
        File queryFile = new File(filePath);
        generateFileByTemplate(templateName, queryFile, dataMap);
    }

    /**
     * 生成服务接口文件
     *
     * @throws Exception
     */
    private void generateIServiceFile(Map<String, Object> dataMap) throws Exception {
        // 文件路径
        String path = targetPath + "/service/";
        // 初始化文件路径
        initFileDir(path);
        // 文件前缀
        String prefix = "I";
        // 文件后缀
        String suffix = "Service.java";
        // 完整的文件路径
        String filePath = path + prefix + entityName + suffix;
        // 模板文件
        String templateName = "IService.ftl";
        File serviceFile = new File(filePath);
        generateFileByTemplate(templateName, serviceFile, dataMap);
    }

    /**
     * 生成服务类实现文件
     *
     * @throws Exception
     */
    private void generateServiceImplFile(Map<String, Object> dataMap) throws Exception {
        // 文件路径
        String path = targetPath + "/service/impl/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = "ServiceImpl.java";
        // 完整的文件路径
        String filePath = path + entityName + suffix;
        // 模板文件
        String templateName = "ServiceImpl.ftl";
        File serviceImplFile = new File(filePath);
        generateFileByTemplate(templateName, serviceImplFile, dataMap);
    }

    /**
     * 生成列表ListVo文件
     *
     * @param dataMap 参数
     * @throws Exception
     */
    private void generateEntityListVoFile(Map<String, Object> dataMap) throws Exception {
        // 文件路径
        String path = targetPath + "/vo/" + entityName.toLowerCase() + "/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = ".java";
        // 完整的文件路径
        String filePath = path + entityName + "ListVo" + suffix;
        // 模板文件
        String templateName = "EntityListVo.ftl";
        File listVoFile = new File(filePath);
        generateFileByTemplate(templateName, listVoFile, dataMap);
    }

    /**
     * 生成表单InfoVo文件
     *
     * @param dataMap 参数
     * @throws Exception
     */
    private void generateEntityInfoVoFile(Map<String, Object> dataMap) throws Exception {
        // 文件路径
        String path = targetPath + "/vo/" + entityName.toLowerCase() + "/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = ".java";
        // 完整的文件路径
        String filePath = path + entityName + "InfoVo" + suffix;
        // 模板文件
        String templateName = "EntityInfoVo.ftl";
        File infoVoFile = new File(filePath);
        generateFileByTemplate(templateName, infoVoFile, dataMap);
    }

    /**
     * 生成模块常量
     *
     * @param dataMap 参数
     * @throws Exception
     */
    private void generateConstantFile(Map<String, Object> dataMap) throws Exception {
        // 文件路径
        String path = targetPath + "/constant/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = "Constant.java";
        // 完整的文件路径
        String filePath = path + entityName + suffix;
        // 模板文件
        String templateName = "Constant.ftl";
        File controllerFile = new File(filePath);
        generateFileByTemplate(templateName, controllerFile, dataMap);
    }

    /**
     * 生成控制器文件
     *
     * @throws Exception
     */
    private void generateControllerFile(Map<String, Object> dataMap) throws Exception {
        // 文件路径
        String path = targetPath + "/controller/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = "Controller.java";
        // 完整的文件路径
        String filePath = path + entityName + suffix;
        // 模板文件
        String templateName = "Controller.ftl";
        File controllerFile = new File(filePath);
        generateFileByTemplate(templateName, controllerFile, dataMap);
    }

    /**
     * 生成Vue文件
     *
     * @param dataMap 列数据源
     * @throws Exception
     */
    private void generateVueFile(Map<String, Object> dataMap) throws Exception {

        System.out.println("\n进入生成vue文件");
        // 文件路径
        String path = projectPath + "/javaweb-ui/src/views/system/" + entityName.toLowerCase() + "/";
        // 初始化文件路径
        initFileDir(path);
        // 文件后缀
        String suffix = "index.vue";
        // 完整的文件路径
        String filePath = path + suffix;
        // 模板文件
        String templateName = "Index.vue.ftl";
        File entityFile = new File(filePath);

        List<ColumnClass> columnClasses = (List<ColumnClass>) dataMap.get("model_column");
        List<ColumnClass> arrayList = new ArrayList<>();
        List<ColumnClass> tempList = new ArrayList<>();
        List<ColumnClass> rowList = new ArrayList<>();
        for (ColumnClass columnClass : columnClasses) {
            if (columnClass.getChangeColumnName().equals("CreateUser")) {
                continue;
            }
            if (columnClass.getChangeColumnName().equals("CreateTime")) {
                continue;
            }
            if (columnClass.getChangeColumnName().equals("UpdateUser")) {
                continue;
            }
            if (columnClass.getChangeColumnName().equals("UpdateTime")) {
                continue;
            }
            if (columnClass.getChangeColumnName().equals("Mark")) {
                continue;
            }
            // 图片
            if (columnClass.getColumnName().contains("cover")
                    || columnClass.getColumnName().contains("avatar")
                    || columnClass.getColumnName().contains("image")
                    || columnClass.getColumnName().contains("logo")
                    || columnClass.getColumnName().contains("pic")) {
                tempList.add(columnClass);
                continue;
            }
            // 单行显示常用字段处理
            if (columnClass.getColumnName().contains("note")
                    || columnClass.getColumnName().contains("remark")
                    || columnClass.getColumnName().contains("content")
                    || columnClass.getColumnName().contains("description")
                    || columnClass.getColumnName().contains("intro")) {
                rowList.add(columnClass);
                continue;
            }
            arrayList.add(columnClass);
        }
        if (arrayList.size() + rowList.size() + tempList.size() > 20) {
            List<List<ColumnClass>> columnClassesList = CommonUtils.split(arrayList, 2);
            if (tempList.size() > 0) {
                columnClassesList.add(0, tempList);
            }
            if (rowList.size() > 0) {
                List<List<ColumnClass>> arrayColumnList = CommonUtils.split(rowList, 1);
                arrayColumnList.forEach(item -> {
                    columnClassesList.add(item);
                });
            }
            //dataMap.put("model_column", columnClassesList);
            dataMap.put("is_split", true);
        } else {
            dataMap.put("is_split", false);
        }
        generateFileByTemplate(templateName, entityFile, dataMap);
    }

    /**
     * 生成权限节点
     *
     * @param entityName 实体名称
     */
    private void generatePermission(String entityName) {
        // 查询菜单是否存在
        Menu entity = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                .eq(Menu::getPath, String.format("/system/%s", entityName.toLowerCase()))
                .eq(Menu::getMark, 1)
                .last("limit 1"));

        Integer result = 0;
        if (entity != null) {
            // 更新
            entity.setTitle(tableAnnotation);
            entity.setPath(String.format("/system/%s", entityName.toLowerCase()));
            entity.setComponent(String.format("/system/%s", entityName.toLowerCase()));
            entity.setPermission(String.format("sys:%s:view", entityName.toLowerCase()));
            entity.setUpdateUser(ShiroUtils.getUserId());
            entity.setUpdateTime(DateUtils.now());
            result = menuMapper.updateById(entity);
        } else {
            // 创建
            entity = new Menu();
            entity.setTitle(tableAnnotation);
            entity.setIcon("el-icon-_setting");
            entity.setPath(String.format("/system/%s", entityName.toLowerCase()));
            entity.setComponent(String.format("/system/%s", entityName.toLowerCase()));
            entity.setPermission(String.format("sys:%s:view", entityName.toLowerCase()));
            entity.setPid(158); // 系统工具菜单ID
            entity.setType(0);
            entity.setStatus(1);
            entity.setSort(5);
            entity.setTarget("_self");
            entity.setCreateUser(ShiroUtils.getUserId());
            entity.setCreateTime(DateUtils.now());
            result = menuMapper.insert(entity);
        }
        if (result == 1) {
            // 创建或更新权限节点
            String[] strings = entity.getPath().split("/");
            // 模块名称
            String moduleName = strings[strings.length - 1];
            // 目标标题
            String moduleTitle = entity.getTitle().replace("管理", "");
            // 遍历权限节点
            Integer[] permissionList = new Integer[]{1, 5, 10, 15, 25};
            for (Integer item : permissionList) {
                Menu funcInfo = new Menu();
                funcInfo.setPid(entity.getId());
                funcInfo.setType(1);
                funcInfo.setStatus(1);
                funcInfo.setSort(item);
                funcInfo.setTarget(entity.getTarget());
                if (item.equals(1)) {
                    // 查看
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle(String.format("查询%s", moduleTitle));
                    funcInfo.setPermission(String.format("sys:%s:index", moduleName));
                } else if (item.equals(5)) {
                    // 添加
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle(String.format("添加%s", moduleTitle));
                    funcInfo.setPermission(String.format("sys:%s:add", moduleName));
                } else if (item.equals(10)) {
                    // 修改
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle(String.format("修改%s", moduleTitle));
                    funcInfo.setPermission(String.format("sys:%s:edit", moduleName));
                } else if (item.equals(15)) {
                    // 删除
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle(String.format("删除%s", moduleTitle));
                    funcInfo.setPermission(String.format("sys:%s:delete", moduleName));
                } else if (item.equals(20)) {
                    // 状态
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle("设置状态");
                    funcInfo.setPermission(String.format("sys:%s:status", moduleName));
                } else if (item.equals(25)) {
                    // 批量删除
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle("批量删除");
                    funcInfo.setPermission(String.format("sys:%s:dall", moduleName));
                } else if (item.equals(30)) {
                    // 全部展开
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle("全部展开");
                    funcInfo.setPermission(String.format("sys:%s:expand", moduleName));
                } else if (item.equals(35)) {
                    // 全部折叠
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle("全部折叠");
                    funcInfo.setPermission(String.format("sys:%s:collapse", moduleName));
                } else if (item.equals(40)) {
                    // 添加子级
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle("添加子级");
                    funcInfo.setPermission(String.format("sys:%s:addz", moduleName));
                } else if (item.equals(45)) {
                    // 导出数据
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle("导出数据");
                    funcInfo.setPermission(String.format("sys:%s:export", moduleName));
                } else if (item.equals(50)) {
                    // 导入数据
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle("导入数据");
                    funcInfo.setPermission(String.format("sys:%s:import", moduleName));
                } else if (item.equals(55)) {
                    // 分配权限
                    Menu menuInfo = menuMapper.selectOne(new LambdaQueryWrapper<Menu>()
                            .eq(Menu::getPid, entity.getId())
                            .eq(Menu::getType, 1)
                            .eq(Menu::getSort, item)
                            .eq(Menu::getMark, 1)
                            .last("limit 1"));
                    if (menuInfo != null) {
                        funcInfo.setId(menuInfo.getId());
                        funcInfo.setUpdateUser(ShiroUtils.getUserId());
                        funcInfo.setUpdateTime(DateUtils.now());
                    }
                    funcInfo.setTitle("分配权限");
                    funcInfo.setPermission(String.format("sys:%s:permission", moduleName));
                }
                if (StringUtils.isEmpty(funcInfo.getTitle())) {
                    continue;
                }
                if (StringUtils.isNull(funcInfo.getId())) {
                    // 创建
                    menuMapper.insert(funcInfo);
                } else {
                    // 更新
                    menuMapper.updateById(funcInfo);
                }
            }
        }
    }

    /**
     * 生成模板文件
     *
     * @param templateName 模板名称
     * @param file         生成文件
     * @param dataMap      生成参数
     * @throws Exception
     */
    private void generateFileByTemplate(String templateName, File file, Map<String, Object> dataMap) throws Exception {
        Template template = FreeMarkerUtils.getTemplate(templateName);
        FileOutputStream fos = new FileOutputStream(file);
        dataMap.put("tableName", tableName);
        dataMap.put("entityName", entityName);
        dataMap.put("author", author);
        dataMap.put("date", createTime);
        dataMap.put("packageName", packageName);
        dataMap.put("tableAnnotation", tableAnnotation);
        Writer out = new BufferedWriter(new OutputStreamWriter(fos, "utf-8"), 10240);
        template.process(dataMap, out);
    }

    /**
     * 获取数据表列信息
     *
     * @param resultSet
     * @return
     * @throws IOException
     */
    private Map<String, Object> getColumnsList(ResultSet resultSet) throws IOException {
        // 初始化Map对象
        Map<String, Object> dataMap = new HashMap<>();
        try {
            // 获取列信息
            List<ColumnClass> columnClassList = new ArrayList<>();
            ColumnClass columnClass = null;
            boolean hasPid = false;
            boolean columnNumberValue = false;
            while (resultSet.next()) {
                //id字段略过
                if (resultSet.getString("COLUMN_NAME").equals("id")) {
                    continue;
                }
                // 判断是否存在pid
                if (resultSet.getString("COLUMN_NAME").equals("pid")) {
                    hasPid = true;
                }
                columnClass = new ColumnClass();
                //获取字段名称
                columnClass.setColumnName(resultSet.getString("COLUMN_NAME"));
                //获取字段类型
                columnClass.setColumnType(resultSet.getString("TYPE_NAME"));
                //转换字段名称，如 sys_name 变成 SysName
                columnClass.setChangeColumnName(replaceUnderLineAndUpperCase(resultSet.getString("COLUMN_NAME")));
                //字段在数据库的注释
                String remarks = resultSet.getString("REMARKS");
                columnClass.setColumnComment(remarks);
                // 注解分析
                if (remarks.contains(":") || remarks.contains("：")) {
                    // 获取数字
                    String regets = ":|：|\\s";
                    //在分割的时候顺带把空格给去掉，data的格式基本为: 18:00
                    String[] times = remarks.split(regets);
                    // 标题描述
                    remarks = times[0];
                    Map<String, String> map = new HashMap<>();
                    List<String> columnValue = new ArrayList<>();
                    List<String> columnValue2 = new ArrayList<>();
                    Map<Integer, String> columnValueList = new HashMap<>();
                    for (int i = 1; i < times.length; i++) {
                        if (StringUtils.isEmpty(times[i])) {
                            continue;
                        }
                        if (times[i].contains("=")) {
                            String[] item = times[i].split("=");
                            System.out.println("Key:" + item[0] + " " + "Val:" + item[1]);
                            map.put(item[0], item[1]);
                            columnValue.add(String.format("'%s'", item[1]));
                            columnValue2.add(String.format("%s", item[1]));
                            columnValueList.put(Integer.valueOf(item[0]), item[1]);
                            columnNumberValue = false;
                        } else {
                            String key = Pattern.compile("[^0-9]").matcher(times[i]).replaceAll("").trim();
                            String value = times[i].replaceAll(key, "").trim();
                            System.out.println("Key:" + key + " " + "Val:" + value);
                            map.put(key, value);
                            columnValue.add(String.format("'%s'", value));
                            columnValue2.add(String.format("%s", value));
                            columnValueList.put(Integer.valueOf(key), value);
                            columnNumberValue = true;
                        }
                    }
                    columnClass.setHasColumnCommentValue(true);
                    columnClass.setColumnCommentName(remarks);
                    columnClass.setColumnCommentValue(map);
                    columnClass.setColumnNumberValue(columnNumberValue);
                    // 列值
                    if ((columnClass.getColumnName().equals("status") && columnValue2.size() == 2) || columnClass.getColumnName().startsWith("is_")) {
                        columnClass.setColumnSwitchValue(StringUtils.join(columnValue2, "|"));
                        columnClass.setColumnSwitch(true);
                    } else {
                        columnClass.setColumnSwitch(false);
                    }
                    columnClass.setColumnValue(StringUtils.join(columnValue, ","));
                    columnClass.setColumnValueList(columnValueList);
                }
                // 判断是否是图片字段
                if (columnClass.getColumnName().contains("cover")
                        || columnClass.getColumnName().contains("avatar")
                        || columnClass.getColumnName().contains("image")
                        || columnClass.getColumnName().contains("logo")
                        || columnClass.getColumnName().contains("pic")) {
                    // 设置图片字段标识
                    columnClass.setColumnImage(true);
                }
                // 判断是否是多行文本字段
                if (columnClass.getColumnName().contains("note")
                        || columnClass.getColumnName().contains("remark")
                        || columnClass.getColumnName().contains("content")
                        || columnClass.getColumnName().contains("description")
                        || columnClass.getColumnName().contains("intro")) {
                    // 设置多行文本标识
                    columnClass.setColumnTextArea(true);
                }
                columnClassList.add(columnClass);
            }
            dataMap.put("model_column", columnClassList);
            dataMap.put("hasPid", hasPid);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return dataMap;
    }

    /**
     * 根据路径创建文件夹
     *
     * @param path 路径
     */
    private void initFileDir(String path) {
        // 文件路径
        File file = new File(path);
        // 判断文件路径是否存在
        if (!file.exists()) {
            // 创建文件路径
            file.mkdirs();
        }
    }

    /**
     * 字符串转换函数
     * 如：sys_name 变成 SysName
     *
     * @param str 字符串
     * @return
     */
    public String replaceUnderLineAndUpperCase(String str) {
        StringBuffer sb = new StringBuffer();
        sb.append(str);
        int count = sb.indexOf("_");
        while (count != 0) {
            int num = sb.indexOf("_", count);
            count = num + 1;
            if (num != -1) {
                char ss = sb.charAt(count);
                char ia = (char) (ss - 32);
                sb.replace(count, count + 1, ia + "");
            }
        }
        String result = sb.toString().replaceAll("_", "");
        return StringUtils.capitalize(result);
    }

}
