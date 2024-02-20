import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { setupMaster, setupWorker } from '@socket.io/sticky';
import cluster from 'node:cluster';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (cluster.isPrimary) {
    const httpServer = createServer();
    for (let index = 0; index < 3; index++) {
      cluster.fork();
    }
    setupMaster(httpServer, {
      loadBalancingMethod: 'round-robin',
    });
    console.log(`Node Master Server : ${process.pid}`);
    await app.listen(3000);
  } else {
    // const httpServer = createServer(app.getHttpServer());
    const adapter = new IoAdapter(app.getHttpServer());
    console.log(`Node Cluster Server : ${process.pid}`);
    // app.useWebSocketAdapter(adapter);
    const ioServer = adapter.createIOServer(app.getHttpServer());
    setupWorker(ioServer);
  }
}
bootstrap();
