import { useRouter } from "next/router"
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ErrorCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #ef4444;
`

const Message = styled.p`
  margin-bottom: 1rem;
`

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  color: white;
  background: #3b82f6;
  cursor: pointer;
  
  &:hover {
    background: #2563eb;
  }
`

export default function Error() {
  const router = useRouter()
  const { error } = router.query

  return (
    <Container>
      <ErrorCard>
        <Title>Authentication Error</Title>
        <Message>{error || "An error occurred during authentication"}</Message>
        <Button onClick={() => router.push("/auth/signin")}>
          Back to Sign In
        </Button>
      </ErrorCard>
    </Container>
  )
}
