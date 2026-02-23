import { Alert, AlertProps } from 'antd';

interface ErrorProps extends Pick<
  AlertProps,
  'type' | 'showIcon' | 'closable'
> {
  title?: string;
  message: string;
  onClose: () => void;
}

export default function Error({
  title = 'Ошибка',
  message,
  onClose,
  type = 'error',
  showIcon = true,
  closable = true,
}: ErrorProps) {
  return (
    <Alert
      type={type}
      message={title}
      description={message}
      onClose={onClose}
      showIcon={showIcon}
      closable={closable}
    />
  );
}
