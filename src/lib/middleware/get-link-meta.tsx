export async function getLinkMetadata(key: string, clicked = false) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/links/${key}/metadata?clicked=${clicked}`
  );
  const res_1 = await res.json();
  //   console.log(res_1);
  return res_1.responseObject;
}
