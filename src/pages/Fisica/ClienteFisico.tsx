import { Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Certificados from "../../components/Certificado/Certificados";
import EnderecoCliente from "../../components/EnderecoCliente";
import ListaFuncionarioJuridico from "../../components/Funcionarios/ListaFuncionario";
import InfoClienteF from "../../components/InfoClienteF";
import listaClienteById from "../../services/client/listaClienteById";
import style from "./ClienteFisica.module.css";

export default function ClienteJuridico() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const {isError,  data: Client } = useQuery({
    queryKey: ["clientF"],
    queryFn: async () => listaClienteById(id),
  });

  useEffect(() => {
    if (isError) {
      navigate("/fisico");
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
        <InfoClienteF
          Contrato={Client?.contrato}
          Apelido={Client?.apelido}
          Nome={Client?.nome}
          Tel={Client?.telefone}
          Email={Client?.email}
          Cgc={Client?.cgc}
          Ramo={Client?.ramoatividade}
          Cnae={Client?.cnae}
          //Planos="Fiscal, Contábil e Pessoal"
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
