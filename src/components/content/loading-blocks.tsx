export function LoadingBlocks(props: { length?: number }) {
  return (
    <div className="w-full px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: props.length ?? 9 }).map((_, index) => (
        <div key={index} className="w-full h-40 rounded-lg bg-muted" />
      ))}
    </div>
  );
}
