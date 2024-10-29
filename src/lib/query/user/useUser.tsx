import api from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface UserResponse {
  id: string;
  name: string;
  email: string;
  defaultWorkspace: string;
  image: string;
  updatedAt: string;
  // Replace 'any' with the actual type of the response object
}

const getUserFetcher = async (id: string): Promise<UserResponse> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data.responseObject;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user data");
  }
};

const updateUserNameFetcher = async (id: string, name: string) => {
  try {
    const response = await api.put(`/users/${id}`, { name });
    return response.data.responseObject;
  } catch (error) {
    console.error("Error updating user name:", error);
    throw new Error("Failed to update user name");
  }
};

const updateUserDefaultWorkspaceFetcher = async (
  id: string,
  defaultWorkspace: string
) => {
  try {
    const response = await api.put(`/users/${id}/defaultWorkspace`, {
      defaultWorkspace,
    });
    return response.data.responseObject;
  } catch (error) {
    console.error("Error updating user default workspace:", error);
    throw new Error("Failed to update user default workspace");
  }
};

const deleteUserFetcher = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data.responseObject;
  } catch (error) {
    console.error("Error deleting user:", error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error((error as any).response.data.message);
  }
};

export function useUser() {
  const { data: session } = useSession();
  return useQuery<UserResponse>({
    queryKey: ["user", session?.user?.id],
    queryFn: () => getUserFetcher(session?.user?.id as string),
    enabled: !!session?.user?.id,
  });
}

export function useUpdateUserName() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      updateUserNameFetcher(session?.user?.id as string, name),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["user", session?.user?.id],
      }),
  });
}

export function useUpdateUserDefaultWorkspace() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (defaultWorkspace: string) =>
      updateUserDefaultWorkspaceFetcher(
        session?.user?.id as string,
        defaultWorkspace
      ),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["user", session?.user?.id],
      }),
  });
}

export function useDeleteUser() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUserFetcher(session?.user?.id as string),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["user", session?.user?.id],
      }),
  });
}
