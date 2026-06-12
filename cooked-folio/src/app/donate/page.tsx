import { constructMetadata } from "@/lib/site-config";
import DonateContent from "@/components/donate/DonateContent";

export const metadata = constructMetadata({
  title: "donate",
  description: "support my work with a donation.",
});

export default function DonatePage() {
  return <DonateContent />;
}
