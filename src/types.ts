export interface WorkOrder {
    id: string;
    project: string;
    overtime: boolean;
    hours: number;
    created_at: string; // "YYYY-MM-DD HH:mm"
}

export type Role = 'admin' | 'user';

export interface UserState {
    username: string | null;
    role: Role | null;
    loggedIn: boolean;
}
