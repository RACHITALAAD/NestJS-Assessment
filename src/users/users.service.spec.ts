import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

type MockRepo<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepo = <T = any>(): MockRepo<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repo: MockRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: createMockRepo() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('create should call repo.create & save', async () => {
    const dto = { name: 'A', email: 'a@a.com', password: 'pass' };
    (repo.create as jest.Mock).mockReturnValue(dto);
    (repo.save as jest.Mock).mockResolvedValue({ id: 1, ...dto });

    const res = await service.create(dto as any);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
    expect(res).toHaveProperty('id', 1);
  });

  it('findAll should call find', async () => {
    (repo.find as jest.Mock).mockResolvedValue([]);
    expect(await service.findAll()).toEqual([]);
  });
});
