"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatSide from "@/components/chat/ChatSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSide session={session} />
      <div className="w-full">{children}</div>
    </div>
  );
}
