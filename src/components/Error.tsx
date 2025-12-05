interface ErrorProps {
  title: string;
  message: string;
  onClose: () => void;
}

import { Alert } from 'antd';

export default function Error({ title, message, onClose }: ErrorProps) {
  return (
    <Alert
      type="error"
      message={title}
      description={message}
      onClose={onClose}
    />
  );
}
