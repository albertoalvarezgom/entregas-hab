Diario de viajes

# Funcionamiento del backend

## Rutas

- /entries - GET - devolverá un JSON con la lista de últimos posts de la BBDD

-/entries - POST - creará un nuevo post y devolverá un JSON con los datos del post que acabamos de crear

-/entries/ID - DELETE - borrará el post con la ID

## Definición de post

- id (int)
- date (datetime)
- description (text)
- place (text)
  ...
- image (text)

# Funcionamiento del frontend

http://localhost:3000

- Mostrará un formulario de creación de un nuevo post
  -Lista de post
  -Cada post con un botón de borrar
