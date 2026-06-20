const Loader = () => (
  <div className="flex flex-col gap-3">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-14" />
    ))}
  </div>
);

export default Loader;
