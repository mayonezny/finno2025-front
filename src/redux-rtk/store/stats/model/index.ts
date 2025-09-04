export const saveReports = (data: unknown) => {
  try {
    localStorage.setItem('reports', JSON.stringify(data));
  } catch (err) {
    console.error('Ошибка при сохранении данных в localStorage:', err);
  }
};

export const loadReports = <T>(fallback: T): T => {
  try {
    const raw = localStorage.getItem('reports');
    if (!raw) {
      console.log('не получилось взять с локалстореджа');
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error('Ошибка при загрузке данных из localStorage:', err);
    return fallback;
  }
};
