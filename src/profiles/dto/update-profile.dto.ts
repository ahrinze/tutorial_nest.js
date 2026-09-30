import { IsString, Length } from "class-validator"

export class UpdateProfileDTO {
    @IsString()
    @Length(3, 100)
    name: string

    @IsString()
    description: string
}