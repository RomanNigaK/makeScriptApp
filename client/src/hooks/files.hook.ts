import { useCallback, useState } from "react";

export const useUpload = () => {
  const loadFile = useCallback(
    async (file: File, field: string, url: string) => {
      try {
        const formData = new FormData();

        formData.append(field, file);

        const data = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const audio = await data.json();

        if (!data.ok) {
          throw new Error(
            audio.message || "Что то пошло не так при загрузке фаила"
          );
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );
  const deleteFileFromServer = useCallback(
    async (name: string, url: string) => {
      try {
        const data = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ name }),
        });
        const img = await data.json();

        if (!data.ok) {
          throw new Error(
            img.message || "Что то пошло не так при загрузке фаила"
          );
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );

  return { loadFile, deleteFileFromServer };
};
