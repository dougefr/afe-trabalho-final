import { Button, Container } from "../components";
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

export default function Home() {
  return (
    <StyledContainer title="Welcome Pokémon Trainer!!!">
      <div>
        <p>
          The Pokédex is a digital encyclopedia created by Professor Oak as an
          invaluable tool to Trainers in the Pokémon world. It gives information
          about all Pokémon in the world that are contained in its database,
          although it differs in how it acquires and presents information over
          the different media. However, they are also only given to a few
          Trainers at a time, generally to the ones that are felt to have
          exceptional potential and skill. Regional Pokédexes give information
          about Pokémon native to its particular region, while the National
          Pokédex records information about all known Pokémon.
        </p>
        <p>
          Pokédex entries typically describe a Pokémon in only two or three
          sentences. They may give background information on the habitat or
          activities of a Pokémon in the wild or other information on the
          Pokémon's history or anatomy. Pokédex entries also include height,
          weight, cry, footprint (prior to Generation VI), location, other
          forms, and a picture of the Pokémon.
        </p>
        <p>
          Sometimes the Pokédex might contain inaccurate or mythical
          information. For example, some of Tentacruel's entries describes it as
          having 80 tentacles when only 14 are visible.
        </p>
      </div>
      <div>
        <StyleButton onClick={handleClickStart} type="primary">
          Start
        </StyleButton>
        <Button onClick={handleClickExit}>Exit</Button>
      </div>
    </StyledContainer>
  );

  function handleClickStart() {
    Router.push("/pokemon/List");
  }

  function handleClickExit() {
    document.location.href =
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";
  }
}
