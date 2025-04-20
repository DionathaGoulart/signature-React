# Aplicativo de Assinatura de Contratos

Este é um aplicativo front-end para criação e assinatura de contratos digitais. Ele permite que administradores criem modelos de contratos com campos personalizados e gerem links para que clientes preencham e assinem esses contratos.

## Funcionalidades

### Para Administradores:

- Criar modelos de contratos com campos dinâmicos
- Visualizar contratos criados
- Gerar links para enviar aos clientes
- Visualizar contratos assinados

### Para Clientes:

- Preencher os dados solicitados no contrato
- Assinar o contrato digitalmente
- Baixar o contrato em PDF
- Receber cópia do contrato por e-mail (simulado no front-end)

## Tecnologias Utilizadas

- React.js
- React Router
- jsPDF (para geração de PDFs)
- React Signature Canvas (para captura de assinaturas)
- LocalStorage (para simulação de banco de dados)

## Como Executar

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Execute o aplicativo com `npm start`
4. Acesse `http://localhost:3000` no seu navegador

## Fluxo de Uso

1. **Administrador**: Acesse o painel de administração e crie um novo contrato
2. **Administrador**: Gere um link para o cliente
3. **Cliente**: Acesse o link, preencha os dados e assine o contrato
4. **Cliente**: Receba o PDF do contrato assinado

## Exemplo de Modelo de Contrato

```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Eu, {cliente}, portador do CPF {cpf}, contrato os serviços de {empresa} para {servico}, pelo valor de R$ {valor}.

O prazo para conclusão dos serviços será de {prazo} dias úteis.

{assinatura}
```

## Limitações da Versão Atual

- Apenas front-end, sem persistência real de dados
- Sistema de envio de e-mails simulado
- Não há autenticação de usuários
- Para um ambiente de produção, seria necessário um backend
