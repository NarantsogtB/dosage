import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SOURCE_COUNT } from "./landing-stats";

const FEEDBACK_URL = "https://www.facebook.com/profile.php?id=61592793974106";

/** Хаалтын үйлдэл ба холбоо барих. */
export default function LandingFooter() {
  return (
    <footer className="py-14">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Жингээ оруулаад эхлээрэй
        </h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
          Бүртгэл шаардлагагүй. Утсан дээр ажиллана. Тооцоолол бүрийн ард
          эх сурвалж харагдана.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild size="lg">
            <Link href="/dose">Тун тооцоолох</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-10 text-xs">
          <span className="num">{SOURCE_COUNT}</span> эх сурвалжийн бүртгэл ·
          Олон улсын нэршил (INN) ·{" "}
          <a
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Санал хүсэлт
          </a>
        </p>
      </div>
    </footer>
  );
}
