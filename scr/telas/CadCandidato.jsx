import Pagina from "../templates/Pagina";
import FormCandidato from "../formularios/Candidato";
import TabelaCandidatos from "../tabelas/TabelaCandidatos";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import React from "react";
import fundo from "./fundo5.jpg";

export default function TelaCadCandidato(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [candidatos, setCandidatos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  
  const [candidatoEdicao, setCandidatoEdicao] = useState({
    cpf:0,
    nome: "",
    dataNascimento: "",
    email: "",
    telefone: "",
    cidade: "",
    estado : "",
  });

  function prepararTela(candidato) {
    setModoEdicao(true);
    setCandidatoEdicao(candidato);
    setExibirTabela(false);
  }
  useEffect(() => {


    const getCandidatos = async () => {
      try {
             
        const retorno = await fetch(urlBackend + "/candidato", {
          method: "GET",
        });
        if (retorno.ok) {
          const listaCandidatos = await retorno.json();
          const nomesVagas = listaCandidatos.listaCandidatos.map((vagas) => vagas.nome);
          props.setCandidatos(nomesVagas);
        } else {
          console.error("Erro ao buscar vagas:", retorno.statusText);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    };

    getCandidatos();
  }, []);


  return (
    <Pagina>
      <style>
        {`
          body {
            background-image: url(${fundo});
            background-size: cover;
            height: 100vh;
            margin: 0; 
            padding: 0;
            
          }
        `}
      </style>
      <Container className="border">
        {exibirTabela ? (
          <TabelaCandidatos
            listaCandidatos={candidatos}
            setCanditados={setCandidatos}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            // excluir={excluirPessoa}
          />
        ) : (
          <FormCandidato
          
            listaCandidatos={candidatos}
             setCanditado={setCandidatos}
             exibirTabela={setExibirTabela}
             modoEdicao={modoEdicao}
             setModoEdicao={setModoEdicao}
             editar={prepararTela}
             candidato={candidatoEdicao}
          />
        )}
      </Container>
    </Pagina>
  );
}
