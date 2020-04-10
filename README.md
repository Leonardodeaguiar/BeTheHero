

![Pagina inicial do Be the hero](https://i.imgur.com/NIiSknj.jpg)
Aplicação desenvolvida durante a semana _Omnistack_ da **Rocketseat**

# Desenvolvido em:
## [Backend](https://github.com/Lenrd/BeTheHero/tree/master/backend)
   * __nodeJS__
      * __Express__
      * __JWT__
      * __SQLite3__ com knex

## [Frontend](https://github.com/Lenrd/BeTheHero/tree/master/frontend)
   * __React.JS__

## [Mobile](https://github.com/Lenrd/BeTheHero/tree/master/mobile)
   * __React Native__
   * __Expo__
   
   
## Como executar
Cada repositório  acima tem seu próprio __*package.json*__ onde deve se executar o __"npm init"__ ou __"yarn init"__ caso possua yarn

Clone o repo:

```
$ git clone https://github.com/Lenrd/BeTheHero.git
```

Inicie o npm ou yarn: 
```
$ npm init
```

Vá para uma das pastas front, back ou mobile:
```
$ cd "sua pasta"
```
Na primeira inicialização do backend use:

```
$ npx knex migrate:latest
```

E finalmente!

```
$ "npm start" ou "yarn start" para iniciar quais quer aplicacões 
```
