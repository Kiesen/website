export type PartialSongData = {
  artists: {
    href: string;
    name: string;
  }[];
  album: {
    name: string;
    images: {
      height: number;
      width: number;
      url: string;
    }[];
  };
};

export type CurrentlyPlayingResponse = {
  item: PartialSongData;
};

export type RecentlyPlayedResponse = {
  items: {
    item: PartialSongData;
  }[];
};
