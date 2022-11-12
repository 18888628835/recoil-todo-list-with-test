import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import App from './App';
import Save from './components/Save';
import Title from './components/Title';
import TodoItemCreator from './components/TodoItemCreator';
import { todoListState } from './store/Atom';
import TodoList from './TodoList';

/* 
<input type="text" value={inputValue} onChange={onChange} />;
*/
it('input can be typed', () => {
  render(<TodoItemCreator />);
  const inputEl = screen.getByRole('textbox');
  userEvent.type(inputEl, 'type some text ');
  expect(inputEl.getAttribute('value')).toBe('type some text ');
  userEvent.type(inputEl, 'continue');
  expect(inputEl.getAttribute('value')).not.toBe('continue');
  expect(screen.getByDisplayValue('type some text continue')).toBeInTheDocument();
});

/**
  const options = [
    { label: 'All', value: 'Show All' },
    { label: 'Completed', value: 'Show Completed' },
    { label: 'Uncompleted', value: 'Show Uncompleted' },
  ]; 
  <select>
  {options.map(({ label, value }, index) => (
    <option key={index} value={value} data-testid="select-option">
      {label}
    </option>
  ))}
</select> 
 */

it.skip('select options', () => {
  render(<App />);
  const options = screen.getAllByTestId('select-option');
  expect(options[0].getAttribute('value')).toBe('Show All');
  expect(options[1].getAttribute('value')).toBe('Show Completed');
  expect(options[2].getAttribute('value')).toBe('Show Uncompleted');
});
/**
 useEffect(() => {
    const dataFromDB = [
      { label: 'All', value: 'Show All', disabled: false },
      { label: 'Completed', value: 'Show Completed', disabled: false },
      { label: 'Uncompleted', value: 'Show Uncompleted', disabled: true },
    ];
    Promise.resolve(dataFromDB).then((res) => setOptions([...res]));
  }, []);
 */
it('async get select options', async () => {
  render(<App />);
  const options = await screen.findAllByTestId('select-option');
  expect(options[0].getAttribute('value')).toBe('Show All');
  expect(options[1].getAttribute('value')).toBe('Show Completed');
  expect(options[2].getAttribute('value')).toBe('Show Uncompleted');
});

it('default select-option', async () => {
  render(<App />);
  const options = await screen.findAllByTestId('select-option');
  expect((options[0] as HTMLOptionElement).selected).toBeTruthy();
  expect((options[1] as HTMLOptionElement).selected).toBeFalsy();
  expect((options[2] as HTMLOptionElement).selected).toBeFalsy();
});

it('select-option selected', async () => {
  render(<App />);
  const selectEl = await screen.findByRole('combobox');
  const options = await screen.findAllByTestId('select-option');
  userEvent.selectOptions(selectEl, options[1]);
  expect((options[0] as HTMLOptionElement).selected).toBeFalsy();
  expect((options[1] as HTMLOptionElement).selected).toBeTruthy();
  expect((options[2] as HTMLOptionElement).selected).toBeFalsy();
});

it('one select-option is disabled', async () => {
  render(<App />);
  const options = await screen.findAllByTestId('select-option');
  // The following code will report an error
  // userEvent.selectOptions(selectEl, options[3]);
  expect(options[2]).toBeDisabled();
});

/**
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
 */
it('should render list of 4 list-items', async () => {
  render(<App />);
  await waitFor(() => {
    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(4);
  });
});

it('match snapshot', async () => {
  const { asFragment } = render(<App />);
  await screen.findAllByTestId('select-option');
  expect(asFragment()).toMatchSnapshot();
});

it('add Item', async () => {
  render(<App />);
  const inputEl = screen.getByRole('textbox');
  const buttonEl = screen.getByRole('button', { name: /add/i });
  userEvent.type(inputEl, 'item1');
  userEvent.click(buttonEl);
  await act(async () => Promise.resolve());
  expect(await screen.findByDisplayValue('item1')).toBeInTheDocument();
  expect(screen.queryByDisplayValue('item2')).toBeNull();
  expect(screen.queryByDisplayValue('item3')).not.toBeInTheDocument();
});

it('delete Item', async () => {
  render(<App />);
  const inputEl = screen.getByRole('textbox');
  const buttonEl = screen.getByRole('button', { name: /add/i });
  userEvent.type(inputEl, 'item1');
  userEvent.click(buttonEl);
  await act(() => Promise.resolve());
  const todoItem = screen.getByTestId('todo-item-0');
  const { findByRole } = within(todoItem);
  const deleteEl = await findByRole('button', { name: /x/i });
  userEvent.click(deleteEl);
  expect(screen.queryByDisplayValue('item1')).toBeNull();
  // expect(await screen.findByDisplayValue('item1')).toBeInTheDocument();
});

describe('the recoil todoListState should', () => {
  // @ts-ignore
  const RecoilObserver = ({ state, onChange }) => {
    const value = useRecoilValue(state);
    useEffect(() => onChange(value), [onChange, value]);
    return null;
  };
  it('be change when user click add button and x button', async () => {
    const onChange = jest.fn();
    render(
      <RecoilRoot>
        <RecoilObserver state={todoListState} onChange={onChange} />
        <TodoList />
      </RecoilRoot>
    );
    const inputEl = await screen.findByRole('textbox');
    const buttonEl = await screen.findByRole('button', { name: /add/i });
    // the following code will report error: act(...)
    //const inputEl = screen.getByRole('textbox');
    //const buttonEl = screen.getByRole('button', { name: /add/i });
    userEvent.type(inputEl, 'item1');
    userEvent.click(buttonEl);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith([]);
    expect(onChange).toHaveBeenCalledWith([{ id: expect.any(Number), isComplete: false, text: 'item1' }]);

    const todoItem = screen.getByTestId('todo-item-0');
    const { findByRole } = within(todoItem);
    const deleteEl = await findByRole('button', { name: /x/i });
    userEvent.click(deleteEl);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('async get data from backend', async () => {
    const mockState = { login: 'test title' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockState),
      })
    ) as jest.Mock;

    render(
      <RecoilRoot>
        <Title />
      </RecoilRoot>
    );
    expect(await screen.findByText(mockState.login)).toBeInTheDocument();
  });

  it('save data', async () => {
    global.fetch = jest.fn() as jest.Mock;
    render(
      <RecoilRoot>
        <Save />
      </RecoilRoot>
    );
    const buttonEl = screen.getByRole('button', { name: /Save/i });
    userEvent.click(buttonEl);
    expect(global.fetch).toBeCalledTimes(1);
  });
});
