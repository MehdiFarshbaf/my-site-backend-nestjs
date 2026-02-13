import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({
    status: 201,
    description: 'Role has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'Role with this name already exists.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid permission IDs provided.',
  })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Returns all roles with their permissions.',
  })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Role ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the role with permissions.',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Role ID',
    example: 1,
  })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({
    status: 200,
    description: 'Role has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Role with this name already exists.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid permission IDs provided.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a role' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Role ID',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Role has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }

}
