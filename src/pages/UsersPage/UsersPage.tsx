import {
  Button,
  Dropdown,
  Input,
  Modal,
  Table,
  notification,
  Switch,
  Select,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectUsers,
  selectUsersStatus,
  selectDeletingId,
  selectUserError,
  selectUsersMeta,
} from '../../store/users/selectors';

import { fetchUsersThunk } from '../../store/users/thunks/fetchUsersThunk';
import { deleteUserThunk } from '../../store/users/thunks/deleteUserThunk';
import {
  blockUserThunk,
  unblockUserThunk,
} from '../../store/users/thunks/isBlockedUserThink';
import { updateUserRightsThunk } from '../../store/users/thunks/updateUserRightsThunk';
import { clearError } from '../../store/users/slices/usersSlice';
import { usePermissions } from '../../helpers/usePermissions';
import { getErrorMessage } from '../../helpers/errorMessage';
import Error from '../../components/Error';
import type { User, UserFilters } from '../../types/typesUsers';
import { Roles } from '../../types/typesUsers';
import { debounce } from 'lodash';

export default function UsersPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAdmin, canModerate } = usePermissions();

  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectUsersStatus);
  const deletingId = useAppSelector(selectDeletingId);
  const error = useAppSelector(selectUserError);
  const meta = useAppSelector(selectUsersMeta);

  const isLoading = status === 'loading';
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 20,
    search: '',
  });
  const [editingRoles, setEditingRoles] = useState<{
    id: number;
    roles: Roles[];
  } | null>(null);

  useEffect(() => {
    {
      dispatch(fetchUsersThunk(filters));
    }
  }, [filters, dispatch]);

  const handleSearchDebounced = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({
        ...prev,
        search: value,
        page: 1,
      }));
    }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      handleSearchDebounced.cancel();
    };
  }, [handleSearchDebounced]);

  const handleOpenProfile = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  const handleDelete = (user: User) => {
    Modal.confirm({
      title: 'Удалить профиль',
      content: `Удалить пользователя ${user.username}?`,
      okText: 'Да',
      cancelText: 'Нет',
      okType: 'danger',
      onOk: async () => {
        try {
          await dispatch(deleteUserThunk(user.id)).unwrap();
          notification.success({ message: 'Пользователь удалён' });
        } catch (err) {
          notification.error({
            message: 'Ошибка',
            description:
              getErrorMessage(err) || 'Ошибка при удалении пользователя',
          });
        }
      },
    });
  };

  const handleToggleBlock = (user: User) => {
    Modal.confirm({
      title: user.isBlocked ? 'Разблокировать?' : 'Заблокировать?',
      content: user.username,
      onOk: async () => {
        try {
          if (user.isBlocked) {
            await dispatch(unblockUserThunk({ id: user.id })).unwrap();
          } else {
            await dispatch(blockUserThunk({ id: user.id })).unwrap();
          }

          notification.success({ message: 'Успешно' });
        } catch (err) {
          notification.error({
            message: 'Ошибка',
            description:
              getErrorMessage(err) ||
              'Ошибка при удалении смене статуса блокировки',
          });
        }
      },
    });
  };

  const handleEditRoles = (user: User) => {
    setEditingRoles({ id: user.id, roles: [...user.roles] });
  };
  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    setFilters((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
      sortBy: sorter?.field ?? prev.sortBy,
      sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc',
    }));
  };

  const getMenuItems = (user: User) => [
    ...(canModerate
      ? [
          {
            key: 'profile',
            label: 'Перейти к профилю',
            onClick: () => handleOpenProfile(user.id),
          },
        ]
      : []),

    ...(isAdmin
      ? [
          {
            key: 'delete',
            label: 'Удалить профиль',
            danger: true,
            onClick: () => handleDelete(user),
          },
        ]
      : []),
  ];

  const columns: ColumnsType<User> = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      sortOrder:
        filters.sortBy === 'username'
          ? filters.sortOrder === 'asc'
            ? 'ascend'
            : 'descend'
          : null,
    },
    {
      title: 'Email пользователя',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortOrder:
        filters?.sortBy === 'email'
          ? filters.sortOrder === 'asc'
            ? 'ascend'
            : 'descend'
          : null,
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Блокировка',
      key: 'block',
      render: (_: any, user: User) => (
        <Switch
          checked={!user.isBlocked}
          onChange={() => handleToggleBlock(user)}
          checkedChildren="Активен"
          unCheckedChildren="Заблокирован"
        />
      ),
    },
    {
      title: 'Роли',
      key: 'roles',
      render: (_, user) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <span>{user.roles.join(', ') || '-'}</span>
          {isAdmin && (
            <Button size="small" onClick={() => handleEditRoles(user)}>
              Изменить
            </Button>
          )}
        </div>
      ),
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Dropdown menu={{ items: getMenuItems(record) }} trigger={['click']}>
          <Button
            type="text"
            icon={<MoreOutlined />}
            size="small"
            disabled={deletingId === record.id}
          />
        </Dropdown>
      ),
    },
  ];
  if (error) {
    return <Error message={error} onClose={() => dispatch(clearError())} />;
  }

  return (
    <div>
      <h2>Пользователи</h2>
      <Input
        placeholder="Поиск по имени или email"
        style={{ marginBottom: 16, width: 300 }}
        defaultValue={filters.search || ''}
        onChange={(e) => handleSearchDebounced(e.target.value)}
        allowClear
      />
      <Table<User>
        columns={columns}
        dataSource={users ?? []}
        rowKey="id"
        loading={isLoading}
        onChange={handleTableChange}
        pagination={{
          current: filters.page ?? 1,
          pageSize: filters.limit ?? 20,
          total: meta?.totalAmount ?? 0,
        }}
      />
      {editingRoles && (
        <Modal
          title={`Изменить роли для пользователя`}
          open={!!editingRoles}
          okText="Сохранить"
          cancelText="Отмена"
          onCancel={() => setEditingRoles(null)}
          onOk={async () => {
            try {
              await dispatch(
                updateUserRightsThunk({
                  id: editingRoles.id,
                  data: { roles: editingRoles.roles },
                }),
              ).unwrap();

              notification.success({ message: 'Роли обновлены' });
              setEditingRoles(null);
            } catch (err) {
              notification.error({
                message: 'Ошибка',
                description: getErrorMessage(err) || 'Ошибка при смене ролей',
              });
            }
          }}
        >
          <Select
            mode="multiple"
            value={editingRoles.roles}
            onChange={(roles) =>
              setEditingRoles((prev) =>
                prev ? { ...prev, roles: roles as Roles[] } : null,
              )
            }
            style={{ width: '100%' }}
            options={Object.values(Roles).map((role) => ({
              label: role,
              value: role,
            }))}
          />
        </Modal>
      )}
    </div>
  );
}
