import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { immudbBackendLink } from '@helpers/constans';

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
      const response = await fetch(`${immudbBackendLink}/api/accounting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();

      if (!response.ok) {
        const error = jsonResponse.error || '';

        triggerError(
          `Failed to send data with message: ${error}. Please try again.`,
        );
        throw new Error(error);
      }

      return jsonResponse;
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
