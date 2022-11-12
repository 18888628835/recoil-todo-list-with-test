import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../store/Atom';
// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}
//新增数据
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  //这里需要读写数据，所以用useSetRecoilState
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default TodoItemCreator;
