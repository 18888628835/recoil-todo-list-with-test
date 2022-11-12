import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { titleState } from '../store/Atom';

const getTitleData = () => {
  const api = 'https://api.github.com/users/18888628835';
  return fetch(api)
    .then((res) => res.json())
    .catch(() => 'title from fetch');
};
const Title = () => {
  const [title, setTitle] = useRecoilState(titleState);

  useEffect(() => {
    async function getAndSetTitle() {
      const res = await getTitleData();
      setTitle(res.login);
    }
    getAndSetTitle();
  }, [setTitle]);

  return <div>{title}</div>;
};

export default Title;
