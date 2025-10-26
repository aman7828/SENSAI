import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent
                       bg-gradient-to-r from-lime-600 via-olive-600 to-emerald-700
                       drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button className="bg-olive-600 hover:bg-olive-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
