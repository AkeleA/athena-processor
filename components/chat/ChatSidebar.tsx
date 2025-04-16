"use client";
import { Home, Calendar, Mail, LogOut, ChevronDown, User } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function ChatSide({ session }: { session: any }) {
  const userName = session.user.name;
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) =>
    pathname === path ? "font-bold text-black" : "font-light text-[#282828]";

  return (
    <section className="h-screen w-full max-w-72 bg-black flex flex-col sticky">
      <div className="flex flex-col items-center gap-12 w-full px-16 py-1.5 bg-black">
        <h1>This is a test</h1>
      </div>
      {/* Bottom Section */}
      <div className="relative px-8 pb-4 flex items-center font-gtwalsheim justify-start mt-auto">
        <div className="z-30">
          <h3 className="font-bold text-base leading-[18.32px] text-[#282828]">
            Help Center
          </h3>
          <p>
            <span className="font-normal text-[10px] leading-[11.45px] text-[#4B4B4B]">
              Support Hours
            </span>{" "}
            <br />
            <span className="font-normal text-xs leading-[13.74px] text-[#4B4B4B]">
              9:00am - 10:00pm
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
