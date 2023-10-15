import { Flex, Text, Title, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DataTable } from "mantine-datatable";
import ModalCadCertificado from "../../components/Certificado/ModalCadCertificado";
import ModalEditCertificado from "../../components/Certificado/ModalEditCertificado";
import { Certificado } from "../../services/certificado/Certificado";
import deletaCertificado from "../../services/certificado/deletaCertificado";
import listaCertificadoById from "../../services/certificado/listaCertificadoById";
import style from "./certificado.module.css";

interface PropsData {
  id: string;
}

export default function Certificados(props: PropsData) {
  const {
    data: certificados,
    isFetching,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["certificados"],
    queryFn: async () => listaCertificadoById(props.id),
  });

  const atualizaDados = () => {
    refetch();
  };

  const AbreModalCadastrarCertificado = (certificados: Certificado) => {
    modals.open({
      title: "Cadastrar certificado",
      children: (
        <ModalCadCertificado
          certificado={certificados}
          close={modals.closeAll}
          onSuccess={atualizaDados}
        />
      ),
    });
  };

  const AbreModalEditCertificado = (certificados: Certificado) =>
    modals.open({
      title: "Editar certificado",
      children: (
        <ModalEditCertificado
          certificado={certificados}
          close={modals.closeAll}
          onSuccess={atualizaDados}
        />
      ),
    });

  const excluirCertificado = (certificado: Certificado) =>
    modals.openConfirmModal({
      title: "Exclusão",
      children: (
        <Text size="sm">
          Você está prestes a excluir o certificado "{certificado.nome}". Tem
          certeza disso?
        </Text>
      ),
      labels: { confirm: "Confirmar Exclusão", cancel: "Cancelar" },
      onConfirm: () => exclui(certificado._id),
    });

  const exclui = async (_id: string) => {
    try {
      await deletaCertificado(_id);
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
    <Flex direction='column' className={style.certificadoMobile}>
      <Flex direction="column" align="center" className={style.certificados}>
        <Title order={2} mb="xs" className={style.titulo}>
          Certificados
        </Title>
        <DataTable
          minHeight={200}
          withBorder
          shadow="sm"
          striped
          highlightOnHover
          horizontalSpacing="xl"
          verticalAlignment="center"
          className={style.certificadosTable}
          fetching={isFetching || isRefetching}
          records={certificados || []}
          idAccessor="_id"
          columns={[
            { accessor: "nome", title: "Nome", textAlignment: "center" },
            { accessor: "senha", title: "Senha", textAlignment: "center" },
            {
              accessor: "descricao",
              title: "Descrição",
              textAlignment: "center",
            },
            {
              accessor: "dtvalidade",
              title: "Validade",
              textAlignment: "center",
            },
          ]}
          noRecordsText="Nenhum registro encontrado!"
          rowContextMenu={{
            trigger: "click",
            items: (record) => [
              {
                key: "Cadastrar",
                onClick: () => AbreModalCadastrarCertificado(record),
              },
              {
                key: "editar",
                onClick: () => AbreModalEditCertificado(record),
              },
              {
                key: "excluir",
                onClick: () => excluirCertificado(record),
              },
            ],
          }}
        />
      </Flex>
      <Flex justify="flex-end" mt='xs'>
        <Button className="botao">+</Button>
      </Flex>
    </Flex>
  );
}
