# 🛒 ShoppingDev

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

**ShoppingDev** é uma aplicação de E-commerce em desenvolvimento, criada para colocar em prática conhecimentos em **React + TypeScript** com integração ao **Firebase**  

👉 Acesse o projeto: [shopping-dev-plum.vercel.app](https://shopping-dev-plum.vercel.app/)

---

## ✨ Funcionalidades

- **Página Inicial:** Exibição dos produtos disponíveis.  
- **Detalhes do Produto:** Informações detalhadas do item selecionado.  
- **Cadastro e Login:** Autenticação segura com Firebase Auth.  
- **Carrinho de Compras:** Adicionar, remover, aumentar/diminuir quantidade, limpar carrinho e calcular valores com frete.  
- **Finalização de Compra:** Registro da compra no banco de dados.  
- **Histórico de Compras:** Dashboard exclusivo para o usuário consultar pedidos finalizados.  
- **Detalhes da Compra:** Visualização dos itens adquiridos com suas respectivas quantidades.  
- **Rotas Protegidas:** Áreas como Dashboard, Carrinho e Compras só são acessíveis para usuários autenticados.  

---

## 🛠️ Tecnologias Utilizadas

- [React + Vite](https://react.dev/): Criação de interfaces de usuário rápidas e dinâmicas.  
- [TypeScript](https://www.typescriptlang.org/): Tipagem estática para maior segurança e escalabilidade.  
- [Tailwind CSS](https://tailwindcss.com/): Estilização rápida e responsiva.  
- [Firebase](https://console.firebase.google.com/): Autenticação, banco de dados e storage.  
- [Context API](https://pt-br.legacy.reactjs.org/docs/context.html): Gerenciamento de estado global.  
- [React Router DOM](https://reactrouter.com/home): Navegação entre páginas.  
- [React Icons](https://react-icons.github.io/react-icons/): Conjunto de ícones prontos para uso.  
- [React Hot Toast](https://react-hot-toast.com/): Notificações simples e elegantes.  
- [React Hook Form](https://react-hook-form.com/): Gerenciamento de formulários com performance.  
- [Zod](https://zod.dev/): Validação de dados integrada aos formulários.  
- [Fake Store API](https://fakestoreapi.com/products): Consumo de uma API externa para simular um catálogo de produtos reais, permitindo a exibição e manipulação de itens no frontend.  
- [axios](https://zod.dev/): Para consumir API.  


---

## 🚀 Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/erick-d-ps/shoppingDev.git

# Acesse o diretório do projeto
cd shoppingDev

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
