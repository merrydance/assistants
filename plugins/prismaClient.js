import { PrismaClient } from "@prisma/client";
import fastifyPlugin from "fastify-plugin"; 

const prismaPlugin = fastifyPlugin(async (fastify) => {
const prisma = new PrismaClient();

  // 添加错误处理
  try {
    await prisma.$connect();
  } catch (error) {
    fastify.log.error("无法连接到数据库", error);
    throw error;
  }

  fastify.decorate("prisma", prisma);
  fastify.addHook("onClose", async (fastify) => {
    await fastify.prisma.$disconnect();
  });
});

export default prismaPlugin;
