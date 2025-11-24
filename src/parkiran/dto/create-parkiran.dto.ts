import { jenisKendaraan } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateParkerDto {
    @IsNotEmpty({ message: 'Plat harus di isi' })
    @IsString({ message: 'Plat harus berupa String' })
    platNomor: string;

    @IsNotEmpty({ message: 'Jenis Kendaraan harus di isi' })
    @IsString({ message: 'Jenis Kendaraan harus berupa String' })
    jenisKendaraan: jenisKendaraan;

    @IsNotEmpty({ message: 'Durasi harus di isi' })
    @IsNumber()
    durasi: number;

    totalTarif: number;

}