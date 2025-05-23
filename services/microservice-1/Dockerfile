FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force

FROM node:18-alpine AS runtime

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY src ./src
COPY package*.json ./

RUN chown -R nodejs:nodejs /app

USER nodejs

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/api/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

EXPOSE 8080

CMD ["npm", "start"]
