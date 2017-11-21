/**
 * JSON 值可以是：
 * 数字（整数或浮点数）
 * 字符串（在双引号中）
 * 逻辑值（true 或 false）
 * 数组（在方括号中）
 * 对象（在花括号中）
 * null
 */

var json = {
    stringify: function (val) {
        var stringify = '',
            curVal;

        if (val === null) {     // null
            return String(val);
        }

        switch (typeof val) {
            case 'number': // number
            case 'boolean': // boolean
                return String(val);

            case 'string': // string
                return '"' + val + '"';

            case 'undefined': // undefined
            case 'function': // function
                return undefined;
        }

        switch (Object.prototype.toString.call(val)) {
            case '[object Array]': // array
                stringify += '[';

                for (var i = 0, len = val.length - 1; i < len; i++) {
                    curVal = json.stringify(val[i]);
                    stringify += (curVal === undefined ? null : curVal) + ",";
                }
                stringify += json.stringify(val[i]);

                stringify += ']';
                return stringify;

            case '[object Date]': // date
                return '"' + (val.toJSON ? val.toJSON() : val.toString()) + '"';

            case '[object RegExp]': // regular expression
                return "{}";

            case '[object Object]': // object
                stringify += '{';

                for (var i in val) {
                    if (val.hasOwnProperty(i)) {
                        curVal = json.stringify(val[i]);
                        if (curVal !== undefined) {
                            stringify += '"' + i + '":' + curVal + ',';
                        }
                    }
                }

                stringify = stringify.slice(0, -1);
                stringify += '}';
                return stringify;
        }
    }
}
  