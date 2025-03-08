export function FetchError(props: { message?: string }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">An error occurred</h1>
      <p className="text-muted-foreground">
        {props.message ?? "Unable to fetch data. Please try again later."}
      </p>
    </div>
  );
}
