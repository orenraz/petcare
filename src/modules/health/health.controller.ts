import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  check() {
    const port = this.configService.get<string>('port');
    const nodeEnv = this.configService.get<string>('nodeEnv');
    return {
      status: 'OK',
      port,
      nodeEnv
    };
  }
}
