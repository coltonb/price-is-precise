import { Navigation } from "@/app/admin/navigation";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navigation />
      <section className="p-5">{children}</section>
    </main>
  );
}
