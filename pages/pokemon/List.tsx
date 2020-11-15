import { Button, Container, Table } from "../../components";
import styled from "styled-components";
import Router from "next/router";

const StyledContainer = styled(Container)`
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 5rem;
`;

const StyleButton = styled(Button)`
  margin-right: 1rem;
`;

const StyledTable = styled(Table)`
  margin: 3rem;
`;

export default function List() {
  const headers = ["TODO", "TODO"];
  const data = [
    ["TODO", "TODO"],
    ["TODO", "TODO"],
  ];

  return (
    <StyledContainer title="Pokémon Search">
      <div>
        <StyledTable headers={headers} data={data} />
      </div>
      <div>
        <StyleButton onClick={handleClickStart} type="primary">
          Help
        </StyleButton>
        <Button onClick={handleClickExit}>Exit</Button>
      </div>
    </StyledContainer>
  );

  function handleClickStart() {
    Router.push("/pokemon/List");
  }

  function handleClickExit() {
    Router.back();
  }
}
