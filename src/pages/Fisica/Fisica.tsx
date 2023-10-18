import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DataTable } from "mantine-datatable";
import { useNavigate } from "react-router-dom";
import Acoes from "../../components/Acoes";
import deleteClient from "../../services/client/deletaCliente";
import listaClientesF from "../../services/client/listaClientesF";
import { Flex, TextInput } from "@mantine/core";

export default function Fisica() {
  const navigate = useNavigate();

  const { data, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["client"],
    queryFn: async () => listaClientesF(),
  });

  const exclui = async (cgc: string) => {
    try {
      await deleteClient(cgc);
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
    <div>
      <Flex justify="space-around" wrap="wrap">
        <TextInput
          label="Buscar"
          description="Filtre clientes pela Fantasia"
          placeholder="Fantasia"
          mb="md"
        />
        <TextInput
          label="Buscar"
          description="Filtre clientes pela Razão Social"
          placeholder="Razão Social"
          mb="md"
        />
        <TextInput
          label="Buscar"
          description="Filtre clientes pelo CNPJ"
          placeholder="CNPJ"
          mb="md"
        />
      </Flex>
      <DataTable
        minHeight={132}
        withBorder
        shadow="sm"
        striped
        highlightOnHover
        horizontalSpacing="xs"
        fetching={isFetching || isRefetching}
        verticalAlignment="center"
        records={data}
        idAccessor="_id"
        columns={[
          {
            accessor: "apelido",
            title: "Apelido",
            textAlignment: "center",
          },
          { accessor: "cgc", title: "CPF", textAlignment: "center" },
          { accessor: "telefone", title: "Tell", textAlignment: "center" },
          { accessor: "contrato", title: "Contrato", textAlignment: "center" },
          {
            accessor: "",
            title: "Ações",
            textAlignment: "right",
            render: (data) => (
              <Acoes
                acaoDetalhar={() => navigate(`/cliente/fisico/${data.cgc}`)}
                acaoEditar={() =>
                  navigate(`/cliente/editar/fisico/${data.cgc}`)
                }
                acaoExcluir={() => exclui(data.cgc)}
              />
            ),
          },
        ]}
        noRecordsText="Nenhum registro encontrado!"
      />
    </div>
  );
}
