import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  type,
  genres,
  setPage,
  setGenres,
}) => {
  const API_KEY = "4bc6bc624f6dd482f00b528d18487a9e";
  
  const handleAdd = (genre) => {
    //   console.log(genre);
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
        selectedGenres.filter((selected)=>selected.id !== genre.id)
    );
    setGenres([...genres,genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
    );
    console.log(data);
    setGenres(data.genres);
  };
  console.log(genres);

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);  //unmounting
    };
    // eslint-disable-next-line
  }, []);

//   console.log(handleAdd())
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres?.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            color="primary"
            size="small"
            key={genre.id}
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres?.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            size="small"
            key={genre.id}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
