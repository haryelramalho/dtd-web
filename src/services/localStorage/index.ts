const STORAGE_PREFIX = '@dtd';

export const getItem = (key: string) => localStorage.getItem(`${STORAGE_PREFIX}/${key}`);

export const setItem = (key: string, data: string) => localStorage.setItem(`${STORAGE_PREFIX}/${key}`, data);

export const removeItem = (key: string) => localStorage.removeItem(`${STORAGE_PREFIX}/${key}`);
