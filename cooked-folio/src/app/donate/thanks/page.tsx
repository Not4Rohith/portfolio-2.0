import { constructMetadata } from "@/lib/site-config";
import DonateThanks from "@/components/donate/DonateThanks";

export const metadata = constructMetadata({
  title: "thank you 💚",
  description: "your donation means the world.",
});

export default function DonateThanksPage() {
  return <DonateThanks />;
}
