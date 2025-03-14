Para ejecutar los proyectos:
-Backend(Django)
Instalar dependencias de requirements.txt
configurar database en settings.py y realizar las migraciones

comando para ejecutar servidor y webSocket: daphne -p 8000 APIRest.asgi:application

-Frontend (React)
Instalar dependecias al proyecto ya creado:
npm install
npm install react-toastify
npm install react-router-dom
npm install @types/react-router-dom
npm install @tanstack/react-query
npm install react-hook-form
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @heroicons/react
npm install react-bootstrap


comando para ejecutar servidor : npm run dev
