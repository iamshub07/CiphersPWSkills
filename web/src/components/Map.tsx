import { api } from "@/utils/api";

const Map = ({
  search,
  mode,
  origin,
  destination,
}: {
  mode: "search" | "directions";
  search: string;
  origin: string;
  destination: string;
}) => {
  if (mode === "search") {
    const searchResult = api.google.search.useQuery(
      {
        search,
      },
      { refetchOnMount: false, refetchOnWindowFocus: false }
    );
    if (!searchResult.data) return <div>Loading...</div>;
    return (
      <iframe
        className="h-full w-full border-none"
        loading="lazy"
        src={searchResult.data}
      ></iframe>
    );
  } else if (mode === "directions") {
    const route = api.google.route.useQuery(
      {
        origin: origin,
        destination: destination,
      },
      { refetchOnMount: false, refetchOnWindowFocus: false }
    );
    if (!route.data) return <div>Loading...</div>;
    return (
      <iframe
        className="h-full w-full border-none"
        loading="lazy"
        src={route.data}
      ></iframe>
    );
  }
  return <div>Error...</div>;
};

export default Map;
