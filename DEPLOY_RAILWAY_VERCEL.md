# Railway + Vercel (paso a paso, sin tocar local)

## Objetivo

Dejar producción con:

- MySQL en Railway usando base `vigiah_core`
- MongoDB Atlas para `MONGODB_URI`
- App Next.js desplegada en Vercel

## 1) MySQL en Railway

1. En Railway crea proyecto nuevo o usa uno existente.
2. Agrega servicio **MySQL**.
3. Abre **Variables** y localiza host, puerto, usuario y password.
4. Conéctate por cliente SQL usando la URL pública (`*.proxy.rlwy.net`).
5. Ejecuta:

```sql
CREATE DATABASE IF NOT EXISTS vigiah_core;
```

6. Construye `DATABASE_URL` final:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/vigiah_core"
```

Notas:

- Si usas el usuario `root` por rapidez, luego crea uno de aplicación con permisos mínimos.
- Si el password tiene caracteres especiales (`@`, `#`, `:`), aplica URL encode.

## 2) MongoDB

Usa MongoDB Atlas (recomendado con Vercel) y crea:

- Cluster
- Usuario de base de datos
- Network access permitido para Vercel (temporalmente `0.0.0.0/0` para pruebas)

URI esperada:

```env
MONGODB_URI="mongodb+srv://USER:PASSWORD@cluster.mongodb.net/vigiah?retryWrites=true&w=majority"
```

## 3) Variables en Vercel

En Vercel > Project > Settings > Environment Variables:

- `DATABASE_URL`
- `MONGODB_URI`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (URL pública del proyecto)

## 4) Probar conexiones antes de deploy

En local (PowerShell), sin alterar `.env`:

```powershell
$env:DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/vigiah_core"
$env:MONGODB_URI="mongodb+srv://USER:PASSWORD@cluster.mongodb.net/vigiah?retryWrites=true&w=majority"
node scripts/testDeployConnections.js
```

## 5) Migrar y desplegar

```bash
npx prisma migrate deploy
npx prisma generate
vercel --prod
```

## 6) Seguridad importante

- Rota credenciales si se compartieron en texto plano.
- No guardes URIs reales en archivos versionados.
- Usa secretos distintos para desarrollo y producción.
