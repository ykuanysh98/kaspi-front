# --- 1-кезең: Жобаны құрастыру (Build Stage) ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# Жобаны жинақтаймыз (бұл бізге .output папкасын береді)
RUN yarn build

# --- 2-кезең: Контейнерді іске қосу (Runner Stage) ---
FROM node:20-alpine AS runner

WORKDIR /app

# Тек қана сәтті жинақталған .output папкасын бірінші кезеңнен көшіріп аламыз
# Бұл контейнердің көлемін айтарлықтай азайтады
COPY --from=builder /app/.output ./.output

# Контейнердің сыртқа қосылу баптаулары
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Nuxt 3/4 өзінің жеке Node.js серверін іске қосады
CMD ["node", ".output/server/index.mjs"]
