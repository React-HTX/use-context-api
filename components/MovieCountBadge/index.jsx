const MovieCountBadge = ({ count }) => {
  return (
    <span className="inline-block absolute -top-2 -right-2 text-center h-6 w-6 bg-white rounded-full text-blue-500">
      {count}
    </span>
  );
};

export default MovieCountBadge;
