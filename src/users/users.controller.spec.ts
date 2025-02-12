import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../dto/create.user';
import { UserModel, UserType } from '../domain/models/user.model';
import { LoginUserDto } from '../dto/login.user';

describe('UsersController', () => {
  let controller: UserController;
  let usersService: UserService;
  let authService: AuthService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    usersService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = new CreateUserDto();
      createUserDto.email = 'test@example.com';
      createUserDto.password = 'password123';
      createUserDto.phoneNumber = '1234567890';

      const expectedUser = { id: 1, ...createUserDto, userType: UserType.USER };
      mockUsersService.create.mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);
      expect(result).toBe(JSON.stringify({ userId: expectedUser.id }));
      expect(mockUsersService.create).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const loginDto = new LoginUserDto();
      loginDto.email = 'test@example.com';
      loginDto.password = 'password123';

      const expectedResponse = { accessToken: 'token', user: {} };
      mockAuthService.login.mockResolvedValue(JSON.stringify(expectedResponse));

      const result = await controller.login(loginDto);
      expect(result).toBe(JSON.stringify(expectedResponse));
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedUsers = [new UserModel(), new UserModel()];
      mockUsersService.findAll.mockResolvedValue(expectedUsers);

      const result = await controller.findAll();
      expect(result).toBe(expectedUsers);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const expectedUser = new UserModel();
      mockUsersService.findOne.mockResolvedValue(expectedUser);

      const result = await controller.findOne('1');
      expect(result).toBe(expectedUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserModel = new UserModel();
      const expectedUser = new UserModel();
      mockUsersService.update.mockResolvedValue(expectedUser);

      const result = await controller.update('1', updateUserModel);
      expect(result).toBe(expectedUser);
      expect(mockUsersService.update).toHaveBeenCalledWith(updateUserModel);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      await controller.remove('1');
      expect(mockUsersService.delete).toHaveBeenCalledWith(1);
    });
  });
});
