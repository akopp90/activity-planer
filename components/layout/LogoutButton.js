import { signOut } from "next-auth/react";
import { FaLockOpen } from "react-icons/fa";
import Button from "../ui/Button";

export default function LogoutButton() {
  function handleSignOut() {
    signOut({ callbackUrl: "/auth/signin" });
  }
  return (
    <Button onClick={handleSignOut}>
      <FaLockOpen />
    </Button>
  );
}
