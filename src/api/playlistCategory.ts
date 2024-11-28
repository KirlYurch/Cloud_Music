export async function playlistCategory(_id: string | string[]) {
  const id = Number(_id) + 1;
  
  const response = await fetch(
    `https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/${id}`
  );
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return response.json();
}
