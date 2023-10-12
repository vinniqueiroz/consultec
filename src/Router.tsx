import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import CadastroFisica from "./pages/Fisica/CadastroFisica";
import ClienteFisico from "./pages/Fisica/ClienteFisico";
import Fisica from "./pages/Fisica/Fisica";
import Home from "./pages/Home/Home";
import CadastroJuridica from "./pages/Juridica/CadastroJuridica";
import ClienteJuridico from "./pages/Juridica/ClienteJuridico";
import EditarClienteJuridico from "./pages/Juridica/EditarCienteJuridico";
import EditarClienteFisico from "./pages/Fisica/EditarClienteFisico";
import Juridica from "./pages/Juridica/Juridica";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import Atalhos from "./pages/Atalhos/Atalhos";
import { useAuthStore } from "./stores/useAuthStore";

const AuthRoute = () => {
  const { access_token } = useAuthStore.getState();

  if (access_token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

function ProtectedRoute({ outlet }: { outlet: JSX.Element }) {
  const { access_token } = useAuthStore.getState();

  if (!access_token) {
    return <Navigate to="/session/login" />;
  }
  return outlet;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/session/login" element={<Login />} />
        </Route>
        <Route>
          <Route path="/*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<ProtectedRoute outlet={<Home />} />}>
          <Route
            path="/Atalhos"
            element={<ProtectedRoute outlet={<Atalhos />} />}
          />
          <Route
            path="/juridica"
            element={<ProtectedRoute outlet={<Juridica />} />}
          />
          <Route
            path="/cadastro/juridica"
            element={<ProtectedRoute outlet={<CadastroJuridica />} />}
          />
          <Route
            path="/cliente/juridico/:id"
            element={<ProtectedRoute outlet={<ClienteJuridico />} />}
          />
          <Route
            path="/cliente/editar/juridico/:id"
            element={
              <ProtectedRoute
                outlet={
                  <EditarClienteJuridico
                    razaosocial="teste"
                    cgc="teste"
                    fantasia="teste"
                    telefone="teste"
                    email="teste"
                    cep="teste"
                    cidade="teste"
                    estado="teste"
                    numero="teste"
                    bairro="teste"
                    ramodeatividade="teste"
                    logradouro="teste"
                    usursefaz="teste"
                    passsefaz="teste"
                    contrato="teste"
                    pais="teste"
                    cnae="teste"
                    plcontabil="teste"
                    plfiscal="teste"
                    plpessoal="teste"
                  />
                }
              />
            }
          />
          <Route
            path="/fisica"
            element={<ProtectedRoute outlet={<Fisica />} />}
          />
          <Route
            path="/cadastro/fisica"
            element={<ProtectedRoute outlet={<CadastroFisica />} />}
          />
          <Route
            path="/cliente/editar/fisico/:id"
            element={
              <ProtectedRoute
                outlet={
                  <EditarClienteFisico
                    nome="teste"
                    cgc="teste"
                    apelido="teste"
                    telefone="teste"
                    email="teste"
                    cep="teste"
                    cidade="teste"
                    estado="teste"
                    numero="teste"
                    bairro="teste"
                    ramodeatividade="teste"
                    logradouro="teste"
                    usursefaz="teste"
                    passsefaz="teste"
                    contrato="teste"
                    pais="teste"
                    cnae="teste"
                    plcontabil="teste"
                    plfiscal="teste"
                    plpessoal="teste"
                  />
                }
              />
            }
          />
          <Route
            path="/cliente/fisico/:id"
            element={<ProtectedRoute outlet={<ClienteFisico />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
