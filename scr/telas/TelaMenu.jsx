import Pagina from "../templates/Pagina";
import { format } from "date-fns";
import React from "react";
import { useState, useEffect } from "react";
import { urlBackend } from "../assets/funcoes";
import fundo from "./fundo5.jpg";

export default function TelaMenu(props) {
  const [listaVagas, setListaVaga] = useState([]);

  useEffect(() => {
    const getVagas = async () => {
      try {
        const retornoVagas = await fetch(urlBackend + "/vaga", {
          method: "GET",
        });

        if (retornoVagas.ok) {
          const listaVagas = await retornoVagas.json();
          setListaVaga(listaVagas.listaVagas);

          listaVagas.forEach((vaga) => {
            vaga.dataPublicacao = format(
              new Date(vaga.dataPublicacao),
              "dd/MM/yyyy"
            );
          });
          setListaVaga(listaVagas.listaVagas);
        } else {
          console.error("Erro ao buscar vagas:", retornoVagas.statusText);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    };

    getVagas();
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

      <div className="container">
        <br />
        <br />
        <h1 className="text-center mb-4">
          VAGAS DE EMPREGO PARA PROFISSIONAIS DE TI
        </h1>

        <h6 className="text-center mb-4">
          As empresas parceiras oferecem oportunidades emocionantes para
          crescimento profissional. Com uma demanda crescente por talentos em
          tecnologia, você terá a chance de desenvolver sua carreira em um
          ambiente dinâmico e inovador.
        </h6>
        <br />
        <br />
        <br />
        <br />
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Código da Vaga</th>
                <th scope="col">Cargo</th>
                <th scope="col">Tipo de Contratação</th>
                <th scope="col">Empresa</th>
                <th scope="col">Localização</th>
                <th scope="col">Salário R$</th>
                <th scope="col">Data Publicação</th>
              </tr>
            </thead>
            <tbody>
              {listaVagas.map((vaga) => (
                <tr key={vaga.codigoVaga}>
                  <td>{vaga.codigoVaga}</td>
                  <td>{vaga.cargo}</td>
                  <td>{vaga.tipoVaga}</td>
                  <td>{vaga.empresa}</td>
                  <td>{vaga.localizacao}</td>
                  <td>{vaga.salario}</td>
                  <td>{vaga.dataPublicacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Pagina>
  );
}
