import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DataTable } from "mantine-datatable";
import { useNavigate } from "react-router-dom";
import Acoes from "../../components/Acoes";
import deleteClient from "../../services/client/deletaCliente";
import listaClientesJ from "../../services/client/listaClientesJ";
import { modals } from "@mantine/modals";
import { Flex, Text, TextInput } from "@mantine/core";
import { Clientes } from "../../services/client/Clientes";

export default function Juridica() {
  const navigate = useNavigate();

  const { data, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["clienteID"],
    queryFn: async () => listaClientesJ(),
  });

  const abreDialogDeExclusao = (data: Clientes) =>
    modals.openConfirmModal({
      title: "Exclusão",
      children: (
        <Text size="sm">
          Você está prestes a excluir o cliente com CNPJ: #{data.cgc}"
        </Text>
      ),
      labels: { confirm: "Confirmar Exclusão", cancel: "Cancelar" },
      onConfirm: () => exclui(data._id),
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
        verticalAlignment="center"
        records={data || []}
        fetching={isFetching || isRefetching}
        idAccessor="_id"
        columns={[
          { accessor: "fantasia", title: "Fantasia", textAlignment: "center" },
          {
            accessor: "razaosocial",
            title: "Razão Social",
            textAlignment: "center",
          },
          { accessor: "cgc", title: "CNPJ", textAlignment: "center" },
          { accessor: "telefone", title: "Tell", textAlignment: "center" },
          { accessor: "contrato", title: "Contrato", textAlignment: "center" },
          {
            accessor: "acoes",
            title: "Ações",
            textAlignment: "right",
            render: (data) => (
              <Acoes
                acaoDetalhar={() => navigate(`/cliente/juridico/${data._id}`)}
                acaoEditar={() =>
                  navigate(`/cliente/editar/juridico/${data._id}`)
                }
                acaoExcluir={() => abreDialogDeExclusao(data)}
              />
            ),
          },
        ]}
        noRecordsText="Nenhum registro encontrado!"
      />
    </div>
  );
}
