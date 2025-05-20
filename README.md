# SHOPPEASY 🛍️

**SHOPPEASY** é uma plataforma de e-commerce moderna e acessível, desenvolvida como projeto pessoal. Ela permite que qualquer usuário navegue por produtos, adicione ao carrinho, realize compras com autenticação segura e acompanhe seu histórico de pedidos.

---

## 🧭 Funcionalidades

- 🏠 Página inicial com listagem de produtos (imagem, nome e preço).
- 🔍 Página de detalhes de cada produto, com produtos relacionados.
- 🛒 Carrinho de compras dinâmico:
  - Adição e remoção de produtos.
  - Alteração da quantidade.
  - Atualização automática do valor total.
- ✅ Checkout com autenticação (protegido por login).
- 🔐 Login e registro de usuários.
- 💳 Integração com PayPal (pagamento real testado).
- 📄 Página de status do pagamento (sucesso ou falha).
- 👤 Perfil do usuário com informações e histórico de pedidos.

---

## 💻 Tecnologias Utilizadas

### 🔷 Front-end
- [ReactVT](https://react.dev/)
- JSX
- Bootstrap
- HTML
- JavaScript

### 🔶 Back-end
- Python
- Django
- Django REST Framework

### 🗄️ Banco de Dados
- SQLite (banco de dados padrão do Django)

### 💰 Pagamento
- PayPal (redirecionamento, autenticação e status de pagamento)

## 🚀 Como rodar o projeto localmente
```bash
# Clone o repositório
git clone https://github.com/weesllen/E-commerce_shoppeasy.git
cd shopp-easy

# Instale as dependências do backend e frontend
cd ../shoppeasy
python -m venv venv
pip install -r requirements.txt
# Execute o servidor Django na porta 8001
python manage.py runserver 8001

cd ../shoppeasy_app
npm install
# Inicie os servidores
npm run dev 