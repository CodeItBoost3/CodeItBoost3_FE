export default function PageContainer({ children, isEmpty, className }) {
  return (
    <main
      className={`flex flex-col w-full h-full ${className} ${
        isEmpty
          ? "mb-11 items-center justify-center rounded-l-[80px] bg-white shadow-card"
          : "pb-11 pl-3"
      }`}
    >
      {children}
    </main>
  );
}
