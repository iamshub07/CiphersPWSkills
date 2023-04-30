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
    return (
      <iframe
        className="h-full w-full border-none"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAv-bbfkhKhpZM3nK7SWqQbgCei3ryZbwE&q=${search}`}
      ></iframe>
    );
  } else if (mode === "directions") {
    return (
      <iframe
        className="h-full w-full border-none"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAv-bbfkhKhpZM3nK7SWqQbgCei3ryZbwE&origin=${origin}&destination=${destination}&mode=driving`}
      ></iframe>
    );
  }
  return <div>Error...</div>;
};

export default Map;
