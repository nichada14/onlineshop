import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty({ description: 'product name' })
    name: string;

    @ApiProperty({ description: 'price' })
    price: number;

    @ApiProperty({ description: 'desc' })
    desc: string;

    @ApiProperty({ description: 'qty' })
    qty: number;

    @ApiProperty({ description: 'image' })
    image: string;
}
