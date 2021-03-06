import { Button, Container, Table, Text } from "../../../components";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { PokemonService } from "../../../services";

import Image from "next/image";

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

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDiv = styled.div`
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  max-width: 64px;
  max-height: 64px;
`;

export default function List({ results }) {
  const router = useRouter();
  const { page } = router.query;
  const headers = ["#", "Pokémon", "Actions"];

  if (!results) {
    return null;
  }

  return (
    <StyledContainer title="Pokémon List">
      <StyledButtonContainer>
        <div>
          <StyledButton
            onClick={page === "0" ? null : handleClientPrevious}
            type={page === "0" ? "disabled" : "primary"}
          >
            Previous
          </StyledButton>
          <StyledButton
            onClick={results.length !== 10 ? null : handleClickNext}
            type={results.length !== 10 ? "disabled" : "primary"}
          >
            Next
          </StyledButton>
        </div>
        <Button onClick={handleClickHome}>Home</Button>
      </StyledButtonContainer>
      <div>
        <StyledTable
          headers={headers}
          data={results.map((r) => [
            r.id,
            <StyledImageContainer>
              {renderImage(r.sprite)}
              {r.name}
            </StyledImageContainer>,
            renderDetailButton(r.id),
          ])}
        />
      </div>
    </StyledContainer>
  );

  function handleClientPrevious() {
    document.location.href = `/pokemon/list/${parseInt("" + page) - 1}`;
  }

  function handleClickNext() {
    document.location.href = `/pokemon/list/${parseInt("" + page) + 1}`;
  }

  function handleClickHome() {
    document.location.href = "/";
  }

  function renderImage(sprite: string) {
    return (
      <StyledDiv>
        <Image width={64} height={64} src={sprite} />
      </StyledDiv>
    );
  }

  function renderDetailButton(id: number) {
    return (
      <StyledText type="primary" onClick={() => handleClickDetail(id)}>
        Details
      </StyledText>
    );
  }

  function handleClickDetail(id: number) {
    document.location.href = `/pokemon/detail/${id}`;
  }
}

export async function getStaticProps({ params }) {
  const { page } = params;

  const limit = 10;
  const results = await PokemonService.listPokemon(
    limit,
    parseInt("" + page) * limit
  );

  return {
    props: {
      results: results.results,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];

  for (let i = 0; i <= 90; i++) {
    paths.push({ params: { page: "" + i } });
  }

  return {
    paths,
    fallback: true,
  };
}
