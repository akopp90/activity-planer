import { useSession, signIn, signOut } from "next-auth/react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
    }
  };
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <Container>
      <FormCard>
        <Title>Sign In</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              name={"email"}
              type="email"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            >
              Email
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            >
              Password
            </Input>
          </FormGroup>
          <Button type="submit">Sign In</Button>
        </form>
        <Button onClick={() => signIn("github")}>
          <FaGithub /> Sign in with GitHub
        </Button>
        <Button onClick={() => signIn("google")}>
          <FaGoogle /> Sign in with Google
        </Button>
        <br />
        <p>no account yet?</p>
        <Link href="/auth/register">Register</Link>
      </FormCard>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;
