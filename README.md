# Pontifícia Universidade Católica de Minas Gerais

**Curso:** Arquitetura de Software Distribuído

**Disciplina:** Arquitetura de Front End

**Professor:** Samuel Martins

**Alunos:** Douglas Eric Fonseca Rodrigues e Luciano Custódio da Silva Junior

## Trabalho Final

### Justificativas das decisões arquiteturais tomadas para este projeto:

#### react

A escolha do React para o desenvolvimento da aplicação final, foi dado para aproveitar o know-how dos integrantes do grupo com a tecnologia. A seguir é descrito os principais pontos relevantes considerados para o uso da mesma.

##### perfomance

A performance do React foi um ponto crucial para a escolha da biblioteca, pois seu algoritmo de manipulação do DOM é extremamente leve e integrado as versões mais atuais do ECMA Script, fornecendo um amplo suporte a modularização e classes. Além de deixar a aplicação robusta e com facilidade de incluir novas features.

##### comunidade

O React é mantido pelo Facebook ou por desenvolvedores individuais ou de empresas. Hoje contando com um suporte muito grande da comunidade de desenvolvimento contando com 160k de estrelas no github e com 1,523 contribuintes e dentro de aproximadamente 5,1 milhões de projetos confirmados pelo "badge" usado por do Github. Comparado ao Vue, o React contém um número menor de estrelas no github, mas é mantida por mais pessoas da comunidade. Abaixo segue um gráfico comparado a quantidade de estrelas do repositórios das três tecnologias:

![Github Stars](https://github.com/dougefr/afe-trabalho-final/blob/master/images/starsGit.png?raw=true)

Conforme demonstrado na imagem abaixo, são dados da npm trends contando o número de instalações de cada um:

![NPM Trends](https://github.com/dougefr/afe-trabalho-final/blob/master/images/npmTrends1.png?raw=true)

Abaixo o gráfico de pesquisas referente a cada um:

![Google Trends](https://github.com/dougefr/afe-trabalho-final/blob/master/images/googleTrends.png?raw=true)

#### next

Optamos por desenvolver uma aplicação baseada em Server Side Rendering(SSR), e a ferramenta que utilizamos foi o NextJS. O uso do NextJS é efetuado para rastrear as "rotas" referente a página inicial, que inclui a listas de dados recuperados e a página de detalhes referente ao item selecionado. Além do fato do NextJS oferecer uma curva de aprendizado baixa, pois compartilha de muitos módulos presentes no ReactJS.

#### styled-components

Efetuamos o uso do CSS-in-JS no projeto, uma forma de escrita para CSS totalmente voltada para React, tem como a característica efetuar a componentização utilizando o JavaScript para converter em componentes de alta performance com a prevenção de ocorrer colisões entre estilos. Outra característica é proporcionar a adaptação de estilos baseados em parâmetros, sendo assim reduzindo a duplicidade de código. Redução de requisições http para carregamento de assets. A escolha do Styled-Components foi baseada em oferecer a simplificação, de incluir estilos mais dinânico na aplicação, evitando a criar arquivos extras de CSS para criar apenas uma classe de estilo.

#### typescript

O Typescript é uma ferramenta que tem como o intuito incluir uma tipagem estática ao JavaScript, com essa ferramenta os erros em tempo de desenvolvimento são descobertos com maior facilidade. Sendo assim tornando o JavaScript uma linguagem fortemente tipada. A inclusão da tecnologia no projeto tem como justificativa nós proporcionar ferramentas, para manter a aplicação segura e eficaz.

#### axios

Biblioteca amplamente utilizada para realizar requisições HTTP, ela é totalmente baseada em Promises. É um projeto open source, disponível no Github, com 7 aproximadamente 79 mil estrelas e 7,5 mil forks. Hoje é vem sendo bem mantida pela comunidade, por ser uma ferramenta que é amplamente utilizada pela comunidade, sua escolha é baseada no suporte oferecido pela comunidade. Na aplicação utilizamos o axios para efetuar requisições a api.

#### nes.css

O nes.css é uma framework voltado para o CSS, ele provém para a aplicação apenas o componentes para guia de estilos. Foi utilizado para estilizar fontes, botões e containers onde é exibido informações detalhadas recuperadas na lista.

#### husky

O husky é um hook do github, utilizado em conjunto com package.json. Como o husky tem um suporte maior na comunidade, incluimos ele no projeto com o hook para verificar a integridade do commit, antes de efetuar o push.

#### prettier

Escolha para formatação do código, para proporcionar uma padronização no código. Utilizado juntamente ao padrão de desenvolvimento do typescript.
