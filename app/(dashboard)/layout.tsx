
import Providers from "./providers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <Providers>{children}</Providers>
    </div>
  );
}
