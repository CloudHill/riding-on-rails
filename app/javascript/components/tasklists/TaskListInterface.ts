import TaskInterface from "../tasks/TaskInterface";

export default
interface TaskListInterface {
  id: number;
  name: string;
  tasks?: TaskInterface[];
}