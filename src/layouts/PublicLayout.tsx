import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}