import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerDTO } from './dto/create-worker.dto';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  createWorker(@Body() workerDTO: WorkerDTO) {
    return this.workerService.createWorker(workerDTO);
  }

  @Get()
  findAllWorkers() {
    return this.workerService.findAllWorkers();
  }

  @Get(':id')
  findWorkerById(@Param('id') id: number) {
    return this.workerService.findWorkerById(id);
  }

  @Patch(':id')
  updateWorker(@Param('id') id: number, @Body() workerDTO: WorkerDTO) {
    return this.workerService.updateWorker(id, workerDTO);
  }

  @Delete(':id')
  deleteWorker(@Param('id') id: number) {
    return this.workerService.deleteWorker(id);
  }
}

