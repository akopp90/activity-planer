import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { showToast } from "../ui/ToastMessage";
import Link from "next/link";
import Header from "./Header";

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
              <Input type="text" name="name" onChange={handleSetUserName}>
                Name
              </Input>
            </FormGroup>
            <FormGroup>
              <Input type="email" name="email" onChange={handleSetUserEmail}>
                Email
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                onChange={handleSetUserPassword}
              >
                Password
              </Input>
            </FormGroup>
            <Button type="submit">Register</Button>
          </form>
        </FormCard>
      </Container>
    </>
  );
}

export default RegisterForm;
const StyledLink = styled(Link)`
  background-color: ${(props) => props.$bg || "#fff"};
  cursor: ${(props) => (props.$bg ? "default" : "pointer")};
  text-decoration: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px;
`;
const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: center;
`;
