import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { showToast } from "../ui/ToastMessage";
import Link from "next/link";
import Header from "./Header";

const Container = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
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

function RegisterForm() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleSetUserName(event) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  function handleSetUserEmail(event) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  function handleSetUserPassword(event) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (userData.password.length < 6) {
      showToast("Password must be at least 6 characters long", "error");
      return;
    }

    if (!userData.password) {
      showToast("Password is required", "error");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Registration successful! Please log in.", "success");
        router.push("/auth/signin");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  }

  return (
    <>
      <Header />
      <Container>
        <FormCard>
          <NavContainer>
            <StyledLink href="/auth/signin">Login</StyledLink>
            <StyledLink href="/auth/register" $bg="#ccc">
              Register
            </StyledLink>
          </NavContainer>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Input 
                type="text" 
                name="name" 
                onChange={handleSetUserName}
                required
              >
                Name
              </Input>
            </FormGroup>
            <FormGroup>
              <Input 
                type="email" 
                name="email" 
                onChange={handleSetUserEmail}
                required
              >
                Email
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                onChange={handleSetUserPassword}
                required
                minLength={6}
              >
                Password
              </Input>
            </FormGroup>
            <Button 
              type="submit"
              style={{
                width: '100%',
                marginTop: '1rem',
                transition: 'all 0.3s ease',
              }}
            >
              Register
            </Button>
          </form>
        </FormCard>
      </Container>
    </>
  );
}

export default RegisterForm;
