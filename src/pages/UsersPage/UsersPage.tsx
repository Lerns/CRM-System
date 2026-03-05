import { Table } from 'antd';
import { User } from '../../types/typesUsers';
import { ColumnsType } from 'antd/es/table';
import Input from 'antd/es/input/Input';
import { useState, useEffect } from 'react';
import { getUsers } from '../../api/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const columns: ColumnsType<User> = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    {
      title: 'Имя',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
    },
    {
      title: 'Телефон',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Роли',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => roles.join(', ') || '-',
    },
    {
      title: 'Блокировка',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      render: (isBlocked: boolean) => (isBlocked ? 'Да' : 'Нет'),
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      key: 'date',
    },
    { title: 'Действия', key: 'actions', render: () => null },
  ];
  return (
    <div>
      <div>
        <h2>Пользователи</h2>
        <Input placeholder="Поиск по имени или email" />
      </div>
      ;
      <Table columns={columns} dataSource={users} rowKey="id" />
    </div>
  );
}
