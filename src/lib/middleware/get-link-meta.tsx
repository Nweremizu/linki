export async function getLinkMetadata(key: string, clicked = false) {
  const res = await fetch(
    `http:localhost:4000/links/${key}/metadata?clicked=${clicked}`
  );
  const res_1 = await res.json();
  //   console.log(res_1);
  return res_1.responseObject;
}
