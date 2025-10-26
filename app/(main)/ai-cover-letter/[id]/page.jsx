import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="min-h-screen py-6 px-4 md:px-8 bg-gradient-to-b from-lime-50 via-olive-50 to-emerald-50">
      <div className="flex flex-col space-y-4 mb-6">
        <Link href="/ai-cover-letter">
          <Button
            variant="link"
            className="gap-2 pl-0 text-olive-900 hover:text-lime-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold text-olive-900">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>

      <div className="bg-white/90 border border-lime-300 shadow-lg rounded-lg p-4">
        <CoverLetterPreview content={coverLetter?.content} />
      </div>
    </div>
  );
}
