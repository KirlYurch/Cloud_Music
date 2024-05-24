export async function getTracks() {
    const res = await fetch(
        "https://skypro-music-api.skyeng.tech/catalog/track/all/"
    );
      if (!res.ok) {
        throw new Error("Ошибка при получении данных");
    }
    return res.json();
}     