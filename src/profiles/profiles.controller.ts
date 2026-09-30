import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto.js';
import { UpdateProfileDTO } from './dto/update-profile.dto.js';
import { ProfilesService } from './profiles.service.js';
import { ProfilesGuard } from './profiles.guard.js';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    // GET /profiles
    @Get()
    findAll() {
        return this.profilesService.findAll()
    }

    // GET /profiles/:id
    @Get(":id")
    getProfile(@Param('id', ParseUUIDPipe) id: string) {
        try {       
            return this.profilesService.findOne(id)
        } catch (error) {
            console.log(error)
        }
    }

    // POST /profiles
    @Post()
    createProfile(@Body() reqBody: CreateProfileDTO) {
       return this.profilesService.create(reqBody)
    }

    // PUT /profiles/:id
    @Put(":id")
    updateProfile(@Param('id', ParseUUIDPipe) id: string, @Body() reqBody: UpdateProfileDTO) {
        return this.profilesService.update(id, reqBody)
    }

    // DELETE /profiles/:id
    @Delete(":id")
    @UseGuards(ProfilesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.profilesService.delete(id)
    }

}
