// // A fetch call that is made to the backend to get the default workspace of the user.

// import api from "../axios";

// export const fetchDefaultWorkspace = async (userId: string) => {
//   try {
//     const { data } = await api.get(`/default/${userId}`);
//     return data.responseObject as { defaultWorkspace: string | null };
//   } catch (error) {
//     // console.error(error);
//     return { defaultWorkspace: null };
//   }
// };

export const getdefaultWorkspace = async (
  userId: string,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/workspaces/default/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        cache: "default",
      }
    );

    const data = await response.json();

    return data.responseObject as { defaultWorkspace: string | null };
  } catch (error) {
    // console.error(error);
    return { defaultWorkspace: null };
  }
};
