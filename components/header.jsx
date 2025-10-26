import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-lime-200 bg-gradient-to-r from-lime-50 via-emerald-50 to-olive-50 backdrop-blur-md z-50 shadow-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Sensai Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 border-lime-300 text-olive-800 hover:bg-lime-100 hover:text-olive-900 transition-all"
              >
                <LayoutDashboard className="h-4 w-4 text-lime-700" />
                Industry Insights
              </Button>
              <Button
                variant="ghost"
                className="md:hidden w-10 h-10 p-0 hover:bg-lime-100"
              >
                <LayoutDashboard className="h-4 w-4 text-lime-700" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-lime-600 via-olive-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-lime-600 shadow-md transition-all">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white/90 border border-lime-200 shadow-lg backdrop-blur-md"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/resume"
                    className="flex items-center gap-2 text-olive-700 hover:text-lime-700"
                  >
                    <FileText className="h-4 w-4 text-lime-600" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2 text-olive-700 hover:text-lime-700"
                  >
                    <PenBox className="h-4 w-4 text-lime-600" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/interview"
                    className="flex items-center gap-2 text-olive-700 hover:text-lime-700"
                  >
                    <GraduationCap className="h-4 w-4 text-lime-600" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className="bg-gradient-to-r from-lime-600 to-green-700 text-white hover:from-green-700 hover:to-lime-600 shadow-md transition-all">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-lime-400",
                  userButtonPopoverCard:
                    "shadow-xl border border-lime-200 backdrop-blur-md",
                  userPreviewMainIdentifier:
                    "font-semibold text-olive-800",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

