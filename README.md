# URL shortner

## Tecnologias usadas

Tecnologias usadas nesse projeto:

* Knex ✅
* Node-tap ✅
* Typescript ✅
* Fastify ✅
* Swagger ✅
* Eslint ✅
* Prettier ✅
* Lefthook ✅
* K6 para teste de carga

## Objetivos

Meu objetivo é com este projeto é testar a praticar estratégias para escalar um encurtador de url's.

A principais métricas que pretendo monitorar são as escritas (encuramento de links) e as leituras (redirect).

Um bom número para as escritas é mante-las abaixo de 50ms e para os redirects mantê-los abaixo de 20ms de latência.

As principais ferramentas do mercado - Bitly e TinyURL - lidam com milhões de solicitações (geração de link/ redirecionamentos) por por dia.

1000 redirects/s com um tempo menor do que 20ms.
100 escritas por segundo com latência menor do que 50ms.
