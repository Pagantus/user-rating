import React from 'react';
import { Col, Row, Tabs } from 'antd';
import { BaseListItem, RatingListItem, UserList } from 'presentation/user/components';
import { useQuery } from 'presentation/hooks';
import { useUserStore } from 'presentation/user/state';
import { useUserServices } from 'presentation/user/context';
import { IUser, UserStatus } from 'domain/entities/user';

type UserData = { baseUsers: IUser[]; positiveUsers: IUser[]; negativeUsers: IUser[] };

const App: React.FC = () => {
  const users = useUserStore((state) => state.users);
  const { userListService } = useUserServices();
  const { isLoading } = useQuery(() => userListService.getUsers());

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

  return (
    <div className='App'>
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <UserList
            isLoading={isLoading}
            users={baseUsers}
            item={BaseListItem}
          />
        </Col>
        <Col span={12}>
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
