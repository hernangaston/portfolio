# Portfolio — Hernán Gastón

Sitio personal publicado en GitHub Pages: [hernangaston.github.io/portfolio](https://hernangaston.github.io/portfolio/).

HTML, CSS y JavaScript estáticos, sin build. La escena 3D del encabezado usa three.js (incluido en `vendor/`).

```
index.html             Inicio: escena 3D, perfil, bio, stack, proyectos y contacto
proyectos/             Índice y una página por proyecto
styles.css             Estilos (modo oscuro por defecto y modo claro)
js/scene.js            Escena voxel en three.js
js/tema.js             Selector de modo claro / oscuro
vendor/                three.js 0.160
img/                   Capturas de los proyectos y foto
```

Para verlo en local: `python3 -m http.server 8000` y abrir http://localhost:8000.
