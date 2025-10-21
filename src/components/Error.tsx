interface ErrorPrors {
  title: string;
  message: string;
  onClose: () => void;
}

import { Alert } from 'antd';

export default function Error({ title, message, onClose }: ErrorPrors) {
  return (
    <Alert
      type="error"
      message={title}
      description={message}
      onClose={onClose}
    />
  );
}
