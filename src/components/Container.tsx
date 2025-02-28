export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full md:w-[700px] mx-auto p-3 md:mt-20 mt-4">
      {children}
    </div>
  );
}
