// components/Skeleton.js
export const Skeleton = ({ type }) => {
  if (type === "pricing") {
    return (
      <div className="space-y-4">
        {/* Skeleton Title */}
        <div className="h-8 w-3/5 bg-gray-300 rounded-lg" />
        {/* Skeleton Body 1 */}
        <div className="h-4 w-full bg-gray-200 rounded-lg" />
        {/* Skeleton Body 2 */}
        <div className="h-4 w-full bg-gray-200 rounded-lg" />
      </div>
    );
  } else if (type === "cta") {
    return (
      <div className="space-y-4">
        {/* Skeleton Text */}
        <div className="h-6 w-4/5 bg-gray-300 rounded-lg" />
        {/* Skeleton Button */}
        <div className="h-10 w-32 bg-gray-300 rounded-lg" />
      </div>
    );
  }
  return null;
};
