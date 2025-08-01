export const DividerWithTextHr = ({ text }) => {
  return (
    <div className="divide-y w-full h-[1px] bg-gray-300 my-6 grid place-content-center">
      <span className="inline-block bg-white px-3">{text}</span>
    </div>
  );
};

export const Container = ({ children }) => {
  return <div className="max-w-[1200px] mx-auto px-4">{children}</div>;
};
