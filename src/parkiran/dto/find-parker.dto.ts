import { IsOptional, IsDate, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { jenisKendaraan } from "@prisma/client"
export class FindParkerdto {

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit: number

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

    @IsOptional()
    jenisKendaraan?: jenisKendaraan;
}