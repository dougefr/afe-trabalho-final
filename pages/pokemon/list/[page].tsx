import { Button, Container, Table, Text } from "../../../components";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPokemonList, PokemonService } from "../../../services";

const StyledContainer = styled(Container)`
  margin: 1rem;
  background-color: #f7d51d;

  h3 {
    background-color: #f7d51d !important;
  }
`;

const StyledButton = styled(Button)`
  margin-right: 1rem;
`;

const StyledTable = styled(Table)`
  margin: 1rem;
  table {
    width: calc(100% - 2rem);
  }
  text-align: center;
`;

const StyledText = styled(Text)`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function List() {
  const router = useRouter();
  const { page } = router.query;
  const [result, setResult] = useState<IPokemonList>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const headers = ["#", "Pokémon", "Actions"];

  useEffect(() => {
    if (page) {
      const limit = 10;
      setLoading(true);
      PokemonService.listPokemon(limit, parseInt("" + page) * limit).then(
        (results) => {
          setResult(results);
          setLoading(false);
        }
      );
    }
  }, [page]);

  if (!result) {
    return null;
  }

  return (
    <StyledContainer title="Pokémon List">
      <StyledButtonContainer>
        <div>
          <StyledButton
            onClick={loading || page === "0" ? null : handleClientPrevious}
            type={loading || page === "0" ? "disabled" : "primary"}
          >
            Previous
          </StyledButton>
          <StyledButton
            onClick={
              loading || result.results.length !== 10 ? null : handleClickNext
            }
            type={
              loading || result.results.length !== 10 ? "disabled" : "primary"
            }
          >
            Next
          </StyledButton>
        </div>
        <Button onClick={handleClickHome}>Home</Button>
      </StyledButtonContainer>
      <div>
        <StyledTable
          headers={headers}
          data={result.results.map((r) => [
            r.id,
            <>
              {renderImage(r.sprite)}
              {r.name}
            </>,
            renderDetailButton(r.id),
          ])}
        />
      </div>
    </StyledContainer>
  );

  function handleClientPrevious() {
    router.push(`/pokemon/list/${parseInt("" + page) - 1}`);
  }

  function handleClickNext() {
    router.push(`/pokemon/list/${parseInt("" + page) + 1}`);
  }

  function handleClickHome() {
    router.push("/");
  }

  function renderImage(sprite: string) {
    return <img width={64} height={64} src={sprite} />;
  }

  function renderDetailButton(id: number) {
    return (
      <StyledText type="primary" onClick={() => handleClickDetail(id)}>
        Details
      </StyledText>
    );
  }

  function handleClickDetail(id: number) {
    router.push(`/pokemon/detail/${id}`);
  }
}
