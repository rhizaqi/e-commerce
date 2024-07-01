import Navbar from "@/components/Navbar";
import AuthGate from "@/components/authGate";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthGate>
        <Navbar />
        {children}
      </AuthGate>
    </div>
  );
}
