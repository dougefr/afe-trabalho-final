import { Button, Container, Text } from "../../../components";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPokemonDetail, getPokemon } from "../../../services";

const StyledContainer = styled(Container)`
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 5rem;
`;

const StyledPokemonDetail = styled.div`
  display: grid;
  grid-template-columns: [pokemonCard] 25% [pokemonProfile] 75%;
  grid-template-rows: [type] 25% [description] 25% [stats] 50%;
  height: 80vh;
  row-gap: 2rem;

  .pokemonCard {
    place-self: center;
    grid-column: pokemonCard;
    grid-row-start: type;
    grid-row-end: span stats;
  }

  .pokemonType {
    grid-column: pokemonProfile;
    grid-row: type;
  }

  .pokemonDescription {
    grid-column: pokemonProfile;
    grid-row: description;
  }

  .pokemonStats {
    grid-column: pokemonProfile;
    grid-row: stats;
  }
`;

const StyleButton = styled(Button)`
  margin-right: 1rem;
`;

export default function List() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<IPokemonDetail>(null);

  useEffect(() => {
    if (id) {
      getPokemon(parseInt("" + id)).then(setPokemon);
    }
  }, [id]);

  if (!pokemon) {
    return null;
  }

  return (
    <StyledContainer title={`#${pokemon.order} ${pokemon.name}`}>
      <StyledPokemonDetail>
        {renderImage(pokemon.sprites.other.dream_world.front_default)}
        {renderType()}
        {renderDescription()}
        {renderStats()}
      </StyledPokemonDetail>
      <div>
        <StyleButton
          onClick={handleClientPrevious}
          type={id === "1" ? "disabled" : "primary"}
        >
          Previous
        </StyleButton>
        <StyleButton onClick={handleClickNext} type="primary">
          Next
        </StyleButton>
        <Button onClick={handleClickExit}>Exit</Button>
      </div>
    </StyledContainer>
  );

  function renderType() {
    return (
      <Container title="Profile" className="pokemonType">
        {pokemon.types.map((type) => type.type.name + " | ")}
      </Container>
    );
  }

  function renderDescription() {
    return (
      <Container title="Description" className="pokemonDescription">
        {pokemon.species.text}
      </Container>
    );
  }

  function renderStats() {
    return (
      <Container title="Stats" className="pokemonStats">
        {pokemon.species.text}
      </Container>
    );
  }

  function handleClientPrevious() {
    router.push(`/pokemon/detail/${parseInt("" + id) - 1}`);
  }

  function handleClickNext() {
    router.push(`/pokemon/detail/${parseInt("" + id) + 1}`);
  }

  function handleClickExit() {
    router.back();
  }

  function renderImage(sprite: string) {
    return (
      <img className="pokemonCard" width={128} height={128} src={sprite} />
    );
  }
}
