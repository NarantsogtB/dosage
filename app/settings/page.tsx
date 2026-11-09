import type { Metadata } from "next";
import SettingsPage from "@/components/settings/SettingsPage";

export const metadata: Metadata = {
  title: "Тохиргоо",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SettingsPage />;
}
