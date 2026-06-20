"use client";

import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { Blog } from "@/types/interfaces/blogs.interface";
import { MagicCard } from "./ui/magic-card";

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <MagicCard
      className="overflow-hidden rounded-3xl"
      gradientColor="#262626"
    >
      <div className="overflow-hidden rounded-3xl border shadow-sm">
        <div className="relative h-64 w-full">
          <Image
            src={blog.featured_images || "/placeholder.jpg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="p-6">
          <h2 className="mb-3 line-clamp-2 text-2xl font-bold">
            {blog.title}
          </h2>

          <p className="mb-5 line-clamp-2 text-muted-foreground">
            {blog.content}
          </p>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Admin</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>
                  {new Date(
                    (blog as any).created_at
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MagicCard>
  );
}