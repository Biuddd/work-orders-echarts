import type { WorkOrder } from './types';

export const initialOrders: WorkOrder[] = [
    { id: '001', project: 'Road Construction Project A',      overtime: true,  hours: 3.25, created_at: '2025-08-20 17:40' },
    { id: '002', project: 'Lighting Maintenance B', overtime: false, hours: 3.30,   created_at: '2025-08-20 17:40' },
    { id: '003', project: 'Project A',       overtime: true,  hours: 4.20, created_at: '2025-08-20 17:40' },
    { id: '005', project: 'Project C Project A',    overtime: false, hours: 4.10, created_at: '2025-08-20 17:40' },
];
