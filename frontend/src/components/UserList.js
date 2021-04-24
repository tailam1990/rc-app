import React, { memo, useEffect, useState } from 'react';
import { removeUser, getUsers } from '../services/users';
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';
import './UserList.css';

const supportedImgFormat = ['.png', '.jpg', '.jpeg', '.webp'];

function toDisplay(value, type) {
  if (value == null) return '';
  switch (type) {
    case 'image':
      return <img src={value} alt="" />
    case 'email':
      return <a href={`mailto:${value}`}>{value}</a>;
    default:
      return value == null ? '' : `${value}`;
  }
}

function getColumnType(v) {
  if (isEmail(v)) {
    return 'email';
  } else if (isURL(v)) {
    const ext = v.substring(v.lastIndexOf('.'));
    return supportedImgFormat.includes(ext) ? 'image' : 'text';
  }
  return 'text';
}

const UserRow = memo(
  function UserRow({ user, columns, onRemove }) {
    const [isLoading, setIsLoading] = useState(false);

    function handleRemoveClick() {
      if (!isLoading) {
        setIsLoading(true);
        removeUser(user.id)
          .then(() => onRemove && onRemove(user.id))
          .catch((ex) => console.error(ex))
          .finally(() => setIsLoading(false));
      }
    }

    return (
      <tr>
        {columns.map((c) => <td key={c.name}>{toDisplay(user[c.name], c.type)}</td>)}
        <td>
          <button type="button" className="btn-remove" onClick={handleRemoveClick}>{isLoading ? <div className="loader" /> : 'X'}</button>
        </td>
      </tr>
    )
  }
);

export default memo(
  function UserList() {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getUsers()
        .then((users) => {
          const [user] = users;
          setUsers(users);
          if (user) {
            const orderedCols = ['id', ...Object.keys(user).filter((k) => k !== 'id').sort((a, b) => a.localeCompare(b))];
            setColumns(orderedCols.map((k) => ({ name: k, type: getColumnType(user[k]) })));
          }
        })
        .catch((ex) => setMessage(ex.message))
        .finally(() => setIsLoading(false));
    }, []);

    function handleRemove(id) {
      setImmediate(() => {
        setUsers((users) => users.filter((u) => u.id !== id));
      });
    }

    return (
      <>
        {!isLoading && (
          <table className="users">
            <caption><h1>User List ({users.length})</h1></caption>
            <thead>
              <tr>
                {columns.map((h) => <th key={h.name}>{h.name}</th>)}
                <td></td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => <UserRow key={user.id} columns={columns} user={user} onRemove={handleRemove} />)}
            </tbody>
          </table>
        )}
        {isLoading && <h1>Loading...</h1>}
        <pre className="error">{message}</pre>
      </>
    )
  }
);
