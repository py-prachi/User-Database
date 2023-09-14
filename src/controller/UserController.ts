import { AppDataSource } from "../data-source"

import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"


class UserController {

    private userRepository = AppDataSource.getRepository(User)
    
    async all(request: Request, response: Response, next: NextFunction) {
        console.log("Fetch all user router working");
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        console.log("Fetch one user router working");

        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        console.log("Update user router working");

        const user_to_update = await this.userRepository.findOne({
            where: { id }
        })

        if (!user_to_update) {
            return "unregistered user"
            return user_to_update
        }
        const { firstName, lastName, age } = request.body;
        user_to_update.firstName = firstName;
        user_to_update.lastName = lastName;
        user_to_update.age = age;
        

        return this.userRepository.save(user_to_update);
        return(user_to_update);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;
        console.log("Create user router working");
        console.log(request.body);
        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        console.log("Delete user router working");
        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

};

export {UserController};