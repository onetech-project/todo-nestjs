import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';

export default [
  {
    name: 'auth',
    public: true,
    module: AuthModule,
  },
  {
    name: 'users',
    public: false,
    module: UsersModule,
  },
  {
    name: 'todo',
    public: false,
    module: TodoModule,
  },
];
