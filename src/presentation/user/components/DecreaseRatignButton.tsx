import Button from 'antd/es/button';
import { IUser } from 'domain/entities/user';
import React from 'react';
import { useUserServices } from '../context';

type DecreaseRatingButtonProps = {
  user: IUser;
};

const DecreaseRatingButton: React.FC<DecreaseRatingButtonProps> = ({ user }) => {
  const { userService } = useUserServices();

  const onRatingDecrease = () => {
    userService.decreaseUserRating(user);
  };

  return (
    <Button
      type='ghost'
      onClick={onRatingDecrease}>
      -
    </Button>
  );
};

export { DecreaseRatingButton };
