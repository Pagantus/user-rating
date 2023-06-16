import { Button, Popconfirm } from 'antd';
import { DecreaseRatingError, IncreaseRatingError } from 'application/services/user';
import { IUser } from 'domain/entities/user';
import React from 'react';
import { useUserServices } from '../context';

type RatingButtonMode = 'increment' | 'decrement';

type RatingButtonProps = {
  user: IUser;
  mode: RatingButtonMode;
};

const buttonText: Record<RatingButtonMode, string> = {
  decrement: '-',
  increment: '+'
};

const RatingButton: React.FC<RatingButtonProps> = ({ user, mode }) => {
  const { userService } = useUserServices();
  const [popconfirmDescription, setIsPopconfirmDescription] = React.useState<string>();
  const [isPopconfirmVisible, setIsPopconfirmVisible] = React.useState<boolean>(false);

  const onRatingChange = () => {
    try {
      if (mode === 'increment') {
        userService.increaseRating(user);
      }

      if (mode === 'decrement') {
        userService.decreaseUserRating(user);
      }
    } catch (err) {
      const errInstance = mode === 'increment' ? IncreaseRatingError : DecreaseRatingError;
      if (err instanceof errInstance) {
        setIsPopconfirmDescription(err.message);
        setIsPopconfirmVisible(true);
      }
    }
  };

  const onPopconfirmClose = () => {
    setIsPopconfirmVisible(false);
  };

  const onUserBan = () => {
    userService.banUser(user);
  };

  return (
    <Popconfirm
      title='Требуется подтверждение'
      description={popconfirmDescription}
      okText='Да'
      cancelText='Нет'
      open={isPopconfirmVisible}
      onCancel={onPopconfirmClose}
      onConfirm={onUserBan}>
      <Button
        type='ghost'
        onClick={onRatingChange}>
        {buttonText[mode]}
      </Button>
    </Popconfirm>
  );
};

const DecreaseRatingButton: React.FC<Pick<RatingButtonProps, 'user'>> = ({ user }) => (
  <RatingButton
    mode='decrement'
    user={user}
  />
);

const IncreaseRatingButton: React.FC<Pick<RatingButtonProps, 'user'>> = ({ user }) => (
  <RatingButton
    mode='increment'
    user={user}
  />
);

export { DecreaseRatingButton, IncreaseRatingButton };
