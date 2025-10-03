export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  createdBy: string;
}

export interface TodoFormData {
  title: string;
}
