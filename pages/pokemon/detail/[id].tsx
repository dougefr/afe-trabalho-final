import { Badge, Button, Container, Text } from "../../../components";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPokemonDetail, PokemonService } from "../../../services";

const StyledContainer = styled(Container)`
  margin: 1rem;
  background-color: #f7d51d;

  h3 {
    background-color: #f7d51d !important;
  }
`;

const StyledPokemonDetail = styled.div`
  display: grid;
  grid-template-columns: [pokemonCard] 25% [pokemonProfile] 75%;
  grid-template-rows: [type] auto [description] auto [stats] auto;
  row-gap: 2rem;
  margin-bottom: 2rem;

  .pokemonCard {
    place-self: center;
    align-self: flex-end;
    grid-column: pokemonCard;
    grid-row-start: type;
    grid-row-end: span stats;
    height: 100%;
    text-align: center;
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

  .navButtons {
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  margin-right: 1rem;
`;

const StyledWhiteContainer = styled(Container)`
  background-color: #ffffff;

  h3 {
    background-color: #ffffff !important;
  }
`;

const StyledTypeContainer = styled(StyledWhiteContainer)`
  a {
    margin-right: 1rem;
  }
`;

const StyledButtonContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export default function List({ pokemon }) {
  const router = useRouter();
  const { id } = router.query;

  if (!pokemon) {
    return null;
  }

  return (
    <StyledContainer title="Pokémon Detail">
      <StyledButtonContainer>
        <Button onClick={handleClickList}>List</Button>
      </StyledButtonContainer>
      <StyledPokemonDetail>
        {renderImage()}
        {renderNavButtons()}
        {renderType()}
        {renderDescription()}
        {renderStats()}
      </StyledPokemonDetail>
    </StyledContainer>
  );

  function renderType() {
    return (
      <StyledTypeContainer
        key="pokemonType"
        title="Type"
        className="pokemonType"
      >
        {pokemon.types.map((type) => (
          <Badge key={type.type.name} type="primary">
            {type.type.name}
          </Badge>
        ))}
      </StyledTypeContainer>
    );
  }

  function renderDescription() {
    return (
      <StyledWhiteContainer
        key="pokemonDescription"
        title="Description"
        className="pokemonDescription"
      >
        {pokemon.species.text}
      </StyledWhiteContainer>
    );
  }

  function renderStats() {
    return (
      <StyledTypeContainer
        key="pokemonStats"
        title="Stats"
        className="pokemonStats"
      >
        {pokemon.stats.map((stat) => (
          <Badge
            key={stat.stat.name}
            type="primary"
            title={getStatAbbreviation(stat.stat.name)}
          >
            {stat.base_stat}
          </Badge>
        ))}
      </StyledTypeContainer>
    );
  }

  function getStatAbbreviation(name: string) {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "Atk";
      case "defense":
        return "Def";
      case "special-attack":
        return "SpAtk";
      case "special-defense":
        return "SpDef";
      case "speed":
        return "Speed";
      default:
        return name;
    }
  }

  function renderNavButtons() {
    return (
      <div className="navButtons">
        <StyledButton
          onClick={id === "1" ? null : handleClientPrevious}
          type={id === "1" ? "disabled" : "primary"}
        >
          {"<"}
        </StyledButton>
        <StyledButton
          onClick={id === "893" ? null : handleClickNext}
          type={id === "893" ? "disabled" : "primary"}
        >
          {">"}
        </StyledButton>
      </div>
    );
  }

  function handleClientPrevious() {
    router.push(`/pokemon/detail/${parseInt("" + id) - 1}`);
  }

  function handleClickNext() {
    router.push(`/pokemon/detail/${parseInt("" + id) + 1}`);
  }

  function handleClickList() {
    const page = Math.floor(parseInt("" + id) / 10);
    router.push(`/pokemon/list/${page}`);
  }

  function renderImage() {
    return (
      <StyledWhiteContainer
        key="pokemonCard"
        title="Profile"
        className="pokemonCard"
      >
        <img
          width={128}
          height={128}
          src={pokemon.sprites.other["official-artwork"].front_default}
        />
        <h3>{pokemon.name}</h3>
        <h3>#{id}</h3>
      </StyledWhiteContainer>
    );
  }
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const pokemon = await PokemonService.getPokemon(parseInt("" + id));

  return {
    props: {
      pokemon,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];

  for (let i = 0; i <= 893; i++) {
    paths.push({ params: { id: "" + i } });
  }

  return {
    paths,
    fallback: true,
  };
}
