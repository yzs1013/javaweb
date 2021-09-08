// +----------------------------------------------------------------------
// | JavaWeb_Vue_Pro前后端分离旗舰版框架 [ JavaWeb ]
// +----------------------------------------------------------------------
// | 版权所有 2019~2020 南京JavaWeb研发中心
// +----------------------------------------------------------------------
// | 官方网站: http://www.javaweb.vip/
// +----------------------------------------------------------------------
// | 作者: 鲲鹏 <1175401194@qq.com>
// +----------------------------------------------------------------------

package ${packageName}.vo.${entityName?lower_case};

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

/**
 * <p>
 * ${tableAnnotation}列表Vo
 * </p>
 *
 * @author ${author}
 * @since ${date}
 */
@Data
public class ${entityName}ListVo {

    /**
    * ${tableAnnotation}ID
    */
    private Integer id;

<#if model_column?exists>
    <#list model_column as model>
    /**
     * ${model.columnComment!}
     */
    <#if (model.columnType = 'VARCHAR' || model.columnType = 'CHAR' || model.columnType = 'TEXT' || model.columnType = 'MEDIUMTEXT')>
    private String ${model.changeColumnName?uncap_first};

    </#if>
    <#if (model.columnType = 'DATETIME' || model.columnType = 'DATE' || model.columnType = 'TIME' || model.columnType = 'YEAR' || model.columnType = 'TIMESTAMP') >
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date ${model.changeColumnName?uncap_first};

    </#if>
    <#if (model.columnType = 'TINYINT UNSIGNED' || model.columnType = 'TINYINT')>
    private Integer ${model.changeColumnName?uncap_first};

    </#if>
    <#if model.hasColumnCommentValue = true>

    /**
    * ${model.columnCommentName}描述
    */
    private String ${model.changeColumnName?uncap_first}Name;

    </#if>
    <#if (model.columnType = 'SMALLINT UNSIGNED' || model.columnType = 'SMALLINT' || model.columnType = 'MEDIUMINT UNSIGNED' || model.columnType = 'MEDIUMINT')>
    private Integer ${model.changeColumnName?uncap_first};

    </#if>
    <#if (model.columnType = 'INT UNSIGNED' || model.columnType = 'INT')>
    private Integer ${model.changeColumnName?uncap_first};

    </#if>
    <#if (model.columnType = 'BIGINT UNSIGNED' || model.columnType = 'BIGINT')>
    private Integer ${model.changeColumnName?uncap_first};

    </#if>
    <#if (model.columnType = 'DECIMAL UNSIGNED' || model.columnType = 'DECIMAL')>
    private BigDecimal ${model.changeColumnName?uncap_first};

    </#if>
    <#if (model.columnType = 'FLOAT UNSIGNED' || model.columnType = 'FLOAT')>
    private Float ${model.changeColumnName?uncap_first};

    </#if>
    <#if (model.columnType = 'DOUBLE UNSIGNED' || model.columnType = 'DOUBLE')>
    private Double ${model.changeColumnName?uncap_first};

    </#if>
    <#if model.columnType = 'BLOB'>
    private byte[] ${model.changeColumnName?uncap_first};

    </#if>
    </#list>
</#if>
}