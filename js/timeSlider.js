var slider = document.getElementById("timeRange");
var output = document.getElementById("timeSelected");
//output.innerHTML = slider.value;
slider.oninput = function() {
    var hour = parseInt(this.value, 10);
    //console.log(hour);
    var startTime = (new Date("2016/10/01 00:00:00")).getTime()/1000;
    var timestamp = startTime+hour*3600;
    var newDate = new Date();
    newDate.setTime(timestamp * 1000);
    output.innerHTML = newDate.format('yyyy-MM-dd hh:mm:ss');
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
};

Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};