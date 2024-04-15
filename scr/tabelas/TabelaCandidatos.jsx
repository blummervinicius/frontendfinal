import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../assets/funcoes";
import React from "react";
import { useState, useEffect } from "react";

export default function TabelaCandidatos(props) {
  const [listaCandidatos, setListaCandidatos] = useState([]);

  useEffect(() => {
    const getCandidatos = async () => {
      try {
        const retornoCandidatos = await fetch(urlBackend + "/candidato", {
          method: "GET",
        });

        if (retornoCandidatos.ok) {
          const listaCandidatos = await retornoCandidatos.json();
          const nomesCandidatos = listaCandidatos.listaCandidatos.map(
            (vagas) => vagas
          );
          setListaCandidatos(nomesCandidatos);
        } else {
          console.error(
            "Erro ao buscar Candaitos:",
            retornoCandidatos.statusText
          );
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    };

    getCandidatos();
  }, []);

  const buscarEntrevistas = async (e) => {
    const termoBusca = e.currentTarget.value;
    try {
      const retornoCandidatos = await fetch(
        urlBackend + `/candidato/${termoBusca}`,
        {
          method: "GET",
        }
      );

      if (retornoCandidatos.ok) {
        const listaCandidatos = await retornoCandidatos.json();
        const nomesCandidatos = listaCandidatos.listaCandidatos.map(
          (vagas) => vagas
        );
        setListaCandidatos(nomesCandidatos);
      } else {
        console.error(
          "Erro ao buscar Candaitos:",
          retornoCandidatos.statusText
        );
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    }
  };

  function filtrarVagasPorTipo(e) {
    const termoBusca = e.currentTarget.value;
    const teste = e.currentTarget.value;
    // const termoBusca = "";
    console.log(teste);

    /*
    fetch(urlBackend + "/candidato", { method: "GET" })
          .then((resposta) => resposta.json())
          .then((listaCandidatos) => {
            if (Array.isArray(listaCandidatos)) {
              const resultadoBusca = listaCandidatos.filter((candidato) =>
                  candidato.nome
                  .toLowerCase()
                  .includes(termoBusca.toLowerCase())
              );
              props.setCanditados(resultadoBusca);
            }
          });

          */
  }

  /*  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, "0");
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
*/

  return (
    <Container>
      <br></br>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Inscrever-se
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Pesquisar candidatos"
          onChange={buscarEntrevistas}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <div className="table-responsive">
        <div>
          <br />
          <br />
          <h2 className="text-center">INSCRIÇÕES EFETUADAS</h2>
        </div>
        <br />
        <br />
        <br />
        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              {/* <th scope="col">Código</th> */}
              <th scope="col">Nome</th>
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
              <th scope="col">Cargo</th>
              <th scope="col">Empresa</th>
              <th scope="col">Tipo Vaga</th>
              <th scope="col">Salario</th>
              {/* <th scope="col">Ações</th> */}
            </tr>
          </thead>
          <tbody>
            {listaCandidatos?.map((candidato) => {
              return (
                <tr key={candidato.codigo}>
                  <td>{candidato.nome}</td>
                  <td>{candidato.cidade}</td>
                  <td>{candidato.estado}</td>
                  <td>{candidato.vagas.cargo}</td>
                  <td>{candidato.vagas.empresa}</td>
                  <td>{candidato.vagas.tipoVaga}</td>
                  <td>{candidato.vagas.salario}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
