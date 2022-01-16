export default
interface TaskInterface {
  id?: number;
  title: string;
  note?: string;
  important?: boolean;
  completed?: boolean;
  completed_at?: null | Date;
  due_at?: null | Date;
  created_at?: Date;
  updated_at?: Date;
}