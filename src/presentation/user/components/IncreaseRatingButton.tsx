import { Button } from 'antd';
import { IUser } from 'domain/entities/user';
import React from 'react';
import { useUserServices } from '../context';

type IncreaseRatingButtonProps = {
  user: IUser;
};

const IncreaseRatingButton: React.FC<IncreaseRatingButtonProps> = ({ user }) => {
  const { userService } = useUserServices();

  const onRatingIncrease = () => {
    userService.increaseRating(user);
  };

  return (
    <Button
      type='ghost'
      onClick={onRatingIncrease}>
      +
    </Button>
  );
};

export { IncreaseRatingButton };
