import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDTO } from './dto/create-profile.dto.js';
import { UpdateProfileDTO } from './dto/update-profile.dto.js';

@Injectable()
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: 'Joshua',
            description: "another one"
        },
         {
            id: randomUUID(),
            name: 'Saphire',
            description: "another one"
        },
         {
            id: randomUUID(),
            name: 'Diamond',
            description: "another one"
        }
    ]

    findAll() {
        return this.profiles
    }

    findOne(id: string) {
        return this.profiles.find(p => id === p.id)
    }

    create(createProfileDto: CreateProfileDTO) {
        // Generate unique ID
        const id = randomUUID()

        // Add profile to list
        this.profiles.push({id, ...createProfileDto})

        // Return profile
       return this.findOne(id)
    }

    update(id: string, updateProfileDto: UpdateProfileDTO) {
        const matchingProfile = this.profiles.find((profile) => profile.id === id)

        if (!matchingProfile) throw new NotFoundException(`Profile with ${id} not found`)

        matchingProfile.name = updateProfileDto.name
        matchingProfile.description = updateProfileDto.description

        return matchingProfile
    }

    delete(id: string) {
        const matchingProfileIndex = this.profiles.findIndex((profile) => profile.id === id)

        if (matchingProfileIndex < 0) throw new NotFoundException(`Profile with ${id} not found`)

        this.profiles.splice(matchingProfileIndex, 1)
    }
}
