import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DataTable } from "mantine-datatable";
import { useNavigate } from "react-router-dom";
import deleteFuncionario from "../../services/funcionarios/deletaFuncionario";
import listaFuncionarios from "../../services/funcionarios/listaFuncionarios";
import Acoes from "../Acoes";
import { Title, Flex, Button } from "@mantine/core";
import style from "./ListaFuncionario.module.css";

interface PropsData {
  id: string;
}

export default function ListaFuncionario(props: PropsData) {
  const navigate = useNavigate();

  const { data, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["funcionario"],
    queryFn: async () => listaFuncionarios(props.id),
  });

  const exclui = async (cpf: string) => {
    try {
      await deleteFuncionario(cpf);
      showNotification({
        title: "Ok",
        message: "Exclusão efetuada com sucesso!",
        color: "green",
      });
      refetch().catch(() => {});
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error?.response?.data?.message
          : "Ocorreu um erro ao excluir. Por favor, tente novamente";
      showNotification({
        title: "Erro",
        message,
        color: "red",
      });
    }
  };

  return (
    <Flex direction="column">
      <Flex justify="center" mb="xs">
        <Title order={2} className={style.titulo}>
          Funcionários
        </Title>
      </Flex>
      <DataTable
        minHeight={132}
        withBorder
        shadow="sm"
        striped
        highlightOnHover
        horizontalSpacing="xs"
        verticalAlignment="center"
        records={data}
        fetching={isFetching || isRefetching}
        idAccessor="cpf"
        columns={[
          { accessor: "nome", title: "Nome", textAlignment: "center" },
          { accessor: "cpf", title: "CPF", textAlignment: "center" },
          {
            accessor: "rg",
            title: "RG",
            textAlignment: "center",
          },
          { accessor: "funcao", title: "Função", textAlignment: "center" },
          { accessor: "telefone", title: "Tell", textAlignment: "center" },
          {
            accessor: "",
            title: "Ações",
            textAlignment: "right",
            render: (data) => (
              <Acoes
                acaoDetalhar={() =>
                  navigate(`/detalha/funcionarios/${data.cpf}`)
                }
                acaoEditar={() => navigate(`/edita/funcionarios/${data.cpf}`)}
                acaoExcluir={() => exclui(data.cpf)}
              />
            ),
          },
        ]}
        noRecordsText="Nenhum registro encontrado!"
      />
      <Flex justify="flex-end" mt="xs">
        <Button
          className="botao"
          onClick={() => navigate(`/cadastra/funcionarios/${props.id}`)}
        >
          +
        </Button>
      </Flex>
    </Flex>
  );
}
