import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Products')
@Controller('onlineshop/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() createProductDto: CreateProductDto) {
    const imageUrl = `http://localhost:4000/uploads/${file.filename}`;
    return this.productsService.create({ ...createProductDto, image: imageUrl });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
  }))
  update(
      @Param('id') id: string, 
      @Body() updateProductDto: UpdateProductDto,
      @UploadedFile() file: Express.Multer.File 
  ) {
      let imageUrl: string | undefined;
      if (file) { 
          imageUrl = `http://localhost:4000/uploads/${file.filename}`;
          return this.productsService.update(+id, { ...updateProductDto, image: imageUrl });
      }
      return this.productsService.update(+id, updateProductDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
