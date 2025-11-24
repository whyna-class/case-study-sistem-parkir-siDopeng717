import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParkerDto } from './dto/create-parkiran.dto';
import { UpdateParkiranDto } from './dto/update-parkiran.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindParkerdto } from './dto/find-parker.dto';
import { contains } from 'class-validator';

@Injectable()
export class ParkerService {
  constructor(private prisma: PrismaService){}

  async create(createParkerDto: CreateParkerDto) {
    const tarifJamPertama = createParkerDto.jenisKendaraan === 'RODA2' ? 3000 : 6000;
    const tarifperJamSelanjutnya = createParkerDto.jenisKendaraan === 'RODA2' ? 2000 : 4000;

    let totalTarif = 0;
    if (createParkerDto.durasi === 1) {
      totalTarif = tarifJamPertama;
    } else if(createParkerDto.durasi > 1){
      totalTarif = tarifJamPertama + (createParkerDto.durasi - 1) * tarifperJamSelanjutnya;
    }

    const data = await this.prisma.parkir.create({
      data: {
        ...createParkerDto,
        totalTarif,
      },
    })

    return {
      success: true,
      message: 'Data Parkire sampun di tambahaken',
      data,
    }
  }

  async findAll(query: FindParkerdto ) {
    const {
      search = ",",
      jenisKendaraan,
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;
    const where: any = {}
    if (search) {
      where.platNomor = {contains: search}
    }

    if (jenisKendaraan) {
      where.jenisKendaraan = jenisKendaraan;
    }

    const data = await this.prisma.parkir.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.parkir.count({ where });
  
    return {
      success: true,
      message: 'Data Parker sampun di pundut',
      data,
      meta: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      }
    }
  }

  async findOne(id: number) {
    const data = await
      this.prisma.parkir.findUnique({
        where: { id },
      });
    
    if (!data) {
      throw new NotFoundException(`Data Parker tidak ditemukan dengan ID ${id} tidak ditemukan`);
    }
    return {
      success: true,
      message: 'Data Parkir berhasil diambil',
      data,
    }
  }

  async totalUang() {
    const total = await this.prisma.parkir.aggregate({
      _sum: { totalTarif: true },
    });

    return {
      success: true,
      message: 'Total pendapatan berhasil dihitung',
      totalUang: total._sum.totalTarif ?? 0,
    }
  }

  async update(id: number, updateParkerDto: UpdateParkiranDto) {
    const existing = await this.prisma.parkir.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Data Parkir dengan ID ${id} tidak ditemukan`);
    }

    let totalTarif = existing.totalTarif;

    if (updateParkerDto.durasi) {
      const tarifJamPertama = existing.jenisKendaraan === 'RODA2' ? 3000 : 6000;
      const tarifperJamSelanjutnya = existing.jenisKendaraan === 'RODA2' ? 2000 : 4000;

      if (updateParkerDto.durasi === 1) {
        totalTarif = tarifJamPertama;
      } else if (updateParkerDto.durasi > 1) {
        totalTarif = tarifJamPertama + (updateParkerDto.durasi - 1) * tarifperJamSelanjutnya;
      }
    }

    const data = await this.prisma.parkir.update({
      where: { id },
      data: {
        ...updateParkerDto,
        totalTarif,
      },
    });

    return {
      success: true,
      message: 'Data Parker berhasil diupdate',
      data,
    };
  }

  async remove(id: number) {
    const existing = await this.prisma.parkir.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Data Parker dengan ID ${id} tidak ditemukan`);
    }

    await this.prisma.parkir.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Data Parkir Berhasil dihapus',
    };
  }
}
