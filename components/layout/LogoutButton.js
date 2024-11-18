import { signOut } from "next-auth/react";
import { FaLockOpen } from "react-icons/fa";
import Button from "../ui/Button";


export default function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
      <FaLockOpen />
    </Button>
  );
}
