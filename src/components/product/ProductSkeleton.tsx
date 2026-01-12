export function ProductSkeleton() {
  return (
    <div className="bg-white border border-gray-50 rounded-[2.5rem] p-6 flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square mb-6 bg-gray-100 rounded-3xl" />
      
      {/* Text Skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
        <div className="flex items-center gap-3 mt-4">
          <div className="h-6 bg-gray-100 rounded-lg w-20" />
          <div className="h-4 bg-gray-100 rounded-lg w-16" />
        </div>
      </div>
      
      {/* Button Skeleton */}
      <div className="h-12 bg-gray-100 rounded-2xl mt-auto" />
    </div>
  );
}