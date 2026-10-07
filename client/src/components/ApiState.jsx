/** Loading / error placeholder for API-backed lists and detail pages. */
export default function ApiState({ loading, error, className = '' }) {
  if (loading) {
    return <p className={`text-[18px] text-[#001017] my-auto ${className}`}>Loading...</p>;
  }
  if (error) {
    return (
      <p role="alert" className={`text-2xl text-red-600 my-auto font-semibold ${className}`}>
        {error.message}
      </p>
    );
  }
  return null;
}
