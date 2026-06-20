import localFont from "next/font/local";

export const nohemi = localFont({
  src: [
    {
      path: "../../public/fonts/Nohemi-Regular-BF6438cc58b98fc.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
});