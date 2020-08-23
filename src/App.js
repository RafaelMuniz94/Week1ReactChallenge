import React, { useState, useEffect } from "react";
import Api from "./services/api";

import "./styles.css";

function App() {
  let [repositories, setRepository] = useState([]);

  useEffect(() => {
    Api.get("repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    let repo = {
      title: `Repo - ${Date.now()}`,
      owner: `Rafael Muniz`,
    };

    let response = await Api.post("repositories", repo);

    repo = response.data;

    setRepository([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    let url = "repositories/" + id;
    Api.delete(url)
      .then((response) => {
        if (response.status === 204) {
          let index = repositories.findIndex((repo) => repo.id === id);
          repositories.splice(index, 1);

          setRepository([...repositories]);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
