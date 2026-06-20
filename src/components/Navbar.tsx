"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export function Navbar() {

  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 px-4">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl shadow-2xl">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white">
            Scribblr
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-white/80">
            <Link href="/" className="hover:text-white transition-colors font">
              Home
            </Link>

            <Link href="/blogs" className="hover:text-white transition-colors">
              Blogs
            </Link>

            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>

            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Button */}
          <Button className="hidden md:flex rounded-full" onClick={()=>router.push("/login")}>
            Login
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-black border-zinc-800"
            >
              <div className="mt-10 flex flex-col gap-6">
                <Link href="/">Home</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/about">About</Link>

                <Button className="mt-4 w-full">
                  Start Reading
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}