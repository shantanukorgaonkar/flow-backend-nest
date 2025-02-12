import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserModel, UserType } from "../domain/models/user.model";
import { CreateUserDto } from "../dto/create.user";
import { LoginUserDto } from "../dto/login.user";
import { AuthService } from "../auth/auth.service";
import { Public } from "../decorators/set-route-public.decorator";
import { Roles } from "../decorators/roles.decorator";
import { RolesGuard } from "../guards/roles.guard";


@Controller('users')
export class UserController {

    constructor(private readonly usersService: UserService, private readonly authService: AuthService) {}

    @Public()
    @Post('/create')
    async create(@Body() createUserDto: CreateUserDto) {
        const userModel = createUserDto.toModel()
        userModel.userType = UserType.USER
        const newUser =  await this.usersService.create(userModel);
        return JSON.stringify({userId: newUser.id})
    }

    @Public()
    @Post('/login')
    async login(@Body() dto: LoginUserDto) {
        const response = await this.authService.login(dto.email, dto.password)
        return response
    }

    @UseGuards(RolesGuard)
    @Roles(UserType.ADMIN)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UserModel) {
        return this.usersService.update(updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}

