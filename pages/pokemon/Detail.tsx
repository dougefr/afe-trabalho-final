import { Button, Container } from "../../components";
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

export default function Detail() {
  return (
    <StyledContainer title="Welcome Pokémon Trainer!!!">
      <div>
        <p>TODO</p>
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
