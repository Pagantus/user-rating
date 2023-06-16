import React from 'react';
import { Col, Row, Tabs, Button, Space, Result } from 'antd';
import { BaseListItem, RatingListItem, UserList } from 'presentation/user/components';
import { useQuery } from 'presentation/hooks';
import { useUserStore } from 'presentation/user/state';
import { useUserServices } from 'presentation/user/context';
import { IUser, UserStatus } from 'domain/entities/user';

type UserData = { baseUsers: IUser[]; positiveUsers: IUser[]; negativeUsers: IUser[] };

const App: React.FC = () => {
  const users = useUserStore((state) => state.users);
  const { userListService } = useUserServices();
  const { isLoading, refetch, loadMore, error } = useQuery({
    fetchFn: () => userListService.fetchUsers(),
    loadMoreFn: () => userListService.loadMore(),
    canStart: !users.length
  });

  const { baseUsers, positiveUsers, negativeUsers } = React.useMemo(() => {
    return users.reduce<UserData>(
      (acc, user) => {
        if (user.status === UserStatus.BASE) {
          acc.baseUsers.push(user);
        }

        if (user.status === UserStatus.POSITIVE) {
          acc.positiveUsers.push(user);
        }

        if (user.status === UserStatus.NEGATIVE) {
          acc.negativeUsers.push(user);
        }

        return acc;
      },
      { baseUsers: [], positiveUsers: [], negativeUsers: [] }
    );
  }, [users]);

  const onRefreshUsers = () => {
    refetch();
  };

  const onLoadMoreUsers = () => {
    loadMore();
  };

  if (error) {
    return (
      <Result
        status='error'
        title='Произошла ошибка при получении данных'
      />
    );
  }

  return (
    <div className='App'>
      <Row gutter={[16, 8]}>
        <Col
          span={12}
          key='base'>
          <Row>
            <Col span={24}>
              <Space style={{ marginBottom: 16, height: 46 }}>
                <Button onClick={onRefreshUsers}>Обновить</Button>
                <Button onClick={onLoadMoreUsers}>Загрузить еще</Button>
              </Space>
            </Col>
            <Col span={24}>
              <UserList
                isLoading={isLoading}
                users={baseUsers}
                item={BaseListItem}
              />
            </Col>
          </Row>
        </Col>
        <Col
          span={12}
          key='rating'>
          <Tabs
            items={[
              {
                label: 'Положительные',
                key: 'positive',
                children: (
                  <UserList
                    users={positiveUsers}
                    item={RatingListItem}
                  />
                )
              },
              {
                label: 'Отрицательные',
                key: 'negative',
                children: (
                  <UserList
                    users={negativeUsers}
                    item={RatingListItem}
                  />
                )
              }
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export { App };
