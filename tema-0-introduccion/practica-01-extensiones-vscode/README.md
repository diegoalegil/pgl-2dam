# Práctica 01. Extensiones necesarias para VS Code

## Objetivos

Se busca conocer y entender las tecnologías que veremos a lo largo de este curso, y también preparar el VS Code para que, cuando cambiemos de tecnología, lo tengamos preparado para dicha tecnología. Unity y Unreal Engine no los he puesto porque no los vamos a trabajar en VS Code.

## JavaScript

**Qué es:** Es un lenguaje de programación que nació para darle la lógica a las páginas web, por eso se ejecuta en el navegador, aunque también es posible ejecutarlo fuera del navegador con Node.js. Tiene un tipado dinámico, no es necesario poner el tipo de las variables como en Java, pero sí se diferencia por ejemplo `let` de `const`: con `let` puedes cambiar el contenido, mientras que con `const` se queda así para siempre, como el nombre de un Pokémon por ejemplo.

**Extensión:** [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (Microsoft)

**Qué hace la extensión:** Te revisa el código mientras escribes y te subraya los errores antes de ejecutarlo, por ejemplo las variables que no usas. Muchos de esos errores te los arregla ella sola.

## TypeScript

**Qué es:** Es JavaScript pero con tipos, lo creó Microsoft, y aquí sí declaras el tipo de las variables como en Java. No se ejecuta directamente, primero se convierte a JavaScript. Encuentra errores de tipos antes de ejecutar el programa, y en el módulo lo veremos después de JavaScript.

**Extensión:** [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) (yoavbls)

**Qué hace la extensión:** Los errores de TypeScript son muy largos y cuesta leerlos. Esta extensión te los enseña más ordenados y con colores para que se entiendan mejor.

## React

**Qué es:** Es una librería de JavaScript creada por Meta, que conocemos más como Facebook, y es para hacer interfaces de usuario para web sobre todo. La pantalla se divide en componentes, que son piezas reutilizables como un botón de iniciar sesión o de crear cuenta por ejemplo. Usa JSX, que es parecido a HTML dentro del propio JavaScript. En el módulo será la base para entender luego React Native.

**Extensión:** [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) (dsznajder)

**Qué hace la extensión:** Tiene atajos para no escribir siempre lo mismo. Pones unas letras como `rafce`, le das a Tab y te crea la estructura de un componente entero.

## React Native

**Qué es:** Es un framework de Meta también, pero es para crear apps móviles en Android o iOS usando JavaScript/TypeScript y React. Con un solo código tienes las dos plataformas, y no es web: los componentes se convierten a nativos del móvil. Tiene Expo, que son herramientas que van por encima de React Native y facilitan crear una app y probarla en el móvil, con Expo Go por ejemplo. En el módulo con esto haremos la app de la Pokédex.

**Extensión:** [Expo Tools](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools) (Expo)

**Qué hace la extensión:** Es la extensión oficial de Expo. Te ayuda a escribir la configuración de la app y te deja depurarla desde VS Code conectándote al móvil o al emulador.

## Dificultades encontradas

Me costó encontrar la extensión correcta para cada caso, porque hay algunas en desuso, parecidas o desactualizadas, y es difícil saber cuál elegir.

## Conclusión

Me parece que las tecnologías que usaremos a lo largo de este módulo son todas super interesantes. Además me gusta la temática de hacer nuestra propia Pokédex, me parece una idea muy guay, y a mí me gusta bastante Pokémon. No sabría quedarme con alguna, primero porque no las hemos probado y segundo porque noté que de alguna manera se necesitan unas de otras para funcionar. Aun así, tengo ganas de probar React Native para hacer nuestra propia app de la Pokédex, que me parece super interesante.

![Pokémon de la primera generación](imagenes/pokemon.jpeg)
