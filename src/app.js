const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  /**GET /repositories: Rota que lista todos os repositórios; */

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  /**POST /repositories: A rota deve receber title, url e techs dentro do corpo da requisição, 
   * sendo a URL o link para o github desse repositório. Ao cadastrar um novo projeto, ele deve 
   * ser armazenado dentro de um objeto no seguinte formato: { id: "uuid", title: 
   * 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 }; 
   * Certifique-se que o ID seja um UUID, e de sempre iniciar os likes como 0. */

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  /**PUT /repositories/:id: A rota deve alterar apenas o title, a url e as techs do repositório que possua o id igual ao id presente nos parâmetros da rota; */

  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Respository does not exists.' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
  };

  repositories[findRepositoryIndex] = repository

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  /**DELETE /repositories/:id: A rota deve deletar o repositório com o id presente nos parâmetros da rota; */

  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );

  if (findRepositoryIndex >= 0) {
    repositories.splice(findRepositoryIndex, 1);
  } else {
    return response.status(400).json({ error: 'Respository does not exists.' })
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exists.' });
  }

  repositories[findRepositoryIndex].likes += 1;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
