# Burger Queen

## Índice

- [1. Introdução](#1-introdução)
- [2. Desafio](#2-desafio)
- [3. Desenvolvimento](#3-desenvolvimento)
- [3.1 Prótotipos](#3.1-protótipos)
- [3.2 Histórias de Usuários](#3.2-histórias-de-usuários)
- [3.3 Ferramentas e Tecnologias](#3.2-ferramentas-e-tecnologias)
- [4. Equipe de Desenvolvedoras](#4-equipe-de-desenvolvedoras)


---

## 1. Introdução

A **GG Burguer** é uma interface que visa  garantir maior flexibilidade e autonomia no fluxo de trabalho dos funcionários da Hamburgueria.
Com o auxílio de um tablet é possível acessar o sistema, registrar a escolha do cliente e direcionar o pedido para a cozinha que receberá a nova demanda. Além disso, o Chef consegue alterar o status do pedido e assim sinalizar para o atendente que o mesmo está  pronto para ser entregue. 
A plataforma também armazena as informações de todo o fluxo de trabalho, como a descrição do pedido e seu tempo de preparo.

## 2. Desafio

A GG Burguer é uma empresa reconhecida por oferecer um atendimento de excelência, por isso é prioritário garantir que  os processos ocorram de forma dinâmica. Considerando que a GG Burguer ampliou seu tempo de atendimento para 24 horas e a demanda de clientes aumentou. 
Visto isso, a equipe junto com a Product Owner desenvolvemos uma  interface que oferece funcionalidades que proporciona experiência de trabalho mais ágil e dinâmica aos envolvidos.
**O sistema GG Burguer** permite que os atendentes registem a escolha do cliente e envie o mesmo para a cozinha onde o Chef visualizará a nova demanda.

![out](https://user-images.githubusercontent.com/110297/45984241-b8b51c00-c025-11e8-8fa4-a390016bee9d.gif)

## 3. Desenvolvimento

### 3.1 Protótipos


Durante o brainstorming de elaboração de skecthes da interface do sistema decidimos tomar como base PDVs (Ponto de Venda, também conhecido como Frente de Caixa) para garantir uma melhor usabilidade e experiência ao usuário.

### 3.2 Histórias de Usuários

A equipe trabalhou utilizando metodologia Scrum desenvolvendo uma história de usuário por sprint com foco na entrega de valor ao usuário. 

#### [História de usuário 1] Usuário deve ter seu perfil (login/senha) para acessar o sistema.

Eu como funcionário do restaurante quero entrar na plataforma e ver apenas a tela importante para o meu trabalho.

##### Critérios de aceitação

O que deve acontecer para satisfazer as necessidades do usuário?

- Criar login e senha.
- Registar tipo de usuário (cozinha / salão), login e senha.
- Entrar na tela correta para cada usuário.

##### Definição de pronto

O acordado abaixo deve acontecer para dizer que a história está terminada:

- Você fez _testes_ de usabilidade e incorporou o feedback do usuário.
- Você deu deploy de seu aplicativo.

---

#### [História de usuário 2] Garçom/Garçonete deve poder anotar o seu pedido

Eu como garçom/garçonete quero poder anotar o meu pedido saber o valor de cada
produto e poder enviar o pedido para a cozinha para ser preparado.

##### Critérios de aceitação

O que deve acontecer para satisfazer as necessidades do usuário?

- Anotar o nome e mesa.
- Adicionar produtos aos pedidos.
- Excluir produtos.
- Ver resumo e o total da compra.
- Enviar o pedido para a cozinha (guardar em algum banco de dados).
- Funcionar bem e se adequar a um _tablet_.

##### Definição de pronto

O acordado abaixo deve acontecer para dizer que a história está terminada:

- Você fez _testes_ de usabilidade e incorporou o _feedback_ do usuário.
- Você deu deploy de seu aplicativo.

---

#### [História de usuário 3] Chefe de cozinha deve ver os pedidos

Eu como chefe de cozinha quero ver os pedidos dos clientes em ordem, poder marcar que estão prontos e poder notificar os garçons/garçonetes que o pedido está pronto para ser entregue ao cliente.

##### Critérios de aceitação

- Ver os pedidos à medida em que são feitos.
- Marcar os pedidos que foram preparados e estão prontos para serem servidos.
- Ver o tempo que levou para preparar o pedido desde que chegou, até ser marcado como concluído.

##### Definição de pronto

- Você fez _testes_ de usabilidade e incorporou o _feedback_ do usuário.
- Você deu deploy de seu aplicativo.

---

#### [História de usuário 4] Garçom/Garçonete deve ver os pedidos prontos para servir

Eu como garçom/garçonete quero ver os pedidos que estão prontos para entregá-los rapidamente aos clientes.

##### Critérios de aceitação

- Ver a lista de pedidos prontos para servir.
- Marque os pedidos que foram entregues.

##### Definição de pronto

- Você fez _testes_ de usabilidade e incorporou o _feedback_ do usuário.
- Você deu deploy de seu aplicativo.
- Os dados devem ser mantidos intactos, mesmo depois que um pedido foi terminado. Tudo isso para poder ter estatísticas no futuro.

---

### 3.3 Ferramentas e Tecnologias

Para desenvolver o sistema GG Burguer  utilizamos: 
- Trello
- React.js 
- Material UI (import de componentes e estilização da interface)
- Postman (testes com a API)
- Javascript 
- Consumo de API
- Promises e Callbacks
- HTML 5
- CSS 3
- Photoshop (criação de logos e protótipos de alta fidelidade)


## 4. Equipe de Desenvolvedoras

Para saber mais sobre as desenvolvedoras acesse:

**Gabriella Guimarães:** https://www.linkedin.com/in/gabriella-guimaraes/
**Gabrielle Almeiada:** https://www.linkedin.com/in/gabrielle-antunes-almeida/ 

