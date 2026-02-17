# Deploy en Vercel (Next.js + MongoDB + MySQL)

## 1) Requisitos

- Repositorio en GitHub (o GitLab/Bitbucket)
- Cuenta en Vercel
- Base de datos MySQL accesible por internet (ideal: servicio administrado)
- Base de datos MongoDB accesible por internet (ideal: MongoDB Atlas)

## 2) Variables de entorno en Vercel

En Vercel, en tu proyecto: **Settings > Environment Variables**.

Configura estas variables:

- `DATABASE_URL` (MySQL para Prisma)
- `MONGODB_URI` (MongoDB para Mongoose)
- `JWT_SECRET` (secreto largo y aleatorio)
- `NEXTAUTH_URL` (URL pública del proyecto, por ejemplo `https://tu-proyecto.vercel.app`)
- `NEXTAUTH_SECRET` (secreto largo y aleatorio)

Ejemplos:

```env
DATABASE_URL="mysql://usuario:password@host:3306/vigiah_core"
MONGODB_URI="mongodb+srv://usuario:password@cluster.mongodb.net/vigiah?retryWrites=true&w=majority"
JWT_SECRET="cambia-esto-por-un-secreto-largo"
NEXTAUTH_URL="https://tu-proyecto.vercel.app"
NEXTAUTH_SECRET="cambia-esto-por-otro-secreto-largo"
```

## 3) Comandos para deploy (CLI)

Instala Vercel CLI:

```bash
npm i -g vercel
```

Login:

```bash
vercel login
```

En la raíz del proyecto:

```bash
vercel
```

Deploy a producción:

```bash
vercel --prod
```

## 4) Migraciones Prisma (MySQL)

Antes del primer deploy productivo, aplica migraciones contra la base productiva:

```bash
npx prisma migrate deploy
```

Si lo ejecutas local, asegúrate de apuntar `DATABASE_URL` a producción solo para ese comando.

## 5) ¿VPS Ubuntu o Vercel?

No es dilema: puedes usar **Vercel para la app** y tu **VPS o servicios cloud para bases de datos**.

- Opción más simple/recomendada:
  - MongoDB Atlas para `MONGODB_URI`
  - MySQL administrado (Railway, PlanetScale, Aiven, RDS, etc.) para `DATABASE_URL`
- Opción VPS Ubuntu:
  - Instalas MySQL y/o MongoDB en el VPS
  - Abres puertos de forma segura (firewall + usuarios + TLS)
  - Usas la IP/DNS pública del VPS en `DATABASE_URL` y `MONGODB_URI`

## 6) Nota importante de seguridad

- No subas `.env` al repositorio
- Usa secretos diferentes para desarrollo y producción
- Evita usar usuario root de MySQL en producción
