	jQuery(window).load(function() {
		/*************************************************************************************************************************************
												Highcharts : Global 
		 *************************************************************************************************************************************/
		Highcharts.setOptions({
			chart: {
				backgroundColor: '#f9f9fb'
			},
			credits : false,
			exporting: { 
				enabled: true
			},
			subtitle: {
				style: {color: '#33'}
			},
			title: {
				text: '',
				enabled: false
			},
			legend: {
				itemStyle: {
					color: '#000',
					fontWeight: 'bold'
				}
			},
			xAxis: {
				labels: {
					style: {
						fontSize: '14px',
						color: '#333'
					}
				},
				reversed: false
			},
			yAxis: {
				labels: {
					style: {
						fontSize: '14px',
						color: '#33'
					}
				},
				opposite: false
			}
		});
		if($('html').attr('dir') == 'rtl'){
			Highcharts.setOptions({
				lang: {
					//numericSymbols: [' ألف', ' مليون'],
					printChart: 'طباعة الرسم البياني',
					downloadPNG: 'تحميل صورة <span>PNG</span>',
					downloadJPEG: 'تحميل صورة <span>JPEG</span>',
					downloadPDF: 'تحميل ملف <span>PDF</span>',
					downloadSVG: 'تحميل ناقل الصورة <span>SVG</span>',
					contextButtonTitle: 'قائمة الرسم البياني'
				},
				exporting: { 
					buttons : {
						contextButton : {
							align: "left"
						}
					}
				},
				xAxis: {
					reversed: true
				},
				yAxis: {
					opposite: true
				}
			});
			
			var content_direction = 'rtl';
			var is_reversed = (content_direction == 'rtl' ? true : false);
			
			console.log('content_direction: ' + content_direction)
		}
		
		/*************************************************************************************************************************************
												
		 *************************************************************************************************************************************/
		if($('#actionsByClassification').length){
			var legendAlign;
			if($('html').attr('dir') == 'rtl'){
				legendAlign = 'left'
			}else{
				legendAlign = 'right'
			}
			
			// Build the chart
			$('#actionsByClassification .boxCharts').highcharts({
			  chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			  },
			  tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			  },
			   legend: {
					align: legendAlign,
					verticalAlign: 'middle',
					layout: 'vertical',
					itemMarginTop: 5,
					itemMarginBottom: 5
				},
			  accessibility: {
				point: {
				  valueSuffix: '%'
				}
			  },
			  plotOptions: {
				pie: {
				  allowPointSelect: true,
				  cursor: 'pointer',
				  dataLabels: {
					enabled: false
				  },
				  showInLegend: true
				}
			  },
			  series: [{
				name: 'الإجراءات حسب التصنيف',
				colorByPoint: true,
				data: [{
				  name: 'صنف 1',
				  y: 33,
				  color: '#318ad8',
				  sliced: true,
				  selected: true
				}, {
				  name: 'صنف 2',
				  y: 31,
				  color: '#f683ae'
				}, {
				  name: 'صنف 3',
				  y: 36,
				  color: '#bfddf7'
				}]
			  }]
			});
		}	
		
		/*************************************************************************************************************************************
												chart2
		 *************************************************************************************************************************************/
		if($('#chart2').length){
			var legendAlign;
			if($('html').attr('dir') == 'rtl'){
				legendAlign = 'left'
			}else{
				legendAlign = 'right'
			}
			
			// Build the chart
			$('#chart2 .boxCharts').highcharts({
			  chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			  },
			  tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			  },
			   legend: {
					align: legendAlign,
					verticalAlign: 'middle',
					layout: 'vertical',
					itemMarginTop: 5,
					itemMarginBottom: 5
				},
			  accessibility: {
				point: {
				  valueSuffix: '%'
				}
			  },
			  plotOptions: {
				pie: {
				  allowPointSelect: true,
				  cursor: 'pointer',
				  dataLabels: {
					enabled: false
				  },
				  showInLegend: true
				}
			  },
			  series: [{
				name: 'التقدم في المهام',
				colorByPoint: true,
				data: [{
				  name: 'مهمة 1',
				  y: 33,
				  color: '#bfddf7',
				  sliced: true,
				  selected: true
				}, {
				  name: 'مهمة 2',
				  y: 31,
				  color: '#318ad8'
				}, {
				  name: 'مهمة 3',
				  y: 36,
				  color: '#f683ae'
				}]
			  }]
			});
		}
		
		/*************************************************************************************************************************************
												
		 *************************************************************************************************************************************/
		if($('#requestsManagement').length){
			$('#requestsManagement .boxCharts').highcharts({
				  chart: {
					type: 'column'
				  },
				  xAxis: {
					type: 'category',
					labels: {
					  //rotation: -45,
					  style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					  }
					}
				  },
				  yAxis: {
					min: 0,
					title: {
					  enabled: false
					}
				  },
				  legend: {
					enabled: false
				  },
				  tooltip: {
					pointFormat: 'الطلبات حسب الادارة: <b>{point.y:.1f}</b>'
				  },
				  series: [{
					name: 'Population',
					color: '#318ad8',
					data: [
					  ['إدارة 1', 24.2],
					  ['إدارة 2', 20.8],
					  ['إدارة 3', 14.9],
					  ['إدارة 4', 13.7],
					  ['إدارة 5', 13.1],
					  ['إدارة 6', 12.7],
					  ['إدارة 7', 12.4],
					  ['إدارة 8', 12.2],
					  ['إدارة 9', 12.0],
					  ['إدارة 10', 11.7],
					  ['إدارة 11', 11.5],
					  ['إدارة 12', 11.2]
					],
					dataLabels: {
					  enabled: false
					}
				  }]
			});
		}
		
		/*************************************************************************************************************************************
												
		 *************************************************************************************************************************************/
		if($('#donutChart').length){
			var legendAlign;
			if($('html').attr('dir') == 'rtl'){
				legendAlign = 'left'
			}else{
				legendAlign = 'right'
			}

			$('#donutChart .boxCharts').highcharts({
			  chart: {
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false
			  },
			  tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			  },
			   legend: {
				align: legendAlign,
				verticalAlign: 'bottom',
				layout: 'horizontal'
			},
			  accessibility: {
				point: {
				  valueSuffix: '%'
				}
			  },
			  plotOptions: {
				pie: {
				  dataLabels: {
					enabled: false,
					distance: -50,
					style: {
					  fontWeight: 'bold',
					  color: 'white'
					}
				  },
				  showInLegend: true,
				  size: '80%'
				}
			  },
			  series: [{
				type: 'pie',
				name: 'التقدم في المهام',
				innerSize: '50%',
				data: [{
					  name: 'التقدم الحالي',
					  y: 28,
					  color: '#e16a96'
					}, {
					  name: 'المتبقي',
					  y: 72,
					  color: '#dfdfdf'
					}]

			  }]
			});
		}	
		
		/*************************************************************************************************************************************
												actionsByType
		 *************************************************************************************************************************************/
		if($('#actionsByType').length){
			var legendAlign;
			if($('html').attr('dir') == 'rtl'){
				legendAlign = 'left'
			}else{
				legendAlign = 'right'
			}
			
			// Build the chart
			$('#actionsByType .boxCharts').highcharts({
			  chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			  },
			  tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			  },
			   legend: {
					align: legendAlign,
					verticalAlign: 'middle',
					layout: 'vertical',
					itemMarginTop: 5,
					itemMarginBottom: 5
				},
			  accessibility: {
				point: {
				  valueSuffix: '%'
				}
			  },
			  plotOptions: {
				pie: {
				  allowPointSelect: true,
				  cursor: 'pointer',
				  dataLabels: {
					enabled: false
				  },
				  showInLegend: true
				}
			  },
			  series: [{
				name: 'الإجراءات حسب النوع',
				colorByPoint: true,
				data: [{
				  name: 'نوع 1',
				  y: 33,
				  color: '#bfddf7'
				}, {
				  name: 'نوع 2',
				  y: 31,
				  color: '#318ad8'
				}, {
				  name: 'نوع 3',
				  y: 36,
				  color: '#f683ae',
				  sliced: true,
				  selected: true
				}]
			  }]
			});
		}	
		
		/*************************************************************************************************************************************
												actionsByType
		 *************************************************************************************************************************************/
		if($('#lineChart').length){
			// Build the chart
			$('#lineChart .boxCharts').highcharts({
			  yAxis: {
				title: {
				  enabled: false
				}
			  },

			  xAxis: {
				accessibility: {
				  rangeDescription: 'Range: 2010 to 2017'
				}
			  },

			  legend: {
				enabled: false
			  },

			  plotOptions: {
				series: {
				  label: {
					connectorAllowed: false
				  },
				  pointStart: 2010
				}
			  },

			  series: [{
				name: 'Blue',
				color: '#3b7ddd',
				data: [10, 8, 6, 9, 7, 5, 4, 6, 3, 5, 8, 6]
			  }, {
				name: 'Dashed',
				color: '#adb5bd',
				data: [7, 5, 3, 6, 4, 2, 1, 3, 1, 2, 5, 3],
				dashStyle: 'shortdot'
			  }],

			  responsive: {
				rules: [{
				  condition: {
					maxWidth: 500
				  },
				  chartOptions: {
					legend: {
					  layout: 'horizontal',
					  align: 'center',
					  verticalAlign: 'bottom'
					}
				  }
				}]
			  }

			});
		}
	});