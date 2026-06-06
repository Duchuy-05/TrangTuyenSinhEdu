import { AppDataSource } from '../models/DataSource';
import { User } from '../models/entities/User';

export class UserService {
    private static userRepository = AppDataSource.getRepository(User);

    static async getAllUser() {
        return this.userRepository.find({
            relations: {registrations: true},
        });
    }

    static async getUserById(id: number) {
        return this.userRepository.findOne({
            where: { id },
            relations: {registrations: true},
        });
    }

    static async deleteUser(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        return this.userRepository.remove(user);
    }
}