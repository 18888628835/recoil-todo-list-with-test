import { useRecoilValue } from 'recoil';
import { todoListStatusState } from '../store/Atom';

function TodoListStatus() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } = useRecoilValue(todoListStatusState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}
export default TodoListStatus;
