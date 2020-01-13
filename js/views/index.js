var settings = {
  "url": "http://localhost:8008/api/Report/GetChartJson/?reportId=ccf173f5-53af-4b52-ba33-7b4a41409461&blockId=a85a4c3a_93a1_4b1c_abc8_6bb31b0441cf&token=e30fe47a-f33e-463e-bc4a-843957ca88dd_d6dd70876cb3657f46bd1bedad2d08_0110163144129&filterItem=&filterValue=",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({"Name":"ccf173f5-53af-4b52-ba33-7b4a41409461","Items":[]}),
};

var arr = []
$.ajax(settings).done(function (response) {
	dataset(response);
	console.log(arr);
	chart();
});

/* 解析返回结果成二维数组 */
function dataset(response) {
	var items = response.Items;
	for(var i in items) {
		arr[i] = [];
		for(var j in items[i]) {
			if(items[i][j] != null && items[i][j] != 0) {
				arr[i].push(items[i][j]);
			}
		}
	}
	var series = response.Series;
	var tempArr = [];
	for(var s in series) {
		tempArr.push(series[s].name);
	}
	tempArr.unshift("dimension");
	arr.unshift(tempArr);
}

/* 渲染图表 */
function chart() {
	var chart = echarts.init(document.getElementById('chart'));
	var options = {
		dataset: {
		        source: arr
		    },
		    xAxis: {type: 'category'},
		    yAxis: {},
		    series: [
		        {type: 'bar'},
				{type: 'bar'},
				{type: 'bar'}
		    ]
	}
	chart.setOption(options);
}
