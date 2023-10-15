import { Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Certificados from "../../components/Certificado/Certificados";
import EnderecoCliente from "../../components/EnderecoCliente";
import ListaFuncionarioJuridico from "../../components/Funcionarios/ListaFuncionario";
import InfoClienteJ from "../../components/InfoClienteJ";
import listaClienteById from "../../services/client/listaClienteById";
import style from "./ClienteJuridico.module.css";
import { useEffect } from "react";

export default function ClienteJuridico() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const {isError,  data: Client } = useQuery({
    queryKey: ["clientJ"],
    queryFn: async () => listaClienteById(id),
  });

  useEffect(() => {
    if (isError) {
      navigate("/juridica");
    }
  }, [isError, id]);

  return (
    <Flex direction='column'>
      <Flex
        mt="xs"
        wrap="wrap"
        justify="space-between"
        className={style.conteudo}
      >
        <InfoClienteJ
          Contrato={Client?.contrato}
          Fantasia={Client?.fantasia}
          // Razao={Client?.razao}
          Tel={Client?.telefone}
          Email={Client?.email}
          Cgc={Client?.cgc}
          Ramo={Client?.ramoatividade}
          Cnae={Client?.cnae}
          // Planos={Client?.planos}
        />
        <EnderecoCliente
          Logradouro={Client?.logradouro}
          Numero={Client?.numero}
          Bairro={Client?.bairro}
          Cidade={Client?.cidade}
          Estado={Client?.estado}
          Cep={Client?.cep}
          Pais={Client?.pais}
        />

        <Certificados id={id} />
        
      </Flex>
      <ListaFuncionarioJuridico id={id} />
    </Flex>
  );
}
