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
