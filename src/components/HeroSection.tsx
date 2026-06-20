"use client";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// import React from "react";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black text-white border border-zinc-900">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24 border-b lg:border-b-0 lg:border-r border-zinc-900">
          <p className="text-sm text-zinc-500 mb-6">
            Discover Stories, Ideas & Perspectives
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight max-w-4xl">
            Read, Write & Share Amazing Stories
          </h1>

          <p className="mt-6 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Explore insightful articles, trending topics, and expert opinions.
            Join a growing community of readers and writers sharing knowledge
            across technology, business, lifestyle, travel, and more.
          </p>

          {/* Categories */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["Technology", "Business", "Lifestyle", "Travel"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200">
              Start Reading
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 bg-transparent hover:bg-zinc-900"
            >
              Become a Writer
            </Button>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative flex items-center justify-center p-6 sm:p-10 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />

          <div className="relative max-w-sm">
            {/* Avatars */}
            <div className="flex -space-x-3 mb-6">
              {["A", "J", "M", "S"].map((item) => (
                <div
                  key={item}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-zinc-800 text-sm font-semibold"
                >
                  {item}
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Explore 500+ Articles
            </h3>

            <p className="text-zinc-400 mb-6">
              Discover trending blogs, tutorials, success stories, and expert
              opinions from writers around the world.
            </p>

            <Button
              variant="outline"
              className="border-zinc-700 bg-transparent hover:bg-zinc-900"
            >
              Explore Articles
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-zinc-900">
        {[
          {
            value: "500+",
            title: "Published Articles",
          },
          {
            value: "50k+",
            title: "Monthly Readers",
          },
          {
            value: "1k+",
            title: "Active Writers",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-8 border-b sm:border-b-0 sm:border-r last:border-r-0 border-zinc-900"
          >
            <h3 className="text-4xl font-bold text-white">{item.value}</h3>

            <p className="mt-3 text-zinc-500">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-t border-zinc-900">
        {[
          {
            title: "Trending Articles",
            subtitle: "Stay Updated",
            description:
              "Discover the most popular stories across all categories.",
          },
          {
            title: "Expert Authors",
            subtitle: "Trusted Voices",
            description:
              "Read insights from experienced writers and professionals.",
          },
          {
            title: "Community Discussions",
            subtitle: "Join Conversations",
            description: "Engage with readers and share your thoughts.",
          },
          {
            title: "Weekly Newsletter",
            subtitle: "Never Miss Out",
            description:
              "Get curated articles delivered directly to your inbox.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="group relative border-r border-b border-zinc-900 p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="h-10 w-10 rounded-full bg-yellow-400 text-black flex items-center justify-center">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <h3 className="text-xl font-semibold">{item.title}</h3>

            <p className="mt-2 text-zinc-500">{item.subtitle}</p>

            <p className="mt-6 text-sm text-zinc-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
