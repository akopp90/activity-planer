import styled from "styled-components";
import Button from "@/components/ui/Button";
import { categories as categoryData } from "@/lib/categories";

export default function ActivityFilter({ filter, handleFilter }) {
  function handleCheckbox(event) {
    handleFilter(event.target.name);
  }

  function handleResetFilter() {
    handleFilter();
  }

  return (
    <StyledSection>
      <h2>Filter activities</h2>
      <StyledList>
        {categoryData.map((category) => (
          <StyledListItem key={category}>

            <input type="checkbox" id={category} name={category} checked={filter.includes(category)} onChange={handleCheckbox} />

            <label htmlFor={category}>{category}</label>
          </StyledListItem>
        ))}
      </StyledList>
      <Button onClick={handleResetFilter}>Reset</Button>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  gap: 16px;
  padding: 24px;
  display: flex;
  margin-top: 24px;
  border-radius: 8px;
  margin-inline: auto;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f1f1f1;
  width: min(640px, 100% - 48px);
`;
const StyledList = styled.ul`
  list-style: none;
`;
const StyledListItem = styled.li`
  gap: 8px;
  display: flex;
`;
