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
  tooltip: {},
  radar: {
    indicator: [
      { name: 'co' },
      { name: 'no2' },
      { name: 'o3' },
      { name: 'so2' },
      { name: 'pm2_5' },
      { name: 'pm10' },
      { name: 'usepaindex' },
      { name: 'gbdefraindex' }
    ]
  },
  series: [
    {
      type: 'radar',
      data: []
    }
  ]
};
