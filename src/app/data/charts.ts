import { EChartsOption } from 'echarts';

export const lineChartOptionData: EChartsOption = {
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line'
    }
  ]
};

export const gaugeChartOptionData: EChartsOption = {
  tooltip: {},
  series: [
    {
      data: [],
      type: 'gauge',
      itemStyle: {
        color: '#5470c6'
      },
      progress: {
        itemStyle: {
          color: 'red'
        }
      }
    }
  ]
};

export const radarChartOptionData: EChartsOption = {
  color: ['blue', 'green'],
  tooltip: {},
  legend: {
    data: ['Allocated Budget', 'Actual Spending'],
    textStyle: {
      color: 'black'
    }
  },
  radar: {
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Techology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
};
