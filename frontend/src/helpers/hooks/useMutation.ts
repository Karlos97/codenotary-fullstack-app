import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

interface UseApiMutation {
  queryKey: string[];
  triggerError: (message: string) => void;
}

const useApiMutation = ({
  queryKey,
  triggerError,
}: UseApiMutation): UseMutationResult => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${import.meta.env.VITE_IMMUDB_LOCALHOST_BACKEND_LINK}/api/accounting`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to add record');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: Error) => {
      triggerError(
        `Failed to send data with message: ${error?.message}. Please try again.`,
      );
    },
  });
};

export default useApiMutation;
