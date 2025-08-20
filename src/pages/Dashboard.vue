<template>
  <div class="layout">
    <div class="topbar">
      <div class="left">
        <span class="brand">Work Orders</span>
      </div>
      <div class="right">
        <a-tag color="blue" v-if="isAdmin">Admin</a-tag>
        <a-tag v-else>User</a-tag>
        <a-divider type="vertical" />
        <a-button size="small" @click="onLogout">Logout</a-button>
      </div>
    </div>

    <a-row :gutter="[16,16]" class="content">
      <a-col :span="24" :lg="12">
        <a-card title="Work Orders">
          <a-table
              :data-source="dataSource"
              :columns="columns"
              :row-key="(record: any) => record.id"
              :pagination="{ pageSize: 5 }"
              size="middle"
          />
        </a-card>
      </a-col>

      <a-col :span="24" :lg="12">
        <a-card>
          <HoursBarChart :labels="chartLabels" :values="chartValues" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';
import HoursBarChart from '../components/HoursBarChart.vue';
import dayjs from 'dayjs';
import type { TableColumnsType } from 'ant-design-vue';
import { Popconfirm, Button } from 'ant-design-vue';

const router = useRouter();
const isAdmin = computed(() => store.isAdmin());

const dataSource = computed(() => store.orders.value);

function onDelete(id: string) {
  store.deleteOrderById(id);
}

// ✅ 新增：数字小时转 HH:MM 格式化
function formatHours(value: number): string {
  const h = Math.floor(value);
  const m = Math.round((value - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const baseColumns: TableColumnsType = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Project', dataIndex: 'project', key: 'project' },
  {
    title: 'Overtime',
    dataIndex: 'overtime',
    key: 'overtime',
    customRender: ({ text }) => (text ? 'Yes' : 'No'),
    width: 100,
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
    width: 100,
    customRender: ({ text }) => formatHours(text) // ✅ 应用格式化
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    width: 180,
  },
];

const columns = computed<TableColumnsType>(() => {
  if (isAdmin.value) {
    return [
      ...baseColumns,
      {
        title: 'Action',
        key: 'action',
        width: 120,
        customRender: ({ record }: any) =>
            h(
                Popconfirm,
                {
                  title: 'Delete this record?',
                  onConfirm: () => onDelete(record.id),
                },
                {
                  default: () =>
                      h(
                          Button,
                          { danger: true, size: 'small' },
                          { default: () => 'Delete' }
                      ),
                }
            ),
      },
    ];
  }
  return baseColumns;
});

const grouped = computed(() => {
  const map = new Map<string, number>();
  for (const o of store.orders.value) {
    map.set(o.project, (map.get(o.project) || 0) + o.hours);
  }
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
});

const chartLabels = computed(() => grouped.value.map(([name]) => name));
const chartValues = computed(() => grouped.value.map(([, hours]) => Number(hours.toFixed(2))));

function onLogout() {
  store.logout();
  router.push({ name: 'login' });
}
</script>

<style scoped lang="less">
.layout {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 16px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  .brand {
    font-weight: 600;
    font-size: 18px;
  }
}
.content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
