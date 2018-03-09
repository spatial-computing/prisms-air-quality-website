
function chooseDate()
{
    // document.getElementById("demo").innerHTML= $(document.getElementById("dateFormat")).combodate('getValue');
    LoadLayer();
}

function functionNextYear()
{
    var curTime = $(document.getElementById("dateFormat")).combodate('getValue');
    var tempList = curTime.split('-');
    var newDate = new Date(parseInt(tempList[0])+1,parseInt(tempList[1])-1,parseInt(tempList[2]),parseInt(tempList[3]));
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
}

function functionNextMonth()
{
    var curTime = $(document.getElementById("dateFormat")).combodate('getValue');
    var tempList = curTime.split('-');
    var newDate = new Date(parseInt(tempList[0]),parseInt(tempList[1])-1+1,parseInt(tempList[2]),parseInt(tempList[3]));
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
}

function functionNextDay()
{
    var curTime = $(document.getElementById("dateFormat")).combodate('getValue');
    var tempList = curTime.split('-');
    var newDate = new Date(parseInt(tempList[0]),parseInt(tempList[1])-1,parseInt(tempList[2])+1,parseInt(tempList[3]));
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
}

function functionNextHour()
{
    var curTime = $(document.getElementById("dateFormat")).combodate('getValue');
    var tempList = curTime.split('-');
    var newDate = new Date(parseInt(tempList[0]),parseInt(tempList[1])-1,parseInt(tempList[2]),parseInt(tempList[3])+1);
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
}

function functionPreYear()
{
    var curTime = $(document.getElementById("dateFormat")).combodate('getValue');
    var tempList = curTime.split('-');
    var newDate = new Date(parseInt(tempList[0])-1,parseInt(tempList[1])-1,parseInt(tempList[2]),parseInt(tempList[3]));
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
}

function functionPreMonth()
{
    var curTime = $(document.getElementById("dateFormat")).combodate('getValue');
    var tempList = curTime.split('-');
    var newDate = new Date(parseInt(tempList[0]),parseInt(tempList[1])-1-1,parseInt(tempList[2]),parseInt(tempList[3]));
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
}

function functionPreDay()
{
    var curTime = $(document.getElementById("dateFormat")).combodate('getValue');
    var tempList = curTime.split('-');
    var newDate = new Date(parseInt(tempList[0]),parseInt(tempList[1])-1,parseInt(tempList[2])-1,parseInt(tempList[3]));
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
}

function functionPreHour()
{
    var curTime = $(document.getElementById("dateFormat")).combodate('getValue');
    var tempList = curTime.split('-');
    var newDate = new Date(parseInt(tempList[0]),parseInt(tempList[1])-1,parseInt(tempList[2]),parseInt(tempList[3])-1);
    $(document.getElementById("dateFormat")).combodate('setValue', newDate);
    LoadLayer();
}
