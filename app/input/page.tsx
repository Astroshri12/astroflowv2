import { redirect } from "next/navigation";

export default function LegacyInputRedirect() {
  redirect("/analyze/input");
}
