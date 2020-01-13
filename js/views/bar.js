var settings = {
  "url": "http://localhost:8008/api/Report/GetVerticalTableJson/?reportId=ce1e821e-26f6-4dcd-9710-b07a35c8bf4f&blockId=11e885dc_e3a0_4c93_8512_bfae8b098220&token=e30fe47a-f33e-463e-bc4a-843957ca88dd_d6dd70876cb3657f46bd1bedad2d08_0113090928129&pageIndex=1&pageSize=200&filterItem=&filterValue=",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({"Name":"ce1e821e-26f6-4dcd-9710-b07a35c8bf4f","Items":[]}),
};

$.ajax(settings).done(function (response) {
	dataset(response);
	chart();
	console.log(response);
});

/* 解析数据 */
var xData = [];
var yData = [];
var data = [];
function dataset(response) {
	var rows = response.Rows;
	/* 解析获取x轴\y轴 */
	for(var i=0; i<rows.length; i++) {
		if(rows[i].C1 != null && rows[i].C1 != 0) {
			xData.push(rows[i].C1);
		}
		if(rows[i].C2 != null && rows[i].C2 != 0) {
			data.push(rows[i].C2);
		}
	}
	var columns = response.Columns;
	for(var i=0; i<columns.length; i++) {
		if(columns[i].title != null && columns[i].title != 0) {
			yData.push(columns[i].title);
		}
	}
	console.log(xData)
	console.log(yData)
	console.log(data)
}

/* 渲染图表 */
function chart() {
	var chart = echarts.init(document.getElementById('chart'));
	var options = {
		legend:{},
	    xAxis: {
			type: 'category',
			data: xData
			},
	    yAxis: {type: 'value'},
	    series: [{
				name: yData[0], 
				type: 'bar',
				data: data,
				}]
	}
	chart.setOption(options);
}

/* 在arr中是否存在str,存在即返回对应角标,不存在返回-1 */
function checkRepeat(arr,str) {
	return arr.indexOf(str);
}
