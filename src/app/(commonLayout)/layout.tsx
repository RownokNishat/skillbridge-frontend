import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
