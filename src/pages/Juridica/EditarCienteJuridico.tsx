import { Button, Flex, InputBase, Switch, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IMaskInput } from "react-imask";
import cadastraCliente from "../../services/client/cadastraClientesJ";
import style from "./Cadastro.module.css";


export default function EditarClienteJuridico() {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const form = useForm({
    initialValues: {
      razaosocial: "",
      cgc: "",
      fantasia: "",
      telefone: "",
      email: "",
      cep: "",
      cidade: "",
      estado: "",
      numero: "",
      bairro: "",
      ramodeatividade: "",
      logradouro: "",
      usursefaz: "",
      passsefaz: "",
      contrato: "",
      pais: "",
      cnae: "",
    },
    validate: {
      razaosocial: isNotEmpty("O campo de razão social não pode ser vazio"),
      cgc: isNotEmpty("O campo de cgc não pode ser vazio"),
      fantasia: isNotEmpty("O campo de nome fantasia não pode ser vazio"),
      telefone: isNotEmpty("O campo de telefone não pode ser vazio"),
      email: isNotEmpty("O campo de email não pode ser vazio"),
      cidade: isNotEmpty("O campo de cidade não pode ser vazio"),
      cep: isNotEmpty("O campo de cep não pode ser vazio"),
      estado: isNotEmpty("O campo de estado não pode ser vazio"),
      bairro: isNotEmpty("O campo de bairro não pode ser vazio"),
      numero: isNotEmpty("O campo de numero não pode ser vazio"),
      ramodeatividade: isNotEmpty("O campo de atividades não pode ser vazio"),
      logradouro: isNotEmpty("O campo de logradouro não pode ser vazio"),
      usursefaz: isNotEmpty("O campo de usuário não pode ser vazio"),
      passsefaz: isNotEmpty("O campo de senha não pode ser vazio"),
      contrato: isNotEmpty("O campo de contrato não pode ser vazio"),
      pais: isNotEmpty("O campo de país não pode ser vazio"),
      cnae: isNotEmpty("O campo de CNAE não pode ser vazio"),
    },
  });

  const cadastra = async ({
    razaosocial,
    cgc,
    fantasia,
    telefone,
    email,
    cep,
    cidade,
    estado,
    bairro,
    numero,
    ramodeatividade,
    logradouro,
    usursefaz,
    passsefaz,
    contrato,
    pais,
    cnae,
  }: {
    razaosocial: string;
    cgc: string;
    fantasia: string;
    telefone: string;
    email: string;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    numero: string;
    ramodeatividade: string;
    logradouro: string;
    usursefaz: string;
    passsefaz: string;
    contrato: string;
    pais: string;
    cnae: string;
  }) => {
    try {
      await cadastraCliente({
        razaosocial,
        cgc,
        fantasia,
        telefone,
        email,
        cep,
        cidade,
        estado,
        bairro,
        numero,
        ramodeatividade,
        logradouro,
        usursefaz,
        passsefaz,
        contrato,
        pais,
        cnae,
      });
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={form.onSubmit(cadastra)}>
        <Flex direction="column" align="center" p="xs">
          <Flex
            wrap="wrap"
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            className={style.swicths}
          >
            <Flex justify={isMobile ? "center" : "space-between"}>
              <Switch.Group
                label="Contrato"
                withAsterisk
                size="sm"
                {...form.getInputProps("contrato")}
              >
                <Switch value="Contrato" defaultChecked />
              </Switch.Group>
            </Flex>
            <Flex
              align="center"
              columnGap="5.4em"
              justify={isMobile ? "center" : "space-between"}
            >
              <Switch.Group label="Fiscal" size="sm">
                <Switch value="fiscal" />
              </Switch.Group>
              <Switch.Group label="Pessoal" size="sm">
                <Switch value="pessoal" />
              </Switch.Group>
              <Switch.Group label="Contábil" size="sm">
                <Switch value="contabil" />
              </Switch.Group>
            </Flex>
          </Flex>
          <Flex
            justify={isMobile ? "center" : "space-between"}
            wrap="wrap"
            gap="xs"
          >
            <TextInput
              label="Razão Social"
              placeholder="Informe a razão social"
              className={style.inputCamp}
              {...form.getInputProps("razaosocial")}
            />

            <TextInput
              label="Fantasia"
              placeholder="Informe o nome fantasia"
              className={style.inputCamp}
              {...form.getInputProps("fantasia")}
            />
            <InputBase<any>
              label="CNPJ"
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="Informe o CNPJ"
              className={style.inputCamp}
              {...form.getInputProps("cgc")}
            />
            <InputBase<any>
              label="Telefone"
              component={IMaskInput}
              mask="+00 (00) 00000-0000"
              placeholder="Informe o telefone"
              className={style.inputCamp}
              {...form.getInputProps("telefone")}
            />
            <TextInput
              label="E-mail"
              placeholder="Informe o e-mail"
              className={style.inputCamp}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="CNAE"
              placeholder="Informe o cnae"
              className={style.inputCamp}
              {...form.getInputProps("cnae")}
            />

            <TextInput
              label="Ramo de Atividade"
              placeholder="Informe o ramo de atividade"
              className={style.inputCamp}
              {...form.getInputProps("ramodeatividade")}
            />

            <InputBase<any>
              label="CEP"
              component={IMaskInput}
              mask="00000-000"
              placeholder="Informe o CEP"
              className={style.inputCamp}
              {...form.getInputProps("cep")}
            />
            <TextInput
              label="Cidade"
              placeholder="Informe o cidade"
              className={style.inputCamp}
              {...form.getInputProps("cidade")}
            />

            <TextInput
              label="Logradouro"
              placeholder="Informe o logradouro"
              className={style.inputCamp}
              {...form.getInputProps("logradouro")}
            />
            <TextInput
              label="Bairro"
              placeholder="Informe o Bairro"
              className={style.inputCamp}
              {...form.getInputProps("bairro")}
            />

            <TextInput
              label="Estado"
              placeholder="Informe o estado"
              className={style.inputCamp}
              {...form.getInputProps("estado")}
            />

            <TextInput
              label="País"
              placeholder="Informe o País"
              className={style.inputCamp}
              {...form.getInputProps("pais")}
            />

            <TextInput
              label="Número"
              placeholder="Informe o numero"
              className={style.inputCamp}
              {...form.getInputProps("numero")}
            />

            <TextInput
              label="Usuário Sefaz"
              placeholder="Login"
              className={style.inputCamp}
              {...form.getInputProps("usursefaz")}
            />
            <TextInput
              label="Senha Sefaz"
              placeholder="Senha"
              className={style.inputCamp}
              {...form.getInputProps("passsefaz")}
            />
          </Flex>
          <Button mt="xl" className={style.salvar}>
            Salvar
          </Button>
        </Flex>
      </form>
    </div>
  );
}
