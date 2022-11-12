import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListFilterState } from '../store/Atom';

//设置 filter 数据
function TodoListFilters() {
  //这里需要读写数据，所以用useRecoilState
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  const [options, setOptions] = useState<{ label: string; value: string; disabled: boolean }[]>([]);

  useEffect(() => {
    const dataFromDB = [
      { label: 'All', value: 'Show All', disabled: false },
      { label: 'Completed', value: 'Show Completed', disabled: false },
      { label: 'Uncompleted', value: 'Show Uncompleted', disabled: true },
    ];
    Promise.resolve(dataFromDB).then((res) => setOptions([...res]));
  }, []);

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        {options.map(({ label, value, disabled }, index) => (
          <option key={index} value={value} disabled={disabled} data-testid="select-option">
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
export default TodoListFilters;
