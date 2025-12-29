'use client';

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <Button 
      variant="destructive" 
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </Button>
  );
}
