export async function getTracks() {
    const res = await fetch(
        "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/"
    );
      if (!res.ok) {
        throw new Error("Ошибка при получении данных");
    }
    return res.json();
}     

export async function fetchGetFavoriteTracks(access: string) {
    const response = await fetch(
      "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/",
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    return response.json();
  }

  export async function deleteFavoriteTracks(access: string, id: number ) {
    const response = await fetch(
      `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    return response.json();
  }

  export async function favoriteTracks(access: string, id: number ) {
    const response = await fetch(
      `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    return response.json();
  }