import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  FormControl,
  InputGroup,
  Col,
  Row,
} from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import "./config.css";
import InputMask from "react-input-mask";

export default function FormCandidato(props) {
  const [editvaga, setEditvaga] = useState([]);
  const [listaVagas, setListaVaga] = useState([]);
  const [canditado, setCanditado] = useState({
    canditado: null,
    cpf: "",
    nome: "",
    idade: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    listaVagas: [],
  });

  useEffect(() => {
    const getVagas = async () => {
      try {
        const retornoVagas = await fetch(urlBackend + "/vaga", {
          method: "GET",
        });

        if (retornoVagas.ok) {
          const listaVagas = await retornoVagas.json();
          setListaVaga(listaVagas.listaVagas);
          const nomesVagas = listaVagas.listaVagas.map((vagas) => vagas.cargo);
          setEditvaga(nomesVagas);
        } else {
          console.error("Erro ao buscar vagas:", retornoVagas.statusText);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    };

    getVagas();
  }, []);

  const handleVagaChange = (index, e) => {
    const vagaSelecionado = listaVagas.find(
      (vaga) => vaga.cargo === e.target.value
    );

    console.log(vagaSelecionado);

    const updatedItens = [...canditado.listaVagas];
    updatedItens[index].vaga = vagaSelecionado;
    setCanditado({ ...canditado, listaVagas: updatedItens });
  };

  const handleCpfChange = (e) => {
    setCanditado({ ...canditado, cpf: e.target.value });
  };

  const handleNomeChange = (e) => {
    setCanditado({ ...canditado, nome: e.target.value });
  };

  const handleDataNascimentoChange = (e) => {
    setCanditado({ ...canditado, idade: e.target.value });
  };

  const handleEmailChange = (e) => {
    setCanditado({ ...canditado, email: e.target.value });
  };

  const handleTelefoneChange = (e) => {
    setCanditado({ ...canditado, telefone: e.target.value });
  };

  const handleCidadeChange = (e) => {
    setCanditado({ ...canditado, cidade: e.target.value });
  };

  const handleEstadoChange = (e) => {
    setCanditado({ ...canditado, estado: e.target.value });
  };

  /*
  const handleAddItem = () => {
    setCanditado({
      ...canditado,
      listaVagas: [...canditado.listaVagas, { vaga: ""}],
    });
  };
*/

  const handleAddItem = () => {
    const novaVaga = { vaga: "" };

    const vagaExiste = canditado.listaVagas.some(
      (item) => item.vaga === novaVaga.vaga
    );

    if (!vagaExiste) {
      setCanditado({
        ...canditado,
        listaVagas: [...canditado.listaVagas, novaVaga],
      });
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItens = [...canditado.listaVagas];
    updatedItens.splice(index, 1);
    setCanditado({ ...canditado, listaVagas: updatedItens });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vagasSimplificadas = canditado.listaVagas.map((vaga) => vaga.vaga);

    const requestBody = {
      cpf: canditado.cpf,
      nome: canditado.nome,
      idade: canditado.idade,
      email: canditado.email,
      telefone: canditado.telefone,
      cidade: canditado.cidade,
      estado: canditado.estado,
      vagas: vagasSimplificadas,
    };
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${urlBackend}/candidato`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        alert("Inscrição realizada com sucesso!!");
        //refresh na tela
        window.location.reload();
        window.location.reload();
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <br></br>
      <Row>
        <Col className="col-4">
          <Form.Group>
            <Form.Label className="labels">NOME</Form.Label>
            <Form.Control
              type="text"
              placeholder="Informe o nome do candidato"
              required
              value={canditado.nome}
              id="nome"
              onChange={handleNomeChange}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o nome da pessoa!
          </Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Group className="col-3">
            <Form.Label className="labels">CPF</Form.Label>
            <InputMask
              placeholder="Informe o CPF"
              mask="999.999.999-99"
              maskChar="_"
              onChange={handleCpfChange}
              value={canditado.cpf}
            >
              {(inputProps) => <Form.Control {...inputProps} type="text" />}
            </InputMask>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="col-3">
            <Form.Label className="labels">IDADE</Form.Label>
            <Form.Control
              type="int"
              onChange={handleDataNascimentoChange}
              value={canditado.idade}
              placeholder="Informe a idade"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="col-4">
            <Form.Label className="labels">E-MAIL</Form.Label>
            <FormControl
              placeholder="Informe o e-mail"
              type="text"
              onChange={handleEmailChange}
              value={canditado.email}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="col-3">
            <Form.Label className="labels">TELEFONE</Form.Label>
            <InputMask
              placeholder="Informe o telefone"
              mask="(99) 99999-9999"
              maskChar="_"
              onChange={handleTelefoneChange}
              value={canditado.telefone}
            >
              {(inputProps) => <Form.Control {...inputProps} type="text" />}
            </InputMask>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="col-4">
            <Form.Label className="labels">CIDADE</Form.Label>
            <FormControl
              placeholder="Informe a cidade"
              type="text"
              onChange={handleCidadeChange}
              value={canditado.cidade}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="col-3">
            <Form.Label className="labels">ESTADO</Form.Label>
            <FormControl
              as="select"
              onChange={(e) => handleEstadoChange(e)}
              // value={item.vaga ? item.vaga.nome : ""}
            >
              <option value="" disabled selected>
                Selecione um Estado
              </option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </FormControl>
          </Form.Group>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Form.Group>
          <Form.Label className=" labels">VAGAS DISPONÍVEIS:</Form.Label>
          {canditado.listaVagas.map((item, index) => (
            <div key={index} className="">
              <InputGroup className="mb-3">
                <FormControl
                  as="select"
                  onChange={(e) => handleVagaChange(index, e)}
                  value={item.vaga ? item.cargo : ""}
                >
                  <option value="" disabled>
                    Adicionar vagas
                  </option>
                  {editvaga.map((vaga, index) => (
                    <option key={index} value={vaga}>
                      {vaga}
                    </option>
                  ))}
                </FormControl>

                <Button
                  variant="danger"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remover
                </Button>
              </InputGroup>
            </div>
          ))}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={handleAddItem} className="ml-5">
            Adicionar vagas
          </Button>
        </Form.Group>
      </Row>
      <br />
      <Button
        variant="danger"
        type="button"
        onClick={() => {
          props.exibirTabela(true);
        }}
      >
        Cancelar/Voltar
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Submeter
      </Button>
      <div>
        <br />
      </div>
    </Form>
  );
}
