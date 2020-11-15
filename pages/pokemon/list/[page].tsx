import { Button, Container, Table, Text } from "../../../components";
import styled from "styled-components";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPokemonList, listPokemon } from "../../../services";

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
  const router = useRouter();
  const { page } = router.query;
  const [result, setResult] = useState<IPokemonList>(null);
  const headers = ["#", "Name", "Actions"];

  useEffect(() => {
    const limit = 10;
    const offset = page || 0;
    listPokemon(limit, parseInt("" + offset)).then(setResult);
  }, [page]);

  if (!result) {
    return null;
  }

  return (
    <StyledContainer title="Pokémon Search">
      <div>
        <StyledTable
          headers={headers}
          data={result.results.map((r) => [
            r.id,
            r.name,
            renderDetailButton(r.id),
          ])}
        />
      </div>
      <div>
        <StyleButton
          onClick={handleClientPrevious}
          type={page === "0" ? "disabled" : "primary"}
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

  function handleClientPrevious() {
    router.push(`/pokemon/list/${parseInt("" + page) - 1}`);
  }

  function handleClickNext() {
    router.push(`/pokemon/list/${parseInt("" + page) + 1}`);
  }

  function handleClickExit() {
    router.back();
  }

  function renderDetailButton(id: number) {
    return <Text type="primary">Details</Text>;
  }
}