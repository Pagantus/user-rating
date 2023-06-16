import { IUser } from 'domain/entities/user';
import { Avatar, List, Button } from 'antd';
import React from 'react';
import { DecreaseRatingButton, IncreaseRatingButton } from './RatingButton';
import { useUserServices } from '../context';

type ListItem = React.FC<{ user: IUser }>;

type UserListProps = {
  users: IUser[];
  item: ListItem;
  isLoading?: boolean;
};

const UserList: React.FC<UserListProps> = ({ users, item: ListItem, isLoading }) => {
  return (
    <List
      loading={isLoading}
      itemLayout='horizontal'
      size='large'>
      {users.map((user) => (
        <ListItem
          key={user.id}
          user={user}
        />
      ))}
    </List>
  );
};

const RatingListItem: React.FC<{ user: IUser }> = React.memo(({ user }) => {
  const { userService } = useUserServices();

  const onUserDelete = () => {
    userService.deleteUser(user);
  };

  return (
    <List.Item
      actions={[
        user.rating === 0 ? (
          <Button
            type='link'
            onClick={onUserDelete}>
            Удалить
          </Button>
        ) : undefined,
        <DecreaseRatingButton
          key='decrease'
          user={user}
        />,
        <span key='rating'>{user.rating}</span>,
        <IncreaseRatingButton
          key='increase'
          user={user}
        />
      ].filter((action) => action !== undefined)}>
      <List.Item.Meta
        avatar={<Avatar src={`https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg`} />}
        title={user.username}
        description={user.companyName}
      />
    </List.Item>
  );
});

const BaseListItem: React.FC<{ user: IUser }> = React.memo(({ user }) => {
  return (
    <List.Item
      actions={[
        <DecreaseRatingButton
          key='decrease'
          user={user}
        />,
        <IncreaseRatingButton
          key='increase'
          user={user}
        />
      ]}>
      <List.Item.Meta
        avatar={<Avatar src={`https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg`} />}
        title={user.username}
        description={user.companyName}
      />
    </List.Item>
  );
});

export { UserList, RatingListItem, BaseListItem };
