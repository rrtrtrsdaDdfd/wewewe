import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import { WorkerDTO } from './dto/create-worker.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) {}

  async createWorker(workerDTO: WorkerDTO): Promise<WorkerDTO> {
    const worker = new Worker();
    worker.name = workerDTO.name;
    worker.numberOfClients = workerDTO.numberOfClients;
    worker.typeProduct = workerDTO.typeProduct;

    const createdWorker = await this.workerRepository.save(worker);

    return {
      id: createdWorker.id,
      name: createdWorker.name,
      numberOfClients: createdWorker.numberOfClients,
      typeProduct: createdWorker.typeProduct,
    };
  }

  async findAllWorkers(): Promise<WorkerDTO[]> {
    const workers = await this.workerRepository.find();

    return workers.map((worker) => ({
      id: worker.id,
      name: worker.name,
      numberOfClients: worker.numberOfClients,
      typeProduct: worker.typeProduct,
    }));
  }

  async findWorkerById(id: number): Promise<WorkerDTO> {
    const worker = await this.workerRepository.findOne({ where: { id } });

    if (!worker) {
      throw new NotFoundException('Worker not found');
    }

    return {
      id: worker.id,
      name: worker.name,
      numberOfClients: worker.numberOfClients,
      typeProduct: worker.typeProduct,
    };
  }

  async updateWorker(id: number, updatedWorker: WorkerDTO): Promise<WorkerDTO> {
    const worker = await this.workerRepository.findOne({ where: { id } });

    if (!worker) {
      throw new NotFoundException('Worker not found');
    }

    worker.name = updatedWorker.name;
    worker.numberOfClients = updatedWorker.numberOfClients;
    worker.typeProduct = updatedWorker.typeProduct;

    const updatedWorkerEntity = await this.workerRepository.save(worker);

    return {
      id: updatedWorkerEntity.id,
      name: updatedWorkerEntity.name,
      numberOfClients: updatedWorkerEntity.numberOfClients,
      typeProduct: updatedWorkerEntity.typeProduct,
    };
  }

  async deleteWorker(id: number): Promise<void> {
    const worker = await this.workerRepository.findOne({ where: { id } });

    if (!worker) {
      throw new NotFoundException('Worker not found');
    }

    await this.workerRepository.remove(worker);
  }
}




