"use client";

interface Props {
  error: Error;
}

const ErrorPage = ({ error }: Props) => {
  return (
    <div className="flex flex-col">
      <h2>Error Page</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
