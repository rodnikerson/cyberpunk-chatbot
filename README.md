## Cyberpunk Chatbot

Possui uma interface única estilizada segundo o jogo Cyberpunk 2077, sendo construído com html, scss e javascript. Nesse sentido, possui integração para fazer requests à um banco de dados Supabase, consultando uma base de conhecimento e gerando vetores através da OpenAI. Por fim, retorna uma resposta personalizada baseado na base de conhecimento - que possui algumas informações da minha pessoa.

## Imagens do Projeto

![image](https://github.com/user-attachments/assets/544aa249-e568-4c1c-bca4-1e9b16826e6d)

![image](https://github.com/user-attachments/assets/fefc7a9a-71bc-4050-85d3-1409f52eff06)

![image](https://github.com/user-attachments/assets/8d8c1940-007a-4151-b132-1d0d84207bdc)

![image](https://github.com/user-attachments/assets/112dc5e6-d949-49a1-adde-4511c9453f07)

## Instalação

#### Example:  

Clone o repositório. Você precisará de node e npm instalados globalmente na sua máquina.  

Ao entrar na pasta, insira no terminal:

`npm install`  

Gere o build:  

`npx webpack --config webpack.config.js`  

Para iniciar o servidor, basta ter o live-server instalado e algum compilador de SASS ativo. 

Para visitar o app em funcionamento:

`link a ser adc...`  

## Reflexão

Esse foi um projeto que realizei em um fim de semana, visando aprimorar minhas habilidades de ferramentas mais triviais, mas bem importantes. Preferi utilizar javascript puro e scss justamente por serem coisas que não utilizava há algumas semanas por conta do trabalho, que utilizamos praticamente apenas frameworks.

Essa aplicação se complementa com uma aplicação de back-end que realiza as consultas no banco de dados vetorial do Supabase, então foi uma ótima prática tanto em termos de front-end, back-end e até banco de dados.

## Bibliotecas

- shuffle-text;
- dotenv;
- openai;
- express;
- supabase.
