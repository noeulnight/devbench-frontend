export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full p-3 md:mt-10 mt-4">{children}</div>;
}
