"use client";
import CenterBlock from "@components/CenterBlock/CenterBlock";
import { useEffect, useState } from "react";
import { trackType } from "@/types";
import { getTracks } from "@/api/tracks";

export default function Main() {

  const [tracks, setTracks] = useState<trackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTracks()
      .then((data) => {
        setTracks(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке треков");
        setIsLoading(false);
      });
  }, []);

  return (
    
        <CenterBlock tracks={tracks} isLoading={isLoading} error={error}/>
  );
}
