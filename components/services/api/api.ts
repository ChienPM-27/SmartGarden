export const BASE_URL = 'http://192.168.1.4:8080';

export const getWeather = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/weather`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Lỗi kết nối backend:', err);
    return null;
  }
};
