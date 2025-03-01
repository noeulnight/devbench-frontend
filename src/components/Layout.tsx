import Container from "./Container";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen bg-[#1A1A1A] text-white font-plus-jakarta-sans">
      <Header />
      <Container>{children}</Container>
    </div>
  );
}
