const ErrorNotification = ({ error }: { error: string | null }) => {
  return <div className="mt-4 p-4 bg-red-500 text-white rounded">{error}</div>;
};

export default ErrorNotification;
