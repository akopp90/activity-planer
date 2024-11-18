import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { showToast } from "../ui/ToastMessage";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };
  return (
    <Container>
      <FormCard>
        <Title>Register</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="name"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            >
              Name
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
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
                setUserData({ ...userData, password: e.target.value })
              }
            >
              Password
            </Input>
          </FormGroup>
          <Button type="submit">Register</Button>
        </form>
      </FormCard>
    </Container>
  );
}

export default RegisterForm;
