import { RoleEntity } from '@features/user/entities/role.entity';
import { UserEntity } from '@features/user/entities/user.entity';
import { RoleEnum } from '@features/user/enums/role.enum';
import { DataSource } from 'typeorm';

export async function createUsers(datasource: DataSource) {
  const userRepository = datasource.getRepository(UserEntity);
  const roleRepository = datasource.getRepository(RoleEntity);

  const roleAdmin = await roleRepository.findOne({ where: { code: RoleEnum.ADMIN_USER } });
  const roleExterno = await roleRepository.findOne({ where: { code: RoleEnum.EXTERNAL_USER } });

  const users = [
    { 
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: "$2b$08$vNOW6vaqfRO6qy6Q4QR8I.DfWHqWnUyhCudEJQ22AGzLc0Br7Ts2y", // changeme123
      role: roleAdmin
    },
    { 
      name: 'Andres',
      lastname: 'Doe',
      email: 'andres.doe@example.com',
      password: "$2b$08$vNOW6vaqfRO6qy6Q4QR8I.DfWHqWnUyhCudEJQ22AGzLc0Br7Ts2y", // changeme123
      role: roleExterno
    }
  ];
  const savedUsers: UserEntity[] = [];

  for (const user of users) {
    const existingUser = await userRepository.findOne({ where: { email: user.email } });

    if (!existingUser) {
      const savedUser = await userRepository.save(user);
      savedUsers.push(savedUser);
    }
  }

  return savedUsers;
}