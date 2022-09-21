export interface Task {
  id: string;
  name: string;
  hour: number;
  minute: number;
  daysOfWeek: Array<string>;
  executionCommand: string;
  executeUntil: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export function compareTasks(t1: Task, t2: Task) {
  const result = t1.createdAt.getTime() - t2.createdAt.getTime();
  if (result > 0) {
    return 1;
  } else if (result < 0) {
    return -1;
  } else {
    return 0;
  }
}
