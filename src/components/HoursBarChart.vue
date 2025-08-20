<template>
  <div ref="el" class="chart"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, type PropType } from 'vue';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, TitleComponent, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const props = defineProps({
  title: { type: String, default: 'Project Hours Distribution' },
  labels: { type: Array as PropType<string[]>, required: true },
  values: { type: Array as PropType<number[]>, required: true },
});

const el = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

function render() {
  if (!chart || !el.value) return;
  const option = {
    title: { text: props.title, left: 'center' },
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, bottom: 40, top: 60 },
    xAxis: { type: 'category', data: props.labels, axisLabel: { rotate: 20 } },
    yAxis: { type: 'value', name: 'Hours' },
    series: [
      { name: 'Hours', type: 'bar', data: props.values, itemStyle: { color: '#1677ff' }, barMaxWidth: 40 },
    ],
  };
  chart.setOption(option);
}

function resize() {
  chart?.resize();
}

onMounted(() => {
  if (el.value) {
    chart = echarts.init(el.value);
    render();
    window.addEventListener('resize', resize);
  }
});

watch(() => [props.labels, props.values], render, { deep: true });

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  chart?.dispose();
  chart = null;
});
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 360px;
}
</style>
