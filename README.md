# Contrato Digital (em desenvolvimento)

## 📝 Sobre o Projeto

Contrato Digital é uma aplicação web que permite a criação, assinatura e envio de contratos digitais de forma simples e segura. O sistema facilita todo o processo de gestão contratual desde a geração até o envio por email para todas as partes interessadas.

## ✨ Funcionalidades

- Geração de contratos digitais personalizados
- Interface intuitiva para assinatura digital
- Envio automático dos contratos assinados por email
- Design responsivo para dispositivos móveis e desktop

## 🖼️ Screenshots

### Tela Inicial

![Tela Inicial](./assets/Home.png)

### Painel de Contratos

![Painel de Contratos](./assets/Panel.png)

### Criar Contratos

![Criar Contratos](./assets/CreateContract.png)

### Link para cliente assinar

![Link](./assets/Contract.png)

### Pagina para o cliente assinar

![Cliente](./assets/Client.png)

## 🛠️ Tecnologias Utilizadas

### Frontend

- Tailwind
- React JS
- Vite

### Backend

- Node.js
- Express
- Nodemailer (para envio de emails)
- CORS
- dotenv (gerenciamento de variáveis de ambiente)

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn

### Configuração do Backend

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/contrato-digital.git
cd signature-React
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

- App password Gmail = "https://myaccount.google.com/apppasswords"
- App password Microsoft = "https://account.live.com/proofs/manage/additional"
- App password Yahoo = "https://login.yahoo.com/account/security"

```
PORT=3001
EMAIL_FROM=seu-email@gmail.com
EMAIL_PASS=sua-senha-ou-app-password
```

4. Inicie o servidor de desenvolvimento:

```bash
node index.js
```

### Configuração do Frontend

1. Instale as dependências:

```bash
cd frontend
npm install
```

2. Inicie o front end:

```bash
npm run dev
```

## 🔌 API Endpoints

### POST /send-contract

Envia o contrato assinado por email.

**Parâmetros:**

```json
{
  "pdfBase64": "Base64_do_PDF_assinado",
  "clientEmail": "email_do_cliente@exemplo.com",
  "adminEmail": "email_do_administrador@exemplo.com"
}
```

**Resposta de Sucesso:**

```json
{
  "message": "E-mail enviado com sucesso!"
}
```

## 🚀 Implementações Futuras

- Autenticação de usuários
- Dashboard para acompanhamento de contratos
- Modelos de contratos personalizáveis
- Versão para dispositivos móveis
- Integração com assinaturas digitais certificadas

## 👤 Autor

[Dionatha Goulart]

- LinkedIn: [seu-linkedin](https://www.linkedin.com/in/dionathagoulart/)
- GitHub: [seu-github](https://github.com/GoodGD-Dev)
