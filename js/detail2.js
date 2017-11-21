~function (pro) {
    function queryURLParameter() {
        var reg = /([^?=#]+)=([^?=#]+)/g;
        var obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

var detailRender = (function () {
    var submit = document.getElementById("submit");
    var userName = document.getElementById("userName"),
        userAge = document.getElementById("userAge"),
        userPhone = document.getElementById("userPhone"),
        userAddress = document.getElementById("userAddress");
    var customId = null, isUpdate = false;

    function bindEvent() {
        submit.onclick = function () {
            if (isUpdate) {
                var data = {
                    id: customId,
                    name: userName.value,
                    age: userAge.value,
                    phone: userPhone.value,
                    address: userAddress.value
                };
                ajax({
                    url: "/updateInfo",
                    type: "POST",
                    dataType: "JSON",
                    data: json.stringify(data),
                    success: function (res) {
                        if (res && res.code == 0) {
                            window.location.href = "css3选择器.html";
                        }
                    }
                });
                return;
            }
            var data = {
                name: userName.value,
                age: userAge.value,
                phone: userPhone.value,
                address: userAddress.value
            };
            ajax({
                url: "/addInfo",
                type: "POST",
                dataType: "JSON",
                data: json.stringify(data),
                success: function (res) {
                    if (res && res.code == 0) {
                        window.location.href = "css3选择器.html";
                    }
                }
            });

        }
    }

    return {
        init: function () {
            var obj = window.location.href.queryURLParameter();
            customId = obj.id;
            if (typeof customId != "undefined") {
                isUpdate = true;
                ajax({
                    url: "/getInfo?id=" + customId,
                    type: "GET",
                    dataType: "JSON",
                    success: function (res) {
                        if (res && res.code === 0) {
                            var info = res.data;
                            userName.value = info.name;
                            userAge.value = info.age;
                            userPhone.value = info.phone;
                            userAddress.value = info.address;
                        }
                    }
                });
            }
            bindEvent();
        }
    }

})();
detailRender.init();
