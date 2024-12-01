import { useSession, signIn, signOut } from "next-auth/react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Header from "./Header";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleSetEmail(event) {
    setCredentials({ ...credentials, email: event.target.value });
  }
  function handleSetPassword(event) {
    setCredentials({ ...credentials, password: event.target.value });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
    }
  }
  if (session) {
    return (
      <>
      <Header />
      <Container>
        <StyledLogin>
        Signed in as {session.user.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
        </StyledLogin>
      </Container>
      </>
    );
  }
  return (
    <>
      <Header />
      <Container>
        <FormCard>
          <NavContainer>
            <StyledLink href="/auth/signin" $bg="#ccc">
              Login
            </StyledLink>
            <StyledLink href="/auth/register">Register</StyledLink>
          </NavContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Input name={"email"} type="email" onChange={handleSetEmail}>
                Email
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                onChange={handleSetPassword}
              >
                Password
              </Input>
            </FormGroup>
            <Button type="submit">Sign In</Button>
          </form>
          <StyledButton>
            <Button onClick={() => signIn("github")}>
              <FaGithub /> Sign in with GitHub
            </Button>
            <Button onClick={() => signIn("google")}>
              <FaGoogle /> Sign in with Google
            </Button>
          </StyledButton>
        </FormCard>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 2rem;
  background: ${({ theme }) => theme.background};
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px ${({ theme }) => theme.background === '#121212' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  width: 100%;
  max-width: 400px;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const StyledLink = styled(Link)`
  background-color: ${({ theme, $bg }) => $bg || theme.cardBackground};
  color: ${({ theme }) => theme.text};
  cursor: ${(props) => (props.$bg ? "default" : "pointer")};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 8px 16px;
  margin: 0 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme, $bg }) => !$bg && theme.primary};
    color: ${({ theme, $bg }) => !$bg && '#ffffff'};
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  justify-content: center;
  gap: 8px;
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 24px 0;

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    transition: all 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.primary};
      color: white;
      transform: translateY(-2px);
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;
