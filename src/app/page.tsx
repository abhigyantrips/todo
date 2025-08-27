import { QuickAddTask } from '@/components/quick-add-task';
import { TasksList } from '@/components/task-list';

export default function Home() {
  return (
    <div className="mx-auto h-full max-w-screen-md space-y-4 py-8">
      <TasksList />
      <QuickAddTask />
    </div>
  );
}
