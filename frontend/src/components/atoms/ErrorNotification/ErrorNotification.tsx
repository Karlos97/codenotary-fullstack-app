const ErrorNotification = ({
  visible,
  error,
}: {
  visible: boolean;
  error: string | null;
}) => {
  return (
    visible &&
    error && (
      <div className="mt-4 p-4 bg-red-500 text-white rounded">{error}</div>
    )
  );
};

export default ErrorNotification;
